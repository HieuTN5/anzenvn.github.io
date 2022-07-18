import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
const { REACT_APP_ENV } = process.env;

const {
  AZURE_ENV,
  AUTH_API,
  APP_API,
  QR_CODE_DEPOSITE,
  QR_CODE_2FA,
  ETHRATING_API,
  // PING_IP_SERVICE
} = process.env;

let global_environment = {
  AZURE_ENV: AZURE_ENV || 'dev',
  AUTH_API: AUTH_API || 'https://anzen-tms.azurewebsites.net',
  APP_API: APP_API || 'https://evo-portal-api-dev.azurewebsites.net/ap',
  QR_CODE_DEPOSITE: QR_CODE_DEPOSITE || '0x3bb95d7df183696ae04977796ff95045030be4a4',
  QR_CODE_2FA: QR_CODE_2FA || 'iidw bdlf vwn4 awkb 2mt6 2ugi tt24 5ubl',
  ETHRATING_API: ETHRATING_API || 'https://libra-crawler-api.azurewebsites.net/hub/eth',
  // PING_IP_SERVICE: PING_IP_SERVICE || 'https://libra-ipify-api.azurewebsites.net/getip'
};


export default defineConfig({
  define: global_environment,
  hash: true,
  antd: {},
  dva: {
    immer: true,
    hmr: true,
  },
  layout: {
    // https://umijs.org/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },

  locale: {
    default: 'en-US',
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },

  routes,

  theme: {
    'primary-color': defaultSettings.primaryColor,
  },

  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // history: {
  //   type: 'hash'
  // },
  // nodeModulesTransform: {
  //   type: 'none',
  // },
  // mfsu: {},
  // webpack5: {},
  exportStatic: {},
  outputPath: "build",
  base: "/",
});
