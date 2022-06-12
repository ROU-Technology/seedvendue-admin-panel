import * as RoutePath from './routes-path';

export const navigation = [
  {
    name: 'Main',
    navigation: [
      {
        name: 'Dashboard',
        url: `/${RoutePath.Home}`,
      },
      {
        name: 'Users',
        url: `/${RoutePath.users}`,
      },
      {
        name: 'Category',
        url: `/${RoutePath.category}`,
      },
      {
        name: 'Sub Category',
        url: `/${RoutePath.subCategory}`,
      },
    ],
  },
  {
    name: 'Payment',
    navigation: [
      {
        name: 'Payment',
        url: `/${RoutePath.payment}`,
      },
      {
        name: 'Payment History',
        url: `/${RoutePath.paymentHistory}`,
      },
      {
        name: 'Withdraw Request',
        url: `/${RoutePath.withdraw}`,
      },
    ],
  },
];
