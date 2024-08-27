<template>
  <div class="contents">
    <VDataTable
      show-select
      :headers="userHeaders"
      :items="userList"
      class="custom-table use-head"
      @click="onClickRow"
      :single-select="false"
      :options.sync="listOptions"
      v-model="selectedItems"
      item-key="accountId"
      hide-default-footer
    >
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
          <VSpacer />
          <VDialog
            v-model="editUserDialog"
            max-width="500px"
            v-if="selectedItems.length === 1"
          >
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                color="surface-variant"
                :text="t('editUser')"
                variant="flat"
              ></v-btn>
            </template>
            <VCard ref="form">
              <VCardTitle>
                <span class="text-h5">{{ t('editUser') }}</span>
              </VCardTitle>
              <VCardText v-if="editUserDialog && selectedItems[0]">
                <VTextField
                  v-model="selectedItems[0].accountId"
                  :counter="15"
                  label="Id"
                  required
                />
                <VTextField
                  v-model="selectedItems[0].accountName"
                  :counter="10"
                  label="Name"
                  required
                />
                <VTextField
                  v-model="selectedItems[0].email"
                  label="E-mail"
                  required
                />
                <VSelect
                  v-model="selectedItems[0].authority"
                  :items="authority"
                  item-text="label"
                  item-value="value"
                  label="Item"
                  required
                />
              </VCardText>
              <VCardActions>
                <VSpacer />
                <VBtn
                  class="ma-2"
                  large
                  @click="clickToChangeAccountInfo"
                  color="primary"
                  outlined
                  rounded
                >
                  {{ t('editPassword') }}
                </VBtn>
                <VBtn
                  class="ma-2"
                  large
                  @click="addUserDialog = false"
                  color="primary"
                  outlined
                  rounded
                >
                  {{ t('cancel') }}
                </VBtn>
                <VBtn
                  class="ma-2"
                  large
                  color="primary"
                  outlined
                  rounded
                  dark
                  @click="onClickEdit"
                >
                  {{ t('confirm') }}
                </VBtn>
              </VCardActions>
            </VCard>
          </VDialog>
          <VBtn
            class="ma-2"
            color="error"
            @click="clickDeleteUsers"
            small
            outlined
            rounded
          >
            {{ t('deleteUsers') }}
          </VBtn>
          <VDialog v-model="addUserDialog" max-width="500px">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                color="primary"
                :text="t('addUser')"
                variant="flat"
                @click="resetInput"
              ></v-btn>
            </template>
            <VCard ref="form">
              <VCardTitle>
                <span class="text-h5">{{ t('addUser') }}</span>
              </VCardTitle>
              <VCardText v-if="addUserDialog">
                <VTextField
                  v-model="newUserInfo.accountId"
                  :counter="15"
                  label="Id"
                  required
                />
                <VTextField
                  v-model="newUserInfo.accountName"
                  :counter="10"
                  label="Name"
                  required
                />
                <VRow>
                  <VCol cols="12" sm="6">
                    <VTextField
                      v-model="newUserInfo.password"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      name="input-10-1"
                      label="Password"
                      counter
                      @click:append="showPassword = !showPassword"
                    />
                  </VCol>
                  <VCol cols="12" sm="6">
                    <VTextField
                      v-model="confirmPassword"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      name="input-10-2"
                      label="PasswordConfirm"
                      class="input-group--focused"
                      @click:append="showPassword = !showPassword"
                    />
                  </VCol>
                </VRow>
                <VTextField
                  v-model="newUserInfo.email"
                  label="E-mail"
                  required
                />
                <VSelect
                  v-model="newUserInfo.authority"
                  :items="authority"
                  item-text="label"
                  item-value="value"
                  label="Item"
                  required
                />
              </VCardText>
              <VCardActions>
                <VSpacer />
                <VBtn
                  class="ma-2"
                  large
                  @click="addUserDialog = false"
                  color="primary"
                  outlined
                  rounded
                >
                  {{ t('cancel') }}
                </VBtn>
                <VBtn
                  class="ma-2"
                  large
                  color="primary"
                  outlined
                  rounded
                  dark
                  @click="onClickCreate"
                >
                  {{ t('confirm') }}
                </VBtn>
              </VCardActions>
            </VCard>
          </VDialog>
        </VToolbar>
      </template>
      <template v-slot:bottom>
        <div class="pagination-wrapper">
          <div class="icon-page-first" @click="currentPageNumber = 1">
            <VBtn plain color="primary">
              <VIcon>mdi-page-first</VIcon>
            </VBtn>
          </div>
          <v-pagination
            v-model="currentPageNumber"
            :length="totalPageNumber"
            :total-visible="5"
            next-icon="mdi-chevron-right"
            prev-icon="mdi-chevron-left"
          />
          <div
            class="icon-page-last"
            @click="currentPageNumber = totalPageNumber"
          >
            <VBtn plain color="primary">
              <VIcon>mdi-page-last</VIcon>
            </VBtn>
          </div>
          <div
            v-if="!isMobile"
            class="page-select grey--text"
            style="align-items: center"
          >
            <VSelect
              class="selectPageCount"
              dense
              v-model="listOptions.pageItem"
              :items="listOptions.pageItems"
              @change="changePageItem"
            />
            <span class="caption text-end ml-2 grey--text">{{
              t('countPerPage')
            }}</span>
          </div>
        </div>
      </template>
    </VDataTable>
    <edit-account-info-dialog
      v-if="selectedItems[0]"
      v-model="showEditAccountPasswordDialog"
      :accountId="selectedItems[0].accountId"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { getUserList, createUser, editUser } from '@/api/accountService';
import { useAppCommonStore } from '@/store';
import { isEmpty } from 'ramda';
import { COMMON_QUERY_KEY } from '@/types/queryEnum';
import { useQuery } from 'vue-query';
import { ApiErrorResponse, ApiResponse } from '@/types/axios';

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
const selectedItems = ref<any[]>([]);
const userList = ref<any[]>([]);
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
  const checkedUsers = selectedItems.value.map((m) => m.accountName);
  appStatusStore.showDialog({
    title: t('deleteUsers'),
    description: `${t('deleteUsersMsg', [checkedUsers.join(', ')])}`,
    showCloseButton: true,
    action: () => {
      // changeStatus(checkedUsers, 2).then((res: any) => {
      //   if (res.data.statusCode === 200) {
      //     fetchUserList();
      //     appStatusStore.addToastMessage({
      //       type: 'error',
      //       message: t('complete'),
      //     });
      //   }
      // });
    },
  });
};

const getGroup = (authority: number) => {
  const groups = ['super', 'all', 'buddy', 'biz', 'viewer'];
  return groups[authority] || 'viewer';
};

const getStatus = (status: number) => {
  const statuses = ['active', 'looked', 'deleted'];
  return statuses[status] || 'active';
};
const { refetch } = useQuery({
  queryKey: ['USER_LIST'], // COMMON_QUERY_KEY.USER_LIST로 정의된 상수로 대체
  queryFn: getUserList,
  keepPreviousData: false,
  staleTime: 5 * 60 * 1000, // 5분
  onError: (err: ApiErrorResponse) => {
    console.log('Error:', err);
  },
  onSuccess: (res: ApiResponse) => {
    console.log('res', res.data);
    userList.value = res.data.list.map((v: any) => ({
      ...v,
      group: getGroup(v.authority),
      status: getStatus(v.status),
    }));
    totalPageNumber.value = Math.ceil(
      res.data.total / listOptions.value.itemsPerPage,
    );
  },
});
const onClickCreate = async () => {
  if (newUserInfo.value.password !== confirmPassword.value) {
    alert(t('passwordMismatch'));
    return;
  }
  await createUser(newUserInfo.value);
  addUserDialog.value = false;
  // await refetch();
};

const checkValidate = (type: 'edit' | 'create') => {
  const messages: string[] = [];
  const { accountId, accountName, email, password } = newUserInfo.value;

  if (type === 'edit') {
    Object.assign(newUserInfo.value, selectedItems.value[0]);
  }

  if (!accountId) messages.push(t('requiredError', ['Id']));
  else {
    if (!/^[a-z0-9]*$/.test(accountId)) messages.push(t('idRulesError'));
    if (accountId.length > 15) messages.push(t('lengthRulesError', ['Id', 15]));
  }

  if (!accountName) messages.push(t('requiredError', ['Name']));
  else if (accountName.length > 10)
    messages.push(t('lengthRulesError', ['Name', 10]));

  if (!email) messages.push(t('requiredError', ['E-mail']));
  else if (!/.+@.+\..+/.test(email)) messages.push(t('emailRulesError'));

  if (type === 'create') {
    if (password !== confirmPassword.value)
      messages.push(t('passwordRulesError'));
  }

  return { result: messages.length === 0, msg: messages.join('\n ') };
};

const onClickEdit = async () => {
  const { result, msg } = checkValidate('edit');
  if (!result) {
    appStatusStore.showDialog({
      title: t('error'),
      description: msg,
      showCloseButton: true,
      action: () => {},
    });
    return;
  }

  const res = await editUser(selectedItems.value[0]);
  console.log('res', res);
  // if (res.data.statusCode === 200) {
  //   appStatusStore.showDialog({
  //     title: t('complete'),
  //     description: t('confirmMsg'),
  //     showCloseButton: true,
  //     action: fetchUserList,
  //   });
  //   editUserDialog.value = false;
  //   showEditAccountPasswordDialog.value = false;
  // } else {
  //   appStatusStore.showDialog({
  //     title: t('error'),
  //     description: 'dddddd',
  //     showCloseButton: true,
  //     action: () => {},
  //   });
  // }
};

const clickToChangeAccountInfo = () => {
  showEditAccountPasswordDialog.value = true;
};

const changePageItem = () => {
  listOptions.value.page = 1;
  // fetchUserList();
};

// onMounted(fetchUserList);
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
