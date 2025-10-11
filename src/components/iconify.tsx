import type { BoxProps } from '@mui/material/Box';

import { forwardRef } from 'react';
import { Icon, type IconProps } from '@iconify/react';

import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

export interface IconifyProps extends BoxProps {
  icon: IconProps['icon'];
  width?: number;
  height?: number;
}

export const Iconify = forwardRef<SVGElement, IconifyProps>(
  ({ icon, width = 20, height, sx, ...other }, ref) => (
    <Box
      ref={ref}
      component={Icon}
      icon={icon}
      sx={{
        width,
        height: height || width,
        ...sx,
      }}
      {...other}
    />
  )
);



