<template>
    <div>
        <h1>패키지 버전 검사기</h1>
        <FileUpload />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FileUpload from '@/components/FileUpload.vue';

export default defineComponent({
    components: {
        FileUpload,
    },
});
</script>