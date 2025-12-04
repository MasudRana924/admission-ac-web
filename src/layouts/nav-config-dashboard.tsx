import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <Iconify icon="solar:chart-bold-duotone" width={24} />,
  },
  {
    title: 'Resume Builder',
    path: '/resume-builder',
    icon: <Iconify icon="solar:document-text-bold-duotone" width={24} />,
  },
];
