<template>
  <div>
    <div class="chat-wrapper" v-if="!entered">
      <ChatForm @connect="connect" v-model:name-input="nameInput" />
    </div>
    <div class="mt-3" v-else>
      <ChatRoom
        :messageList="messageList"
        @sendMessage="sendMessage"
        :roomId="roomId"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onUnmounted, nextTick } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useUserStore } from '@/store/userStore';
import { storeToRefs } from 'pinia';
import ChatForm from '@/features/wonderwall/chat/ChatForm.vue';
import ChatRoom from '@/features/wonderwall/chat/ChatRoom.vue';
import { useAppCommonStore } from '@/store/appCommonStore';

/** 쿠키 */
const cookies = useCookies();
const { accountInfo } = storeToRefs(useUserStore());
const appStatusStore = useAppCommonStore();

/** 상태 관리 변수들 **/
const nameInput = ref(accountInfo?.value.accountName);
const roomInput = ref('default');
const entered = ref(false);
const currentSubscription = ref<any>(null);
const roomId = ref<string>('');
const topic = ref<string>('');
const messageList = ref<{ type: string; id?: string; content: string }[]>([]);

let client: Client | null = null;

/** 연결 설정*/
const connect = (name: string) => {
  cookies.set('roomname', name);

  if (nameInput.value && roomInput.value) {
    entered.value = true;
    const socket = new SockJS(
      `${location.protocol}//${location.host}/chatEndPoint`,
      null,
      {
        transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
      },
    );

    client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = (frame) => {
      enterRoom(roomInput.value);
    };

    client.onStompError = (frame) => {
      appStatusStore.showToast({
        type: 'error',
        message: frame.headers['message'] + ' ' + frame.body,
      });
    };

    client.activate();
  }
};

/* 채팅방 입장 */
const enterRoom = (newRoomId: string) => {
  roomId.value = newRoomId;
  cookies.set('roomId', roomId.value);
  topic.value = `/app/chat/${newRoomId}`;

  currentSubscription.value?.unsubscribe();
  /** 전체 채팅 */
  currentSubscription.value = client?.subscribe(
    `/channel/${roomId.value}`,
    onMessageReceived,
  );
  /** TODO: 개인 채팅  */
  currentSubscription.value = client?.subscribe(
    `/channel/${roomId.value}/${nameInput.value}`,
    onMessageReceived,
  );

  client?.publish({
    destination: `${topic.value}/addUser`,
    body: JSON.stringify({ sender: nameInput.value, type: 'JOIN' }),
  });
};

/* 메시지 수신 */
const onMessageReceived = (payload: any) => {
  const message = JSON.parse(payload.body);
  let messageType = 'chat-message';
  let content = message.content;

  if (message.type === 'JOIN') {
    messageType = 'event-message';
    content = `야생의 ${message.sender}가 입장했다`;
  } else if (message.type === 'LEAVE') {
    messageType = 'event-message';
    content = `야생의 ${message.sender}가 떠났다`;
  }

  messageList.value.push({
    type: messageType,
    id: message.sender,
    content: content,
  });
  /** 메세지 수신 후 스크롤 최하단 위치 */
  scrollToBottom();
};

// 메시지 전송
const sendMessage = (inputText: string) => {
  const messageContent = inputText.trim();
  if (messageContent.startsWith('/join ')) {
    enterRoom(messageContent.substring(6));
    messageList.value = [];
  } else if (messageContent && client) {
    client.publish({
      destination: `${topic.value}/sendMessage`,
      body: JSON.stringify({
        sender: nameInput.value,
        content: inputText,
        type: 'CHAT',
      }),
    });
  }
};

/**  메시지 창 스크롤*/
const scrollToBottom = () => {
  nextTick(() => {
    const messageBody = document.getElementById('msgList');
    if (messageBody) messageBody.scrollTop = messageBody.scrollHeight;
  });
};

/** 컴포넌트 언마운트 시 클라이언트 비활성화 */
onUnmounted(() => {
  client?.deactivate();
});
</script>

<style lang="scss" scoped>
.chat-wrapper {
  background: #f6f5f7 url('../../../assets/images/chatBackground.jpg') no-repeat
    center center / cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: -20px 0 0;
}
</style>
