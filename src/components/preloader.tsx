import { useEffect } from 'react';

import Box from '@mui/material/Box';

import logoImage from 'src/assets/logo.png';

// ----------------------------------------------------------------------

type PreloaderProps = {
  isLoading?: boolean;
  onComplete?: () => void;
};

export function Preloader({ isLoading = true, onComplete }: PreloaderProps) {
  useEffect(() => {
    if (isLoading && onComplete) {
      // Simple timeout for preloader
      const timer = setTimeout(() => {
        onComplete();
      }, 2000); // 2 seconds

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isLoading, onComplete]);

  if (!isLoading) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <Box
        component="img"
        src={logoImage}
        alt="BideshStudy"
        sx={{
          width: 120,
          height: 'auto',
          objectFit: 'contain',
          animation: 'logoPulse 2s ease-in-out infinite',
          '@keyframes logoPulse': {
            '0%, 100%': {
              opacity: 1,
              transform: 'scale(1)',
            },
            '50%': {
              opacity: 0.8,
              transform: 'scale(1.05)',
            },
          },
        }}
      />
    </Box>
  );
}
