<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  getUserList,
  changeStatus,
  postCreateUser,
  putEditUser,
} from '@/api/accountService';
import InputText from '@/components/common/InputText.vue';
import { useAppCommonStore } from '@/store/appCommonStore';
import { COMMON_QUERY_KEY } from '@/types/queryEnum';
import { ApiResponse } from '@/types/axios';
import Button from '@/components/common/Button.vue';
import useMutation from '@/hook/useMutation';
import useCustomQuery from '@/hook/useCustomQuery';
import UserEditDialog from '../dialog/UserEditDialog.vue';
import { UserManage, UserRequestBody } from '@/types/admin';
import { clone } from 'ramda';
import useReset from '@/hook/useReset';
import { encryptPassword } from '@/utils/commonUtil';

const selectedUser = ref<UserManage>();
const appStatusStore = useAppCommonStore();
const { t } = useI18n();
const { initialize } = useReset();

const userSearch = ref('');

const showUserEditDialog = ref(false);
const userList = ref<UserManage[]>([]);

const listOptions = ref({
  page: 1,
  itemsPerPage: 5,
});

const userHeaders = ref([
  { title: 'ID', key: 'accountId', sortable: false },
  { title: t('name'), key: 'accountName', sortable: false },
  { title: t('group'), key: 'group', sortable: false },
  { title: t('email'), key: 'email', sortable: false },
  { title: t('failCnt'), key: 'loginFailCnt', sortable: false },
  { title: t('status'), key: 'status', sortable: false },
  {
    title: t('lastLoginDt'),
    key: 'recentLoginDt',
    sortable: false,
    width: 150,
  },
  { title: t('createdDt'), key: 'createdDt', sortable: false, width: 150 },
  {
    title: 'Action',
    align: 'center',
    key: 'actions',
    sortable: false,
    width: 150,
  },
]);

const clickDeleteUser = (rowData: UserManage) => {
  appStatusStore.showDialog({
    title: t('deleteUsers'),
    description: `${t('deleteRowMsg', [rowData.accountName])}`,
    showCloseButton: true,
    action: () => deleteUser(rowData),
  });
};

const getGroup = (authority: number) => {
  const groups = ['super', 'all', 'buddy', 'biz', 'viewer'];
  return groups[authority] || 'viewer';
};

const getStatus = (status: number) => {
  const statuses = [
    { key: 'active', color: 'var(--succcess)' },
    { key: 'locked', color: 'var(--error)' },
    { key: 'deleted', color: 'grey' },
  ];
  return statuses[status] || { key: 'active', color: 'green' };
};

/** UserList Query */
const { hardFetch: userRefetch } = useCustomQuery({
  queryKey: [COMMON_QUERY_KEY.USER_LIST],
  queryFn: getUserList,
  onSuccess: (res: ApiResponse) => {
    userList.value = res.data.list.map(
      ({ authority, status, ...rest }: UserManage) => ({
        ...rest,
        authority,
        group: getGroup(authority),
        status: getStatus(status),
      }),
    );
  },
});

const userApiCallback = () => {
  showUserEditDialog.value = false;
  selectedUser.value = initialize(selectedUser.value);
  userRefetch();
};

/** User 삭제 mutation */
const { mutate: deleteUser } = useMutation({
  mutationFn: (rowData: UserManage) => changeStatus([rowData.accountId], 2),
  onSuccess: () => {
    appStatusStore.showToast({
      type: 'success',
      message: t('complete'),
    });
    appStatusStore.hideDialog();
  },
});

/** User 수정 mutation */
const { mutate: onEditUser } = useMutation({
  mutationFn: (userInfo: UserRequestBody) => putEditUser(userInfo),
  onSuccess: () => {
    appStatusStore.showToast({
      type: 'success',
      message: t('confirmMsg'),
    });
    userApiCallback();
  },
});

/** User 생성 Mutation */
const { mutate: onCreateUser } = useMutation({
  mutationFn: async (userInfo: UserRequestBody) => {
    const encryptedValue = await encryptPassword(userInfo.password);
    return await postCreateUser({
      ...userInfo,
      password: encryptedValue,
    });
  },
  onSuccess: () => {
    appStatusStore.showToast({
      type: 'success',
      message: t('complete'),
    });
    userApiCallback();
  },
});

const clickCreateUser = () => {
  selectedUser.value = initialize(selectedUser.value);
  showUserEditDialog.value = true;
};

const clickEditUser = (rowData: UserManage) => {
  selectedUser.value = clone(rowData);
  showUserEditDialog.value = true;
};
</script>

<template>
  <VCard flat>
    <VCardTitle class="d-flex align-center pe-2">
      <VIcon icon="mdi-account-group" size="sm" color="secondary" />
      <span class="ml-3">{{ t('userList') }}</span>
      <VSpacer />
      <InputText
        v-model="userSearch"
        density="compact"
        append-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      />
      <Button label="사용자 추가" class="ml-3" @onClick="clickCreateUser()" />
    </VCardTitle>
    <VDivider />
    <VDataTable
      class="ps-3 pe-3"
      v-model:search="userSearch"
      :headers="userHeaders"
      :items="userList"
      :page="listOptions.page"
      :itemsPerPage="listOptions.itemsPerPage"
    >
      <template v-slot:item.status="{ value }">
        <span :style="{ color: value.color }">{{ value.key }}</span>
      </template>
      <template v-slot:item.actions="{ item }">
        <VTooltip :text="t('edit')">
          <template v-slot:activator="{ props }">
            <Button
              color=""
              class="text-amber-lighten-1 mr-3"
              icon="mdi-pencil"
              size="sm"
              :disabled="item.status.key === 'deleted'"
              variant="text"
              @onClick="clickEditUser(item)"
              v-bind="props"
            />
          </template>
        </VTooltip>
        <VTooltip :text="t('delete')">
          <template v-slot:activator="{ props }">
            <Button
              color=""
              class="text-grey-lighten-1"
              icon="mdi-delete"
              size="sm"
              variant="text"
              :disabled="item.status.key === 'deleted'"
              v-bind="props"
              @onClick="clickDeleteUser(item)"
            />
          </template>
        </VTooltip>
      </template>
    </VDataTable>
  </VCard>
  <UserEditDialog
    v-if="showUserEditDialog"
    v-model:showDialog="showUserEditDialog"
    :selectedUser="selectedUser"
    @action-on-create="onCreateUser"
    @action-on-edit="onEditUser"
  />
</template>

<style lang="scss" scoped></style>
