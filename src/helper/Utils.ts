export default {
  decodeToken(payload: string): any {
    let output: string = payload.split('.')[1];
    output = output.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: {
        break;
      }
      case 2: {
        output += '==';
        break;
      }
      case 3: {
        output += '=';
        break;
      }
      default: {
        break;
      }
    }
    return this._decodeURIComponent(escape(window.atob(output)));
  },
  _decodeURIComponent(value: any) {
    try {
      return decodeURIComponent(value);
    } catch (error) {
      return value;
    }
  },
  dataURItoBlob(dataURI: any) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });

    return URL.createObjectURL(blob);
  },
};
