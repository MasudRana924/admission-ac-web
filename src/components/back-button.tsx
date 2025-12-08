import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';

type BackButtonProps = {
  label?: string;
  onClick?: () => void;
  sx?: SxProps<Theme>;
};

export function BackButton({ label = 'Back', onClick, sx }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    router.back();
  };

  return (
    <Button
      variant="text"
      size="large"
      onClick={handleClick}
      startIcon={<Iconify icon="solar:alt-arrow-left-outline" width={20} />}
      sx={{
        color: 'text.primary',
        backgroundColor: 'grey.100',
        '&:hover': {
          backgroundColor: 'grey.200',
        },
        ...sx,
      }}
    >
      {label}
    </Button>
  );
}
