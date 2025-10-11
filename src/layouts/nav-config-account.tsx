import { Iconify } from 'src/components/iconify';

import type { AccountPopoverProps } from './components/account-popover';

// ----------------------------------------------------------------------

export const _account: AccountPopoverProps['data'] = [
  {
    label: 'Profile',
    href: '/profile',
    icon: <Iconify width={22} icon="solar:user-bold-duotone" />,
  },
  {
    label: 'Change Password',
    href: '/change-password',
    icon: <Iconify width={22} icon="solar:lock-password-bold-duotone" />,
  },
];
