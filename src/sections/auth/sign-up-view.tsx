import { useState, useCallback } from 'react';

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

import logoImage from 'src/assets/logo.png';
import splashImage from 'src/assets/splash.png';

// ----------------------------------------------------------------------

export function SignUpView() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    if (password.length < 6) {
      return;
    }

    const success = await register(email, password);
    if (success) {
      // Small delay to ensure loading state is cleared before navigation
      setTimeout(() => {
        router.push('/verify-otp');
      }, 100);
    }
  }, [email, password, register, router]);

  const handleSignInClick = useCallback(() => {
    router.push('/');
  }, [router]);

  const renderForm = (
    <Box
      component="form"
      onSubmit={handleSignUp}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <ErrorAlert 
        error={error} 
        onClose={clearError} 
      />

      <TextField
        fullWidth
        name="email"
        label="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isLoading}
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      <TextField
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
        {isLoading ? 'Creating Account...' : 'Create Account'}
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
            <Typography variant="h5">Sign up to BideshStudy</Typography>
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
              Already have an account?
              <Link variant="subtitle2" sx={{ ml: 0.5, cursor: 'pointer' }} onClick={handleSignInClick}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
