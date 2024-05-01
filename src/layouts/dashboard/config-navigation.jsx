import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

export const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  }
];

export const contactConfig = [
  {
    title: 'account',
    path: 'https://google.com',
    icon: icon('ic_account'),
  },
  {
    title: 'payments',
    path: 'https://google.com',
    icon: icon('ic_payments'),
  },
  {
    title: 'contact',
    path: 'https://google.com',
    icon: icon('ic_contact'),
  },
]