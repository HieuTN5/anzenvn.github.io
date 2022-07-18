module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
    AZURE_ENV: true,
    AUTH_API: true,
    APP_API: true,
    QR_CODE_DEPOSITE: true,
    QR_CODE_2FA: true,
    ETHRATING_API: true,
    // PING_IP_SERVICE: true,
  },
  rules: {
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state', // for immer
          'acc', // for reduce accumulators
          'options', // for request
        ],
      },
    ],
  },
};
