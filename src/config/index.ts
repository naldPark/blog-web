import ConfigDefault from './Config.default';
import ConfigLocal from './Config.local';
import ConfigProd from './Config.prod';

// 기본 구성 파일을 임포트합니다.
let Config = ConfigDefault;

// 현재 환경에 따라 구성 파일을 병합합니다.
switch (process.env.VUE_APP_MODE) {
  case 'local':
    Config = {
      ...Config,
      ...ConfigLocal,
    };
    break;
  case 'prod':
    Config = {
      ...Config,
      ...ConfigProd,
    };
    break;
}
// 프로필 설정을 현재 환경에 맞게 지정합니다.
// process.env.VUE_APP_MODE가 undefined일 경우 기본 값을 설정합니다.
Config.PROFILE = process.env.VUE_APP_MODE || 'default';

// 구성 객체를 내보냅니다.
export default Config;