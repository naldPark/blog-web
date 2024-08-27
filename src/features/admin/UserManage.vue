<template>
  <div>
    <div>
      <v-data-table v-model="selected" :headers="userHeaders" :items="userList">
        <template v-slot:item.authority="{ value }"> {{ value }}zz </template>
        <template v-slot:item.actions="{ item }">
          <v-icon class="me-2" size="small"> mdi-pencil </v-icon>
          <v-icon size="small"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </div>
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
import InputText from '@/components/common/InputText.vue';
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
const selected = ref<any[]>([]);
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
  { title: 'ID', key: 'accountId', sortable: false },
  { title: t('name'), key: 'accountName', sortable: false },
  { title: t('group'), key: 'group', sortable: false },
  { title: t('email'), key: 'email', sortable: false },
  { title: t('failCnt'), key: 'loginFailCnt', sortable: false },
  { title: t('status'), key: 'status', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false },
  // { text: t('createdAt'), key: 'createdAt', sortable: false, width: 150 },
  // { text: t('modifiedAt'), key: 'modifiedAt', sortable: false, width: 150 },
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
  queryKey: [COMMON_QUERY_KEY.USER_LIST],
  queryFn: getUserList,
  keepPreviousData: false,
  staleTime: 5 * 60 * 1000, // 5분
  onError: (err: ApiErrorResponse) => {
    console.log('Error:', err);
  },
  onSuccess: (res: ApiResponse) => {
    console.log('res', res);
    userList.value = res.data.list.map((v: any) => ({
      ...v,
      group: getGroup(v.authority),
      status: getStatus(v.status),
    }));
    totalPageNumber.value = Math.ceil(
      res.data.total / listOptions.value.itemsPerPage,
    );
    console.log('userList', userList.value);
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
