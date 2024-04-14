<template>
    <div class="mt-3">
        <v-row justify="center" no-gutters>
            <v-col cols="10" md="4" lg="4">
                <v-card color="rgba(0, 0, 0, 0)" elevation="0" max-width="400" style="display: block; margin: 0px auto;">
                    <v-card-text class="text-center">
                        <h1 class="font-weight-bold mb-1 grey--text">
                            Nald Park
                        </h1>
                        <h4 class="font-weight-light mb-3 grey--text">
                            WEB DEVELOPER
                        </h4>
                        <v-img max-height="400" style="display: block; margin: 0px auto;"
                            src="@/assets/images/profiles/me.jpg">
                            <div class="innerBorder"></div>
                        </v-img>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn v-for="(social, i) in socials" :key="i" :color="social.color" icon small>
                                <v-icon @click="exploreSNS(social.link)">{{ social.icon }}</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="10" md="6">
                <div class="text-md-left pa-7 contact-box">
                    <h1 class="font-weight-bold">
                        Contact <span class="primary--text">Me.</span>
                    </h1>
                    <p class="font-weight-light grey--text">
                        {{ $t('contactMsg') }}
                    </p>
                    <br />
                    <v-theme-provider dark>
                        <v-row class="pa-2">
                            <v-col cols="12">
                                <v-text-field flat v-model="messageData.name" :rules="[rules.required]"
                                    :label="`${$t('name')} *`" :placeholder="`${$t('name')} *`"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field flat v-model="messageData.email" :rules="[rules.required, rules.email]"
                                    :label="`${$t('email')} *`" :placeholder="`${$t('email')} *`"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="messageData.title" :rules="[rules.required]"
                                    :label="`${$t('title')} *`" :placeholder="`${$t('title')} *`"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea :class="{ contentArea: !isMobile }" v-model="messageData.content"
                                    :rules="[rules.required]" auto-grow flat solo :label="`${$t('content')} *`"
                                    :placeholder="`${$t('content')} *`"></v-textarea>
                            </v-col>
                            <v-col class="mx-auto" cols="auto">
                                <v-btn color="primary" outlined rounded variant="outlined" @click="sendMessage">
                                    <v-icon>mdi-check</v-icon>
                                    {{ $t('send') }}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-theme-provider>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue';
import { useAppStatusStore } from '@/store/appStatusStore';
import { useLanguageStatusStore } from '@/store/languageStatusStore';
import { contact } from '@/api/CommonService';
import router from '@/router';
import { useI18n } from 'vue-i18n';

export default defineComponent({
    name: 'ContactPage',
    props: {
        isMobile: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const appStatusStore = useAppStatusStore();
        const { t } = useI18n();
        const messageData: any = reactive({
            name: '',
            email: '',
            title: '',
            content: '',
        });

        const rules = {
            required: (value: any) => !!value || 'Required.',
            email: (value: any) => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(value) || 'Invalid e-mail.';
            },
        };

        const validateCheck = () => {
            let res = '';
            for (const key in messageData) {
                if (key === 'email') {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    res = pattern.test(messageData[key]) === false ? `${t('emailValidate')}` : res;
                }
                res = messageData[key] === '' ? `${t('inputEmpty')}` : res;
            }
            return res;
        };

        const socials = [
            {
                icon: 'mdi-linkedin',
                color: '#0A66C2',
                link: 'https://www.linkedin.com/in/naldpark/',
            },
            {
                icon: 'mdi-instagram',
                color: '#FF5A51',
                link: 'https://www.instagram.com/youngik_nald/',
            },
            {
                icon: 'mdi-facebook',
                color: 'indigo',
                link: 'https://www.facebook.com/nald873',
            },
        ];

        const exploreSNS = (url: string) => {
            window.open(url);
        };

        const sendMessage = async () => {
            appStatusStore.showLoading();
            const validate = validateCheck();
            if (validate === '') {
                try {
                    const res = await contact(messageData);
                    let type = '';
                    let message = '';

                    if (res.data.statusCode === 200) {
                        Object.keys(messageData).forEach((key) => {
                            messageData[key] = '';
                        });
                        type = 'success';
                        message = `${t('complete')}`;
                    } else {
                        type = 'error';
                        message = `${t('unknownError')}`;
                    }
                    appStatusStore.hideLoading();
                    appStatusStore.showDialog({
                        title: type,
                        description: message,
                        invisibleClose: true,
                        action: () => {
                           router.push({ name: 'MainPage' }).catch((err: any) => err);
                        },
                    });
                } catch (error) {
                    appStatusStore.hideLoading();
                    appStatusStore.addToastMessage({
                        type: 'error',
                        message: `${t('unknownError')}`,
                        buttonMsg: null,
                        timeout: null,
                        buttonCallback: null,
                    });
                }
            } else {
                appStatusStore.hideLoading();
                appStatusStore.addToastMessage({
                    type: 'error',
                    message: validate as string,
                    buttonMsg: null,
                    timeout: null,
                    buttonCallback: null,
                });
            }
        };

        return {
            messageData,
            rules,
            validateCheck,
            socials,
            exploreSNS,
            sendMessage,
            t,
        };
    },
});
</script>

<style lang="scss" scoped>
.innerBorder {
    width: 90%;
    height: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1.5px solid #fff8e8;
}

.contact-box {
    background-color: rgba(20, 20, 20, 0.6);
    justify-content: left;
    display: block;
    width: 100%;
    border-radius: 30px;
    font-weight: 200;
    color: #d5d5d5;
    background-image: linear-gradient(rgba(10, 10, 10, 0.99),
            rgba(30, 30, 30, 0.2)),
        url('../../assets/images/contactBackground.png');

    .contentArea {
        &.v-input {
            .v-input__control {
                min-height: 200px;
            }
        }
    }
}
</style>
