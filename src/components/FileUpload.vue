<template>
  <div>
    <h2>업로드할 파일을 선택하세요:</h2>
    <input type="file" @change="onFileChange" />
    <h3>실제 설치된 버전:</h3>
    <ul>
      <li v-for="(version, dependency) in installedVersions" :key="dependency">
        {{ dependency }}: {{ version }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { defineComponent, ref } from 'vue';
  import { parsePackageJson, compareDependencies } from '@/utils/fileParser';

  const installedVersions = ref<Record<string, string>>({});

  const onFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
      const packageJsonFile = files[0];
      const packageLockJsonFile = files[1];

      if (packageJsonFile && packageLockJsonFile) {
        const packageJson = await parsePackageJson(packageJsonFile);
        const packageLockJson = await parsePackageJson(packageLockJsonFile);

        // 비교 및 실제 설치된 버전 리스팅
        const result = compareDependencies(packageJson, packageLockJson);
        installedVersions.value = result;
      }
    }
  };
</script>
