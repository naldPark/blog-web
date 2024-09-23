<template>
  <div>
    <div class="chat-wrapper" v-if="!entered">
      <div class="form-wrapper">
        <div class="form-container">
          <h1>Chat room</h1>
          <span>{{ t('chat.enterInfo') }}</span>
          <VTextField label="ID" v-model="nameInput" flat placeholder="name" />
          <VTextField
            label="Room"
            :disabled="true"
            v-model="roomInput"
            flat
            placeholder="roomID"
          />
          <VBtn
            @click="connect"
            :disabled="!nameInput || !roomInput"
            class="ma-2"
            rounded
            color="primary"
            dark
          >
            {{ t('chat.enter') }}
          </VBtn>
        </div>
      </div>
    </div>
    <div class="mt-3" v-else>
      <VCard max-width="1000" class="mx-auto">
        <VToolbar dark>
          <VToolbarTitle class="text-primary"
            >{{ t('chat.chatRoom') }} [{{ roomId }}]</VToolbarTitle
          >
          <VSpacer />
          <VBtn class="ma-1" color="secondary" plain @click="leave">
            {{ t('leave') }}
          </VBtn>
        </VToolbar>
        <VList id="msgList" style="height: 500px; overflow: auto">
          <VListSubheader v-if="!roomId">
            {{ t('chat.connecting') }}
          </VListSubheader>

          <VListItem
            v-for="(item, index) in messageList"
            :key="index"
            :title="item.id"
            :subtitle="item.content"
          >
            <template v-slot:prepend>
              <VAvatar v-if="item.id" :color="getAvatarColor(item.id)">{{
                item.id && item.id.charAt(0)
              }}</VAvatar>
            </template>
          </VListItem>
        </VList>
        <div class="chat-container pa-2 pl-3 pr-3">
          <VTextField
            outlined
            dense
            v-model="messageInput"
            :append-outer-icon="'mdi-send'"
            :label="`${t('typeMessage')}`"
            type="text"
            @click:append-outer="sendMessage"
            @keyup.enter="sendMessage"
          >
          </VTextField>
        </div>
      </VCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useUserStore } from '@/store/userStore';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

window.global = window as any;
const cookies = useCookies();
const { accountInfo } = storeToRefs(useUserStore());
const { t } = useI18n();
const nameInput = ref(accountInfo?.value.accountName);
const roomInput = ref('default');
const messageInput = ref('');
const entered = ref(false);
const currentSubscription = ref<any>(null);
const roomId = ref<string>('');
const topic = ref<string>('');
const messageList = ref<{ type: string; id?: string; content: string }[]>([]);
const colors = [
  '#010221',
  '#0A7373',
  '#B7BF99',
  '#EDAA25',
  '#C43302',
  '#86A69D',
  '#F2C6C2',
  '#F28585',
];

let client: Client | null = null;

const connect = (event: Event) => {
  cookies.set('roomname', nameInput.value);

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
      console.log('Connected: ' + frame);
      enterRoom(roomInput.value);
    };

    client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    client.activate();
  }
  event.preventDefault();
};

const enterRoom = (newRoomId: string) => {
  roomId.value = newRoomId;
  cookies.set('roomId', roomId.value);
  topic.value = `/app/chat/${newRoomId}`;

  if (currentSubscription.value) {
    currentSubscription.value.unsubscribe();
  }
  currentSubscription.value = client?.subscribe(
    `/channel/${roomId.value}`,
    onMessageReceived,
  );
  currentSubscription.value = client?.subscribe(
    `/channel/${roomId.value}/${nameInput.value}`,
    onMessageReceived,
  );
  client?.publish({
    destination: `${topic.value}/addUser`,
    body: JSON.stringify({ sender: nameInput.value, type: 'JOIN' }),
  });
};

const onMessageReceived = (payload: any) => {
  const message = JSON.parse(payload.body);
  if (message.type === 'JOIN') {
    messageList.value.push({
      type: 'event-message',
      content: '야생의 ' + message.sender + '가 입장했다 ',
    });
  } else if (message.type === 'LEAVE') {
    messageList.value.push({
      type: 'event-message',
      content: '야생의 ' + message.sender + '가 떠났다 ',
    });
  } else {
    messageList.value.push({
      type: 'chat-message',
      id: message.sender,
      content: message.content,
    });
  }
  scrollToBottom();
};

const sendMessage = () => {
  const messageContent = messageInput.value.trim();
  if (messageContent.startsWith('/join ')) {
    const newRoomId = messageContent.substring('/join '.length);
    enterRoom(newRoomId);
    messageList.value = [];
  } else if (messageContent && client) {
    const chatMessage = {
      sender: nameInput.value,
      content: messageInput.value,
      type: 'CHAT',
    };
    client.publish({
      destination: `${topic.value}/sendMessage`,
      body: JSON.stringify(chatMessage),
    });
  }
  messageInput.value = '';
};

const scrollToBottom = () => {
  nextTick(() => {
    const messageBody = document.getElementById('msgList');
    if (messageBody) {
      messageBody.scrollTop = messageBody.scrollHeight;
    }
  });
};

const getAvatarColor = (messageSender: string) => {
  let hash = 0;
  for (let i = 0; i < messageSender.length; i++) {
    hash = 31 * hash + messageSender.charCodeAt(i);
  }
  const index = Math.abs(hash % colors.length);
  return colors[index];
};

const leave = () => {
  cookies.remove('roomname');
  cookies.remove('roomId');
  location.reload();
};

onMounted(() => {
  const savedName = cookies.get('roomname');
  if (savedName) {
    nameInput.value = savedName;
  }

  const savedRoom = cookies.get('roomId');
  if (savedRoom) {
    roomInput.value = savedRoom;
  }
});

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

  .form-wrapper {
    border-radius: 10px;
    box-shadow:
      0 14px 28px rgba(0, 0, 0, 0.25),
      0 10px 10px rgba(0, 0, 0, 0.22);
    position: absolute;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
    opacity: 0.8;

    .form-container {
      line-height: 4;
      padding: 50px 50px;
      text-align: center;
    }
  }
}
</style>
