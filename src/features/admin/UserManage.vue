<template>
  <div class="contents">
    <!-- <VDataTable show-select :headers="userHeaders" :items="userList" class="custom-table use-head" @click="onClickRow"
      :single-select="false" :options.sync="listOptions" v-model="selectedItems" item-key="accountId"
      hide-default-footer>
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.group }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.failCnt }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.iron }}</td>
        </tr>
      </template>
<template v-slot:top>
        <VToolbar flat>
          <VSpacer></VSpacer>
          <VDialog v-model="editUserDialog" max-width="500px" v-if="selectedItems.length === 1">
            <template v-slot:activator="{ on, attrs }">
              <VBtn class="ma-2" color="secondary" outlined rounded text small v-bind="attrs" v-on="on"
                @click="resetInput">
                {{ t('editUser') }}
              </VBtn>
            </template>
<VCard ref="form">
  <VCardTitle>
    <span class="text-h5">{{ t('editUser') }}</span>
  </VCardTitle>
  <VCardText v-if="editUserDialog === true && selectedItems[0]">
    <VTextField v-model="selectedItems[0].accountId" :counter="15" label="Id" required></VTextField>
    <VTextField v-model="selectedItems[0].accountName" :counter="10" label="Name" required></VTextField>
    <VTextField v-model="selectedItems[0].email" label="E-mail" required></VTextField>
    <VSelect v-model="selectedItems[0].authority" :items="authority" item-text="label" item-value="value" label="Item"
      required></VSelect>
  </VCardText>
  <VCardActions>
    <VSpacer></VSpacer>
    <VBtn class="ma-2" large @click="clickToChangeAccountInfo" color="primary" outlined rounded text>
      {{ t('editPassword') }}
    </VBtn>
    <VBtn class="ma-2" large @click="addUserDialog = false" color="primary" outlined rounded text>
      {{ t('cancel') }}
    </VBtn>
    <VBtn class="ma-2" large color="primary" outlined rounded text dark @click="onClickEdit">
      {{ t('confirm') }}
    </VBtn>
  </VCardActions>
</VCard>
</VDialog>
<VBtn class="ma-2" color="error" @click="clickDeleteUsers" small outlined rounded text>
  {{ t('deleteUsers') }}
</VBtn>
<VDialog v-model="addUserDialog" max-width="500px">
  <template v-slot:activator="{ on, attrs }">
              <VBtn class="ma-2" color="primary" outlined rounded text small v-bind="attrs" v-on="on"
                @click="resetInput">
                {{ t('addUser') }}
              </VBtn>
            </template>
  <VCard ref="form">
    <VCardTitle>
      <span class="text-h5">{{ t('addUser') }}</span>
    </VCardTitle>
    <VCardText v-if="addUserDialog === true">
      <VTextField v-model="newUserInfo.accountId" :counter="15" label="Id" required></VTextField>
      <VTextField v-model="newUserInfo.accountName" :counter="10" label="Name" required></VTextField>
      <VRow>
        <VCol cols="12" sm="6">
          <VTextField v-model="newUserInfo.password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'" name="input-10-1" label="Password" counter
            @click:append="showPassword = !showPassword"></VTextField>
        </VCol>
        <VCol cols="12" sm="6">
          <VTextField v-model="confirmPassword" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'" name="input-10-2" label="PasswordConfirm"
            class="input-group--focused" @click:append="showPassword = !showPassword"></VTextField>
        </VCol>
      </VRow>
      <VTextField v-model="newUserInfo.email" label="E-mail" required></VTextField>
      <VSelect v-model="newUserInfo.authority" :items="authority" item-text="label" item-value="value" label="Item"
        required></VSelect>
    </VCardText>
    <VCardActions>
      <VSpacer></VSpacer>
      <VBtn class="ma-2" large @click="addUserDialog = false" color="primary" outlined rounded text>
        {{ t('cancel') }}
      </VBtn>
      <VBtn class="ma-2" large color="primary" outlined rounded text dark @click="onClickCreate">
        {{ t('confirm') }}
      </VBtn>
    </VCardActions>
  </VCard>
</VDialog>
</VToolbar>
</template>
<template v-slot:footer>
        <div class="pagination-wrapper">
          <div class="icon-page-first" @click="currentPageNumber = 1">
            <VBtn plain color="primary">
              <VIcon>mdi-page-first</VIcon>
            </VBtn>
          </div>
          <v-pagination v-model="currentPageNumber" :length="totalPageNumber" :total-visible="5"
            next-icon="mdi-chevron-right" preVIcon="mdi-chevron-left">
          </v-pagination>
          <div class="icon-page-last" @click="currentPageNumber = totalPageNumber">
            <VBtn plain color="primary">
              <VIcon>mdi-page-last</VIcon>
            </VBtn>
          </div>
          <div v-if="!isMobile" class="page-select grey--text" style="align-items : center;">
            <VSelect class="selectPageCount" dense v-model="listOptions.pageItem" :items="listOptions.pageItems"
              @change="changePageItem"></VSelect>
            <span class="caption text-end ml-2 grey--text">{{ t('countPerPage') }}</span>
          </div>
        </div>
      </template>
</VDataTable> -->
    <!-- <edit-account-info-dialog v-if="selectedItems[0]" v-model="showEditAccountPasswordDialog"
      :accountId="selectedItems[0].accountId"></edit-account-info-dialog> -->
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import {
    changeStatus,
    getUserList,
    createUser,
    editUser,
  } from '@/api/accountService';
  import ChangePasswordDialog from '@/features/dialog/ChangePasswordDialog.vue';
  import { useAppCommonStore } from '@/store';

  const appStatusStore = useAppCommonStore();
  const { t } = useI18n();

  const props = defineProps<{ isMobile?: boolean }>();

  const isMobile = props.isMobile ?? false;
  const newUserInfo = ref({
    accountId: '',
    accountName: '',
    email: '',
    password: '',
    authority: 4,
  });
  const addUserDialog = ref(false);
  const editUserDialog = ref(false);
  const showEditAccountPasswordDialog = ref(false);
  const selectedItems = ref([]);
  const userList = ref([]);
  const showPassword = ref(false);
  const confirmPassword = ref('');
  const totalPageNumber = ref(0);

  const listOptions = ref({
    page: 1,
    itemsPerPage: 12,
    pageItem: 12,
    pageItems: [12, 24, 48],
    totalCount: 0,
  });

  const authority = ref([
    { value: 0, label: 'Super' },
    { value: 1, label: 'All' },
    { value: 2, label: 'Buddy' },
    { value: 3, label: 'Biz' },
    { value: 4, label: 'Viewer' },
  ]);

  const userHeaders = ref([
    { text: 'ID', key: 'accountId', sortable: false, width: 50 },
    { text: t('name'), key: 'accountName', sortable: false, width: 90 },
    { text: t('group'), key: 'group', sortable: false, width: 110 },
    { text: t('email'), key: 'email', sortable: false, width: 140 },
    { text: t('failCnt'), key: 'loginFailCnt', sortable: false, width: 90 },
    { text: t('status'), key: 'status', sortable: false, width: 80 },
    { text: t('createdAt'), key: 'createdAt', sortable: false, width: 150 },
    { text: t('modifiedAt'), key: 'modifiedAt', sortable: false, width: 150 },
  ]);

  const currentPageNumber = computed({
    get: () => listOptions.value.page,
    set: (value) => (listOptions.value.page = value),
  });

  const onClickRow = (click: any, row: any) => {
    console.log('로우클릭', click, row);
    // selectedItems.value = [item];
  };

  const resetInput = () => {
    newUserInfo.value = {
      accountId: '',
      accountName: '',
      email: '',
      password: '',
      authority: 4,
    };
    confirmPassword.value = '';
  };

  const clickDeleteUsers = () => {
    // const checkedUsers = selectedItems.value.map(m => m.accountName);
    // appStatusStore.showDialog({
    //   title: t('deleteUsers'),
    //   description: `${t('deleteUsersMsg', [checkedUsers.join(', ')])}`,
    //   invisibleClose: true,
    //   action: () => {
    //     changeStatus(checkedUsers, 2).then((res: any) => {
    //       if (res.data.statusCode === 200) {
    //         fetchUserList();
    //         appStatusStore.addToastMessage({
    //           type: 'error',
    //           message: t('complete'),
    //           buttonMsg: null,
    //           timeout: null,
    //           buttonCallback: null
    //         });
    //       }
    //     },
    //     )
    //   }
    // });
  };

  const getGroup = (authority: number) => {
    switch (authority) {
      case 0:
        return 'super';
      case 1:
        return 'all';
      case 2:
        return 'buddy';
      case 3:
        return 'biz';
      case 4:
      default:
        return 'viewer';
    }
  };

  //0 : ok, 1: locked, 2: deleted
  const getStatus = (status: number) => {
    switch (status) {
      case 0:
        return 'active';
      case 1:
        return 'looked';
      case 2:
        return 'deleted';
      default:
        return 'active';
    }
  };

  const fetchUserList = () => {
    return new Promise((resolve) => {
      appStatusStore.showLoading();
      getUserList()
        .then((res: any) => {
          if (res.status_code === 200) {
            console.log(res.data);
            userList.value = res.data.list.map((v: any) => ({
              ...v,
              group: getGroup(v.authority),
              status: getStatus(v.status),
            }));
            totalPageNumber.value = Math.ceil(
              res.data.total / listOptions.value.itemsPerPage,
            );
          }
          resolve({ finish: true });
          appStatusStore.hideLoading();
        })
        .catch((error: any) => {
          appStatusStore.hideLoading();
          resolve({ finish: true });
        });
    });
  };

  const onClickCreate = async () => {
    if (newUserInfo.value.password !== confirmPassword.value) {
      alert(t('passwordMismatch'));
      return;
    }
    await createUser(newUserInfo.value);
    addUserDialog.value = false;
    await fetchUserList();
  };

  const checkValidate = (type: any) => {
    const returnMsg = { result: true, msg: '' };

    // if (type === 'edit') {
    //   this.newUserInfo = this.selectedItems[0];
    // }
    // Object.keys(this.newUserInfo).forEach(v => {
    //   if (this.newUserInfo[v] === "") {
    //     returnMsg.result = false;
    //     returnMsg.msg = returnMsg.msg + `${this.$i18n.t('requiredError', [v])} \n `;
    //   } else {
    //     if (v === 'accountId') {
    //       if (!/^[a-z0-9]*$/.test(this.newUserInfo[v])) {
    //         returnMsg.result = false;
    //         returnMsg.msg = returnMsg.msg + `${this.$i18n.t('idRulesError')} \n `;
    //       }
    //       if (this.newUserInfo[v].length > 15) {
    //         returnMsg.result = false;
    //         returnMsg.msg = returnMsg.msg + `${this.$i18n.t('lengthRulesError', ['Id', 15])} \n `;
    //       }
    //     } else if (v === 'accountName') {
    //       if (this.newUserInfo[v].length > 10) {
    //         returnMsg.result = false;
    //         returnMsg.msg = returnMsg.msg + `${this.$i18n.t('lengthRulesError', ['name', 10])} \n `;
    //       }
    //     } else if (v === 'email') {
    //       if (!/.+@.+\..+/.test(this.newUserInfo[v])) {
    //         returnMsg.result = false;
    //         returnMsg.msg = returnMsg.msg + `${this.$i18n.t('emailRulesError')} \n `;
    //       }
    //     } else if (v === 'password' && type === 'create') {
    //       if (this.newUserInfo.password !== this.confirmPassword) {
    //         returnMsg.result = false;
    //         returnMsg.msg = returnMsg.msg + `${this.$i18n.t('passwordRulesError')} \n `;
    //       }
    //     }
    //   }
    // })

    return returnMsg;
  };

  const onClickEdit = () => {
    const returnMsg = checkValidate('edit');
    if (!returnMsg.result) {
      appStatusStore.showDialog({
        title: t('error'),
        description: returnMsg.msg,
        invisibleClose: true, // 캔슬버튼 가리기
        action: () => {},
      });
      return;
    }

    editUser(selectedItems.value[0]).then((res: any) => {
      if (res.data.statusCode === 200) {
        appStatusStore.showDialog({
          title: t('complete'),
          description: t('confirmMsg'),
          invisibleClose: true, // 캔슬버튼 가리기
          action: () => {
            fetchUserList();
          },
        });
        editUserDialog.value = false;
        showEditAccountPasswordDialog.value = false;
      } else {
        appStatusStore.showDialog({
          title: t('error'),
          description: res.data.message,
          invisibleClose: true, // 캔슬버튼 가리기
          action: () => {},
        });
      }
    });
  };

  const clickToChangeAccountInfo = () => {
    showEditAccountPasswordDialog.value = true;
  };

  const changePageItem = () => {
    listOptions.value.page = 1;
    fetchUserList();
  };

  onMounted(fetchUserList);
</script>

<style scoped>
  .pagination-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
  }

  .selectPageCount {
    width: 100px;
  }

  .icon-page-first,
  .icon-page-last {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
