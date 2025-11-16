import { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';


import { useRouter } from 'src/routes/hooks';

import { useAuth } from 'src/contexts/AuthContext';

import { ErrorAlert } from 'src/components/error-alert';
import { LucideIcon } from 'src/components/lucide-icons';
import { signInSchema } from 'src/schemas/auth-schema';

import logoImage from 'src/assets/logo.png';
import splashImage from 'src/assets/splash.png';

// ----------------------------------------------------------------------

type SignInFormData = {
  email: string;
  password: string;
};

export function SignInView() {
  const router = useRouter();
  const { login, isLoading, error, isAuthenticated, clearError } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Redirect if already authenticated and not loading
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  const onSubmit = useCallback(async (data: SignInFormData) => {
    await login(data.email, data.password);
  }, [login]);

  const handleSignUpClick = useCallback(() => {
    router.push('/sign-up');
  }, [router]);

  const handleForgotPasswordClick = useCallback(() => {
    router.push('/forgot-password');
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
      <ErrorAlert error={error} onClose={clearError} />

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

      <Link 
        variant="body2" 
        color="inherit" 
        sx={{ 
          mb: 1.5, 
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.6 : 1,
          pointerEvents: isLoading ? 'none' : 'auto'
        }}
        onClick={handleForgotPasswordClick}
      >
        Forgot password?
      </Link>

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            error={!!errors.password}
            helperText={errors.password?.message}
            required
            disabled={isLoading}
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" disabled={isLoading}>
                      <LucideIcon icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{ mb: 3 }}
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
        {isLoading ? 'Signing in...' : 'Sign in'}
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
              justifyContent: 'flex-start',
            }}
          >
            <Typography variant="h5">Sign in to BideshStudy</Typography>
          </Box>
          {renderForm}
          <Box
            sx={{
              mt: 3,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
              }}
            >
              Don&apos;t have an account?
              <Link 
                variant="subtitle2" 
                sx={{ 
                  ml: 0.5, 
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.6 : 1,
                  pointerEvents: isLoading ? 'none' : 'auto'
                }} 
                onClick={handleSignUpClick}
              >
                Get started
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
