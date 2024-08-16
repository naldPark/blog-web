<template>
  <div>
    <div class="chat-wrapper" v-if="!entered">
      <div class="form-wrapper">
        <div class="form-container">
          <h1>Chat room</h1>
          <span>{{ $t('chat.enterInfo') }}</span>
          <v-text-field label="ID" v-model="nameInput" flat placeholder="name" />
          <v-text-field label="Room" :disabled="true" v-model="roomInput" flat placeholder="roomID" />
          <v-btn @click="connect" :disabled="!nameInput || !roomInput" class="ma-2" rounded color="primary" dark>
            {{ $t('chat.enter') }}
          </v-btn>
        </div>
      </div>
    </div>
    <div class="mt-3" v-else>
      <v-card max-width="1000" class="mx-auto">
        <v-toolbar dark>
          <v-toolbar-title class="text-primary">{{ $t('chat.chatRoom') }} [{{ roomId }}]</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn class="ma-1" color="secondary" plain @click="leave">{{ $t('leave') }}</v-btn>
        </v-toolbar>
        <!-- <div class="connecting ml-3" v-if="!roomId">
          {{ $t('chat.connecting') }}
        </div> -->

        <v-list id="msgList" style="height:500px; overflow: auto;">
          <v-list-subheader v-if="!roomId"> {{ $t('chat.connecting') }}</v-list-subheader>

          <v-list-item v-for="(item, index) in messageList" :key="index" :title="item.id" :subtitle="item.content">
            <template v-slot:prepend>
              <v-avatar v-if='item.id' :color="getAvatarColor(item.id)">{{ item.id.charAt(0) }}</v-avatar>
            </template>
          </v-list-item>
        </v-list>


        <!-- <v-list id="msgList" style="height:500px; overflow: auto;">
          <template v-for="(item, index) in messageList" :key="index">
            <v-list-item v-if="item.type !== 'chat-message'">
              <div>{{ item.content }}</div>
            </v-list-item>
            <v-list-item v-else>
              <v-list-item-avatar size="30" class="justify-center">
                <v-avatar v-if='item.id' :color="getAvatarColor(item.id)">{{ item.id.charAt(0) }}</v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <span>{{ item.id }}</span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <span>{{ item.content }}</span>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list> -->
        <div class="chat-container pa-2 pl-3 pr-3">
          <v-text-field outlined dense v-model="messageInput" :append-outer-icon="'mdi-send'"
            :label="`${$t('typeMessage')}`" type="text" @click:append-outer="sendMessage"
            @keyup.enter="sendMessage"></v-text-field>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import { useI18n } from 'vue-i18n';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAccountStatusStore } from '@/store/accountStatusStore';

window.global = window as any;
const { t } = useI18n();
const cookies = useCookies();
const accountStatusStore = useAccountStatusStore();

const nameInput = ref(accountStatusStore.accountInfo?.accountName);
const roomInput = ref('default');
const messageInput = ref('');
const entered = ref(false);
const currentSubscription = ref<any>(null);
const roomId = ref<string>('');
const topic = ref<string>('');
const messageList = ref<{ type: string; id?: string; content: string }[]>([]);
const colors = ['#010221', '#0A7373', '#B7BF99', '#EDAA25', '#C43302', '#86A69D', '#F2C6C2', '#F28585'];

let client: Client | null = null;

const connect = (event: Event) => {
  cookies.set('roomname', nameInput.value);

  if (nameInput.value && roomInput.value) {
    entered.value = true;
    const socket = new SockJS(`${location.protocol}//${location.host}/chatEndPoint`, null, {
      transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
    });
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
  currentSubscription.value = client?.subscribe(`/channel/${roomId.value}`, onMessageReceived);
  currentSubscription.value = client?.subscribe(`/channel/${roomId.value}/${nameInput.value}`, onMessageReceived);
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
  background: #f6f5f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: -20px 0 0px;
  background-image: url('../../../assets/images/chatBackground.jpg');
  background-size: cover;

  .form-wrapper {
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
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
