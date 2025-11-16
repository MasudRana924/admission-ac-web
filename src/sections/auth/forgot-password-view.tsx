import { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { ErrorAlert } from 'src/components/error-alert';
import { forgotPasswordSchema } from 'src/schemas/auth-schema';

import logoImage from 'src/assets/logo.png';
import splashImage from 'src/assets/splash.png';

// ----------------------------------------------------------------------

type ForgotPasswordFormData = {
  email: string;
};

export function ForgotPasswordView() {
  const router = useRouter();

  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    setFormError('');
    
    // Here you would typically make an API call
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // You could show a success message or redirect
      console.log('Password reset email sent to:', data.email);
    }, 1000);
  }, []);

  const handleSignInClick = useCallback(() => {
    router.push('/');
  }, [router]);

  const renderForm = (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <ErrorAlert 
        error={formError} 
        onClose={() => setFormError('')} 
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Email address"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            required
            disabled={isLoading}
            sx={{ mb: 3 }}
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
        )}
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{
          bgcolor: isLoading ? 'grey.400' : 'primary.main',
          color: isLoading ? 'grey.600' : 'primary.contrastText',
          '&:hover': {
            bgcolor: isLoading ? 'grey.400' : 'primary.dark',
          },
          '&:disabled': {
            bgcolor: 'grey.400',
            color: 'grey.600',
          },
        }}
      >
        {isLoading ? 'Sending...' : 'Send Reset Link'}
      </Button>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
      }}
    >
      {/* Left Side - Image */}
      <Box
        sx={{
          width: '50%',
          height: '100%',
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Box
          component="img"
          src={splashImage}
          alt="Splash"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* Right Side - Form */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '420px',
          }}
        >
          <Box
            onClick={handleSignInClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              color: 'text.primary',
              mb: 4,
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            <Iconify icon="solar:alt-arrow-left-outline" width={20} />
          </Box>

          <Box
            sx={{
              gap: 1.5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Box
              component="img"
              src={logoImage}
              alt="BideshStudy"
              sx={{
                width: 150,
                height: 'auto',
                objectFit: 'contain',
                mb: 2,
              }}
            />
          </Box>
          <Box
            sx={{
              mb: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Typography variant="h5" sx={{ mb: 1 }}>Forgot Password</Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                textAlign: 'left',
              }}
            >
              Enter your email address and we&apos;ll send you a link to reset your password.
            </Typography>
          </Box>
          {renderForm}
        </Box>
      </Box>
    </Box>
  );
}

