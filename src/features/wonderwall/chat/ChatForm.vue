<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCookies } from '@vueuse/integrations/useCookies';
import InputText from '@/components/common/InputText.vue';
import Button from '@/components/common/Button.vue';
const emit = defineEmits(['connect']);
const cookies = useCookies();
const { t } = useI18n();
const roomInput = ref<string>('default');

const nameInput = defineModel('nameInput', {
  type: String,
});

/* 컴포넌트 마운트 시 쿠키 값으로 초기화 */
onMounted(() => {
  const savedName = cookies.get('roomname');
  if (savedName) nameInput.value = savedName;

  const savedRoom = cookies.get('roomId');
  if (savedRoom) roomInput.value = savedRoom;
});
</script>

<template>
  <div class="form-wrapper">
    <div class="form-container">
      <h1>Chat Room</h1>
      <span>{{ t('chat.enterInfo') }}</span>
      <InputText label="ID" v-model="nameInput" flat placeholder="name" />
      <InputText
        label="Room"
        :disabled="true"
        v-model="roomInput"
        flat
        placeholder="roomID"
      />
      <Button
        @click="emit('connect', nameInput)"
        :disabled="!nameInput || !roomInput"
        class="ma-2"
        color="primary"
        dark
        :label="t('chat.enter')"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-wrapper {
  border-radius: 10px;
  background: #f6f5f7 url('../../../assets/images/chatBackground.jpg') no-repeat
    center center / cover;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
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
</style>
