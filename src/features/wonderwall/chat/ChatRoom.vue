<script lang="ts" setup>
import { useCookies } from '@vueuse/integrations/useCookies';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const messageInput = ref('');
const { t } = useI18n();
const cookies = useCookies();
const emit = defineEmits(['sendMessage']);

defineProps<{
  messageList: { type: string; id?: string; content: string }[];
  roomId: string;
}>();

/** 아바타에 부여할 수 있는 색상 목록 */
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

/**  아바타 색상 반환 **/
const getAvatarColor = (messageSender: string) => {
  let hash = 0;
  for (let i = 0; i < messageSender.length; i++) {
    hash = 31 * hash + messageSender.charCodeAt(i);
  }
  return colors[Math.abs(hash % colors.length)];
};

const sendMessage = () => {
  emit('sendMessage', messageInput.value);
  messageInput.value = '';
};

// 채팅방 나가기
const leave = () => {
  cookies.remove('roomname');
  cookies.remove('roomId');
  location.reload();
};
</script>

<template>
  <VCard max-width="1000" class="mx-auto">
    <VToolbar dark>
      <VToolbarTitle class="text-primary" v-if="roomId">
        {{ t('chat.chatRoom') }} [{{ roomId }}]
      </VToolbarTitle>
      <VSpacer />
      <Button
        class="ma-1 mr-3"
        color="secondary"
        plain
        @click="leave"
        :label="t('leave')"
      />
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
          <VAvatar v-if="item.id" :color="getAvatarColor(item.id)">
            {{ item.id && item.id.charAt(0) }}
          </VAvatar>
        </template>
      </VListItem>
    </VList>
    <div class="chat-container pa-2 pl-3 pr-3">
      <InputText
        outlined
        dense
        v-model="messageInput"
        append-inner-icon="mdi-send"
        :label="t('typeMessage')"
        type="text"
        @click:append-inner="sendMessage"
        @keyup.enter="sendMessage"
      />
    </div>
  </VCard>
</template>
