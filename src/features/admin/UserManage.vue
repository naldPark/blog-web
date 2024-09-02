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
    v-if="selectedUser && showUserEditDialog"
    v-model:showDialog="showUserEditDialog"
    @confirm="editConfirm"
    :selectedUser="selectedUser"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { getUserList, createUser, changeStatus } from '@/api/accountService';
import InputText from '@/components/common/InputText.vue';
import { useAppCommonStore } from '@/store/appCommonStore';
import { COMMON_QUERY_KEY } from '@/types/queryEnum';
import { ApiResponse } from '@/types/axios';
import Button from '@/components/common/Button.vue';
import useMutation from '@/hook/useMutation';
import useCustomQuery from '@/hook/useCustomQuery';
import UserEditDialog from '../dialog/UserEditDialog.vue';
import { UserManage } from '@/types/admin';
import { clone } from 'ramda';

const selectedUser = ref<UserManage>();
const appStatusStore = useAppCommonStore();
const { t } = useI18n();

const userSearch = ref('');

const newUserInfo = ref({
  accountId: '',
  accountName: '',
  email: '',
  password: '',
  authority: 4,
});
const showUserEditDialog = ref(false);
const addUserDialog = ref(false);
const userList = ref<UserManage[]>([]);
const confirmPassword = ref('');

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
  { title: 'Action', key: 'actions', sortable: false, width: 150 },
]);

const editConfirm = () => {
  showUserEditDialog.value = false;
  selectedUser.value = undefined;
  refetch;
};

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

const clickDeleteUser = (rowData: UserManage) => {
  appStatusStore.showDialog({
    title: t('deleteUsers'),
    description: `${t('deleteUsersMsg', [rowData.accountName])}`,
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

const { refetch } = useCustomQuery({
  queryKey: [COMMON_QUERY_KEY.USER_LIST],
  queryFn: getUserList,
  onSuccess: (res: ApiResponse) => {
    userList.value = res.data.list.map(
      ({ authority, status, ...rest }: any) => ({
        ...rest,
        authority,
        group: getGroup(authority),
        status: getStatus(status),
      }),
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
  refetch;
};
const clickEditUser = (rowData: UserManage) => {
  selectedUser.value = clone(rowData);
  showUserEditDialog.value = true;
};
</script>

<style lang="scss" scoped></style>
