import { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { changePasswordSchema } from 'src/schemas/auth-schema';

// ----------------------------------------------------------------------

type ChangePasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePasswordView() {
  const router = useRouter();

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleTogglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const onSubmit = useCallback((data: ChangePasswordFormData) => {
    // Handle form submission here
    console.log('Password change data:', data);
    
    // You can add a success notification here
    alert('Password changed successfully!');
    router.push('/dashboard');
  }, [router]);

  return (
    <DashboardContent>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 3 }}>
        <Button
          variant="text"
          size="large"
          onClick={() => router.push('/dashboard')}
          startIcon={<Iconify icon="solar:alt-arrow-left-outline" width={20} />}
          sx={{
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          Back
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Card sx={{ flex: 1, p: 3, maxWidth: 600 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Change Password
          </Typography>

          <Box 
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Please enter your current password and choose a new password to update your account security.
            </Typography>

            {/* Current Password */}
            <Controller
              name="currentPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Current Password"
                  type={showPasswords.current ? 'text' : 'password'}
                  error={!!errors.currentPassword}
                  helperText={errors.currentPassword?.message}
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={() => handleTogglePasswordVisibility('current')}
                        sx={{ minWidth: 'auto', p: 1 }}
                      >
                        <Iconify 
                          icon={showPasswords.current ? 'solar:eye-closed-bold' : 'solar:eye-bold'} 
                          width={20} 
                        />
                      </Button>
                    ),
                  }}
                />
              )}
            />

            {/* New Password */}
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="New Password"
                  type={showPasswords.new ? 'text' : 'password'}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={() => handleTogglePasswordVisibility('new')}
                        sx={{ minWidth: 'auto', p: 1 }}
                      >
                        <Iconify 
                          icon={showPasswords.new ? 'solar:eye-closed-bold' : 'solar:eye-bold'} 
                          width={20} 
                        />
                      </Button>
                    ),
                  }}
                />
              )}
            />

            {/* Confirm Password */}
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Confirm New Password"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={() => handleTogglePasswordVisibility('confirm')}
                        sx={{ minWidth: 'auto', p: 1 }}
                      >
                        <Iconify 
                          icon={showPasswords.confirm ? 'solar:eye-closed-bold' : 'solar:eye-bold'} 
                          width={20} 
                        />
                      </Button>
                    ),
                  }}
                />
              )}
            />

            {/* Save Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="contained"
                size="large"
                type="submit"
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>
    </DashboardContent>
  );
}
