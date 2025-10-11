import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { ErrorAlert } from 'src/components/error-alert';

// ----------------------------------------------------------------------

export function ForgotPasswordView() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!email) {
      setFormError('Email is required');
      return;
    }

    // Here you would typically make an API call
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // You could show a success message or redirect
      console.log('Password reset email sent to:', email);
    }, 1000);
  }, [email]);

  const handleSignInClick = useCallback(() => {
    router.push('/');
  }, [router]);

  const renderForm = (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
    <>
      <Box
        onClick={handleSignInClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          cursor: 'pointer',
          color: 'text.primary',
          mb: 4,
          '&:hover': {
            opacity: 0.8,
          },
        }}
      >
        <Iconify icon="solar:alt-arrow-left-outline" width={20} />
        <Typography
          variant="subtitle2"
          sx={{
            color: 'text.primary',
            fontWeight: 600,
          }}
        >
          Back to Sign in
        </Typography>
      </Box>

      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Forgot Password</Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
          }}
        >
          Enter your email address and we&apos;ll send you a link to reset your password.
        </Typography>
      </Box>
      {renderForm}
    </>
  );
}

