import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { Iconify } from './iconify';

// ----------------------------------------------------------------------

type DocumentUploadCardCompactProps = {
  title: string;
  document: File | null;
  onUpload: (file: File) => void;
  onPreview?: (file: File) => void;
  accept?: string;
  color?: 'primary' | 'info' | 'warning' | 'error' | 'success';
  icon?: string;
};

export function DocumentUploadCardCompact({
  title,
  document,
  onUpload,
  onPreview,
  accept = 'image/*,.pdf',
  color = 'primary',
  icon = 'solar:document-add-bold',
}: DocumentUploadCardCompactProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault();
    if (document && onPreview) {
      onPreview(document);
    }
  };

  const getColorValue = () => {
    const colorMap = {
      primary: 'primary.main',
      info: 'info.main',
      warning: 'warning.main',
      error: 'error.main',
      success: 'success.main',
    };
    return colorMap[color];
  };

  return (
    <Card
      sx={{
        border: '2px dashed',
        borderColor: document ? 'success.main' : 'divider',
        bgcolor: 'background.paper',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: document ? 'success.dark' : getColorValue(),
          bgcolor: 'action.hover',
        },
      }}
    >
      <Box
        component="label"
        sx={{
          p: 2,
          cursor: 'pointer',
          display: 'block',
        }}
      >
        <input
          type="file"
          hidden
          accept={accept}
          onChange={handleFileChange}
        />
        
        {!document ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: getColorValue(),
              }}
            >
              <Iconify
                icon={icon}
                width={20}
              />
            </Avatar>
            <Typography variant="body2" fontWeight={600} sx={{ flex: 1 }}>
              {title}
            </Typography>
            <Iconify
              icon="solar:upload-linear"
              width={24}
              sx={{ color: 'text.secondary' }}
            />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: 'success.main',
                }}
              >
                <Iconify
                  icon="solar:check-circle-bold"
                  width={20}
                />
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body2" fontWeight={600} noWrap>
                  {title}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {document.name}
                </Typography>
              </Box>
            </Box>
            {onPreview && (
              <Button
                variant="text"
                size="small"
                onClick={handlePreview}
                startIcon={<Iconify icon="solar:eye-bold" width={16} />}
                sx={{ 
                  minWidth: 'auto',
                  px: 1,
                  '&:hover': {
                    bgcolor: 'transparent',
                  }
                }}
              >
                Preview
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Card>
  );
}

