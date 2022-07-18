export default [
  {
    path: '/user',
    layout: false,
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user',
        redirect: '/User/Login',
      },
      {
        path: '/user/login',
        name: 'login',
        component: './user/Login',
      },
      {
        path: '/user/register',
        name: 'register',
        component: './user/Register',
      },
      {
        path: '/user/verify-email',
        name: 'verifyMail',
        component: './user/VerifyMail',
      },
      {
        path: '/user/forgot-password',
        name: 'forgotpassword',
        component: './user/ForgotPassword',
      },

      {
        component: '404',
      },
    ],
  },
  {
    path: '/confirm-account',
    layout: false,
    iconName: 'sidebar_all',
    component: './user/ConfirmAccount',
    hideInMenu: true,
    name: 'verifyMail',
  },
  {
    path: '/confirm-forget-pass',
    layout: false,
    iconName: 'sidebar_all',
    component: './user/ResetPassword',
    hideInMenu: true,
    name: 'resetPassword',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    iconName: 'home',
    component: './Home',
    access: 'normalUser',
  },

  // {
  //   path: '/dashboard',
  //   name: 'dashboard',
  //   iconName: 'addressCard',
  //   component: './Dashboard',
  //   access: 'User',
  // },
  // {
  //   path: '/list-games',
  //   name: 'liveGame',
  //   iconName: 'game',
  //   access: 'User',
  //   component: './LiveGame',
  // },
  // {
  //   path: '/live-game',
  //   name: 'playGame',
  //   iconName: 'game',
  //   hideInMenu: true,
  //   access: 'User',
  //   component: './LiveGame/PlayGame',
  // },
  // {
  //   path: '/history',
  //   name: 'history',
  //   iconName: 'faMoneyBill',
  //   access: 'normalUser',
  //   component: './Deposit',
  //   // routes: [
  //   //   {
  //   //     path: '/history',
  //   //     redirect: '/history/deposit',
  //   //   },
  //   //   {
  //   //     path: '/history/deposit',
  //   //     name: 'deposit',
  //   //     component: './Deposit',
  //   //     iconName: 'faMoneyBill',
  //   //     access: 'normalUser',
  //   //   },
  //   //   {
  //   //     path: '/history/withdraw',
  //   //     name: 'withdraw',
  //   //     component: './Withdraw',
  //   //     iconName: 'faSortAmountDownAlt',
  //   //     access: 'normalUser',
  //   //   },
  //   //   {
  //   //     path: '/history/commission',
  //   //     name: 'commission',
  //   //     component: './Commission',
  //   //     iconName: 'history',
  //   //     access: 'normalUser',
  //   //   },
  //   // ],
  // },
  // {
  //   path: '/affiliates',
  //   name: 'affiliates',
  //   iconName: 'bezierCurve',
  //   component: './Affiliates',
  // },
  {
    path: '/policy',
    name: 'policy',
    iconName: 'donate',
    component: './Policy',
  },
  {
    path: '/accountant',
    name: 'accountant',
    iconName: 'history',
    component: './Accountant',
    access: 'normalUser',
  },
  // {
  //   path: '/profile',
  //   name: 'profile',
  //   iconName: 'donate',
  //   component: './Profile',
  //   access: 'User',
  //   hideInMenu: true,
  // },
  {
    component: './404',
  },
];
