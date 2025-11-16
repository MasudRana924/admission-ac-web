import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { Iconify } from './iconify';

// ----------------------------------------------------------------------

type DocumentUploadCardProps = {
  title: string;
  document: File | null;
  onUpload: (file: File) => void;
  onPreview?: (file: File) => void;
  accept?: string;
  color?: 'primary' | 'info' | 'warning' | 'error' | 'success';
  icon?: string;
};

export function DocumentUploadCard({
  title,
  document,
  onUpload,
  onPreview,
  accept = 'image/*,.pdf',
  color = 'primary',
  icon = 'solar:document-add-bold',
}: DocumentUploadCardProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
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
          p: 3,
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
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: document ? 2 : 3 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: document ? 'success.main' : getColorValue(),
            }}
          >
            <Iconify
              icon={document ? 'solar:check-circle-bold' : icon}
              width={28}
            />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {document ? document.name : 'Click to upload or drag and drop'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              PDF, JPG, PNG (Max 5MB)
            </Typography>
          </Box>
          <Iconify
            icon="solar:upload-linear"
            width={32}
            sx={{ color: document ? 'success.main' : 'text.secondary' }}
          />
        </Box>

        {document && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
              {document.name}
            </Typography>
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

