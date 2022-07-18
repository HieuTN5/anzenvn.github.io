import { defineConfig } from 'umi';

const { AZURE_ENV, AUTH_API, APP_API, QR_CODE_DEPOSITE, QR_CODE_2FA, ETHRATING_API } = process.env;

let global_environment = {
  AZURE_ENV: AZURE_ENV || 'dev',
  AUTH_API: AUTH_API || 'https://anzen-tms.azurewebsites.net',
  APP_API: APP_API || 'https://evo-portal-api-dev.azurewebsites.net/ap',
  QR_CODE_DEPOSITE: QR_CODE_DEPOSITE || '0x3bb95d7df183696ae04977796ff95045030be4a4',
  QR_CODE_2FA: QR_CODE_2FA || 'iidw bdlf vwn4 awkb 2mt6 2ugi tt24 5ubl',
  ETHRATING_API: ETHRATING_API || 'https://libra-crawler-api.azurewebsites.net/hub/eth',
};

export default defineConfig({
  define: global_environment,
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
});
