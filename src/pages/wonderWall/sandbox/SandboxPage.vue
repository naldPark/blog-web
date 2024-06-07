<template>
    <div class='sandbox-wrapper'>
        <v-card variant="outlined" elevation="0" class="sandbox-card">
            <v-card-title class="text-subtitle-1 text-primary">{{ $t('sandbox.funcInfo') }}</v-card-title>
            <v-card-text class="mb-3">
                <p class="subtitle-2 text-white mt-3 mb-1">{{ $t('sandbox.rules') }}</p>
                <h4 class="ec2Content font-weight-light" style="margin-right: 12px">
                    {{ sandboxMessage.rulesDesc }}</h4>
                <p class="subtitle-2 text-white mt-3 mb-1">{{ $t('sandbox.howToUse') }}</p>
                <div class="ec2Content font-weight-light" style="margin-right: 12px">
                    {{ sandboxMessage.howToUseDesc }}</div>
            </v-card-text>
        </v-card>
        <v-card variant="outlined" elevation="0" class="sandbox-card">
            <v-card-title class="text-subtitle-1 text-primary">{{ $t('sandbox.environmentInfo') }}</v-card-title>
            <v-card-text>
                <p class="subtitle-2 mt-3 mb-1">{{ $t('sandbox.status') }}</p>
                <!-- <v-select style="max-width: 300px;" item-text="name" class="input-custom pt-0"
                    v-model="selectedStatusItem" :items="statusItems" @change="onChangeStatus">
                    <template v-slot:selection="{ item }">
                        <span><v-icon :style="{ color: item.color }">{{ item.icon }}</v-icon>{{ item.name }}</span>
                    </template>
<template v-slot:item="{ item }">
                        <span><v-icon :style="{ color: item.color }">{{ item.icon }}</v-icon>{{ item.name }}</span>
                    </template>
</v-select> -->
                <v-row align="center" class="mt-3 mb-1">
                    <v-col cols="12" sm="6">
                        <p class="subtitle-2 text-white mt-3 mb-1">{{ $t('sandbox.instanceInfo') }}</p>
                        <span class="ec2Content">
                            <v-icon class="text-primary mr-1">mdi-ubuntu</v-icon>
                            Linux
                        </span>
                        <v-btn color="error" rounded small @click="accessEndpoint">{{ $t('sandbox.startInstance')
                            }}</v-btn>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <p class="subtitle-2 text-white mt-3 mb-1">{{ $t('sandbox.instancePwd') }}</p>
                        <span class="ec2Content" v-if="!showPwd">
                            <v-icon class="text--grey">mdi-eye-off-outline</v-icon>
                            ******
                        </span>
                        <span class="ec2Content" v-else @click="copyClipboard">
                            <v-icon class="text--grey">mdi-eye-outline</v-icon>
                            qwerty1234
                        </span>
                        <v-btn color="background" rounded small @click="showPwd = !showPwd">
                            {{ showPwd ? $t('hide') : $t('show') }}
                        </v-btn>
                    </v-col>
                </v-row>
                <p class="subtitle-2 text-white mt-3 mb-1">{{ $t('sandbox.containerImage') }}</p>
                <span class="ec2Content" style="margin-right: 12px">/node:16.14.0</span>
            </v-card-text>
        </v-card>
        <v-card variant="outlined" elevation="0" class="sandbox-card">
            <v-card-title class="text-subtitle-1 text-primary">{{ $t('sandbox.sourceFolder') }}</v-card-title>
            <v-card-text>
                <!-- <v-treeview class="sourceFolder" v-model="selectedTree" :open="initiallyOpen" :items="treeItems"
                    activatable item-key="name" open-on-click>
                    <template v-slot:prepend="{ item, open }">
                        <v-icon dense v-if="!item.file">{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
                        <v-icon dense v-else>{{ files[item.file] }}</v-icon>
                    </template>
                </v-treeview> -->
            </v-card-text>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAppStatusStore } from '@/store/appStatusStore';
import infraService from "@/api/infraService";


const appStatusStore = useAppStatusStore();

const { t } = useI18n();

// Router
const router = useRouter();

// State variables
const initiallyOpen = ref(['src']);
const showPwd = ref(false);
const selectedTree = ref<any[]>([]);
const selectedStatusItem = ref({
    name: 'Running',
    icon: 'mdi-play',
    color: 'orange'
});

// Files and tree items data
const files = {
    html: 'mdi-language-html5',
    js: 'mdi-nodejs',
    ts: 'mdi-language-typescript',
    json: 'mdi-code-json',
    md: 'mdi-language-markdown'
};
const treeItems = [
    {
        name: 'Dockerfile',
    },
    {
        name: 'node_modules',
    },
    {
        name: 'dist',
        children: [
            {
                name: 'Pty.js',
                file: 'js',
            },
            {
                name: 'Socket.js',
                file: 'js',
            },
            {
                name: 'Pty.js',
                file: 'js',
            },
        ],
    },
    {
        name: 'src',
        children: [
            {
                name: 'Pty.ts',
                file: 'ts',
            },
            {
                name: 'Socket.ts',
                file: 'ts',
            },
            {
                name: 'Pty.ts',
                file: 'ts',
            },
        ],
    },
    {
        name: 'package-lock.json',
        file: 'json',
    },
    {
        name: 'tsconfig.json',
        file: 'json',
    },
    {
        name: 'package.json',
        file: 'json',
    }
];

// Status items data
const statusItems: any = [
    {
        name: 'Running',
        icon: 'mdi-play',
        color: 'orange'
    },
    {
        name: 'Stop',
        icon: 'mdi-stop',
        color: '#FF0000',
    },
    {
        name: 'Start',
        icon: 'mdi-play',
        color: '#2391FF',
    },
    {
        name: 'Waiting',
        icon: 'mdi-circle-outline',
        color: '#FF9500',
    },
    {
        name: 'Stopping',
        icon: 'mdi-circle-outline',
        color: '#FF0000',
    },
    {
        name: 'Unknown',
        icon: 'mdi-circle-outline',
        color: '#868E96',
    }
];

// Computed properties
const sandboxMessage = computed(() => ({
    howToUseDesc: t('sandbox.howToUseDesc'),
    rulesDesc: t('sandbox.rulesDesc')
}));

// Methods
const copyClipboard = () => {
    const text = 'qwerty1234';
    const t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = text;
    t.select();
    t.focus();
    document.execCommand('copy');
    document.body.removeChild(t);
    // appStatusStore.addToastMessage({
    //     type: 'success',
    //     message: `${t('copied')}`,
    //     buttonMsg: null,
    //     timeout: null,
    //     buttonCallback: null
    // });
};

const onChangeStatus = (e: any) => {
    console.log("e는 ", e);
    if (e === 'Start') {
        infraService.getSandboxAccessPoint().then((res: any) => {
            console.log(res);
        });
    } else if (e === 'Stop') {
        console.log("스탑");
    }
};

const accessEndpoint = () => {
    router.push({
        name: 'SandboxTerminalPage',
    }).catch(err => err);
};
</script>

<style lang="scss" scoped>
.sandbox-wrapper {
    margin-top: 100px;

    .sandbox-card {
        color: darkgray;
        margin-top: 10px;
        background: transparent;

        .sourceFolder {
            font-size: 9pt !important;
        }

        .ec2Content {
            margin-left: 10px;
            margin-right: 12px;
            color: rgb(134, 134, 134) !important;
        }
    }
}
</style>
