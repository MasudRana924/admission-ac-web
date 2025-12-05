import { useRef, useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { useRouter } from 'src/routes/hooks';

import { useAuth } from 'src/contexts/AuthContext';

import { Iconify } from 'src/components/iconify';
import { ErrorAlert } from 'src/components/error-alert';
import { otpVerificationSchema } from 'src/schemas/auth-schema';

import logoImage from 'src/assets/logo.png';
import splashImage from 'src/assets/splash.png';

// ----------------------------------------------------------------------

type OtpFormData = {
  otp: string;
};

export function VerifyOtpView() {
  const router = useRouter();
  const { verifyOtp, isLoading, error, clearError, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: yupResolver(otpVerificationSchema),
    defaultValues: {
      otp: '',
    },
  });

  const otp = watch('otp');

  // Load email from localStorage on component mount
  useEffect(() => {
    const pendingEmail = localStorage.getItem('pendingEmail');
    if (pendingEmail) {
      setEmail(pendingEmail);
    }
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  // Sync otp string with otpValues array
  useEffect(() => {
    const otpString = otpValues.join('');
    if (otpString !== otp) {
      setValue('otp', otpString, { shouldValidate: false });
    }
  }, [otpValues, otp, setValue]);

  const handleOtpChange = useCallback((index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otpValues];
      newOtp[index] = value;
      setOtpValues(newOtp);

      // Move to next input if value is entered
      if (value && index < 3) {
        const nextInput = inputRefs.current[index + 1]?.querySelector('input');
        nextInput?.focus();
      }
    }
  }, [otpValues]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLDivElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = inputRefs.current[index - 1]?.querySelector('input');
      prevInput?.focus();
    }
  }, [otpValues]);

  const onSubmit = useCallback(async (data: OtpFormData) => {
    if (email) {
      await verifyOtp(email, data.otp);
    }
  }, [email, verifyOtp]);

  const handleResendOtp = useCallback(() => {
    // Here you would typically make an API call to resend OTP
    console.log('Resend OTP clicked');
  }, []);

  const handleSignInClick = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleBackClick = useCallback(() => {
    router.back();
  }, [router]);

  // Focus first input on mount
  useEffect(() => {
    const firstInput = inputRefs.current[0]?.querySelector('input');
    firstInput?.focus();
  }, []);

  const renderOtpInputs = (
    <Controller
      name="otp"
      control={control}
      render={() => (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            mb: 3,
            width: '100%',
          }}
        >
          {otpValues.map((digit, index) => (
            <TextField
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              error={!!errors.otp && otpValues.join('').length === 4}
              inputProps={{
                maxLength: 1,
                style: { textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' },
              }}
              sx={{
                width: 60,
                '& .MuiInputBase-root': {
                  height: 60,
                },
              }}
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
          ))}
        </Box>
      )}
    />
  );

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

      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          mb: 3,
          textAlign: 'left',
          width: '100%',
        }}
      >
        We&apos;ve sent a verification code to <strong>{email}</strong>
      </Typography>

      {renderOtpInputs}

      {errors.otp && (
        <Typography variant="caption" color="error" sx={{ mb: 2, display: 'block', textAlign: 'left', width: '100%' }}>
          {errors.otp.message}
        </Typography>
      )}

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={otpValues.join('').length !== 4 || !email || isLoading}
        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
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
        {isLoading ? 'Verifying...' : 'Verify'}
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
            onClick={handleBackClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'text.primary',
              mb: 4,
              width: 40,
              height: 40,
              bgcolor: 'grey.300',
              borderRadius: '50%',
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
              mb: 5,
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
            <Typography variant="h5">Verify OTP</Typography>
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
              Didn&apos;t receive the code?
              <Link variant="subtitle2" sx={{ ml: 0.5, cursor: 'pointer' }} onClick={handleResendOtp}>
                Resend
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
