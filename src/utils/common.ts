import { useDisplay } from 'vuetify/lib/framework.mjs';
import { ref } from 'vue';


// 이 함수는 현재 디바이스가 모바일인지 여부를 결정합니다.
export function isMobile(): boolean {
    const { smAndDown } = ref(useDisplay()).value;
    console.log('smAndDown', smAndDown)
    return smAndDown;
}

// 이 함수는 현재 디바이스의 크기 이름을 반환합니다.
// export function getSize(): string {
//     const vuetify = useVuetify();
//     return vuetify.framework.breakpoint.name;
// }

// 이 함수는 토큰을 디코딩합니다.
export function decodeToken(payload: string): any {
    let output: string = payload.split('.')[1];
    output = output.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            break;
    }
    return decodeURIComponent(escape(window.atob(output)));
}

// 이 함수는 데이터 URI를 Blob 객체로 변환합니다.
export function dataURItoBlob(dataURI: string): string {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });

    return URL.createObjectURL(blob);
}
