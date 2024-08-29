import JSEncrypt from 'jsencrypt';

/**
 *
 * @param path /src/assets/svgs
 * @param name argocd.svg
 * @returns
 */
export const getImageUrl = (path: string, name?: string) => {
  return new URL(`${path}${name ? `/${name}` : ''}`, import.meta.url).href;
};

/**  토큰 디코딩 */
export const decodeToken = (payload: string): string => {
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
};

/** 데이터 URI를 Blob 객체로 변환*/
export const dataURItoBlob = (dataURI: string): string => {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ab], { type: mimeString });

  return URL.createObjectURL(blob);
};

export const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export const encryptPassword = (rsaRes: string, password: string) => {
  const rsa = new JSEncrypt({ default_key_size: '2048' });
  rsa.setPublicKey(rsaRes);
  const chunkSize = 117;
  const chunks = [];
  for (let i = 0; i < password.length; i += chunkSize) {
    const chunk = password.slice(i, i + chunkSize);
    const encryptedChunk = rsa.encrypt(chunk);
    chunks.push(encryptedChunk);
  }
  const encryptedValue = chunks.join(':');
  return encryptedValue;
};
