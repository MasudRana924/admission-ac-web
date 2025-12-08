import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { BackButton } from 'src/components/back-button';

// ----------------------------------------------------------------------

export default function EventRegisterView() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    message: '',
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmitRegistration = () => {
    console.log('Registration submitted:', formData);
    // Show success message and navigate back
    router.back();
  };

  return (
    <DashboardContent maxWidth="md">
      {/* Back Button */}
      <Box sx={{ mb: 3 }}>
        <BackButton />
      </Box>

      {/* Registration Form Card */}
      <Card sx={{ p: 4 }}>
         {/* Header */}
         <Box sx={{ mb: 4 }}>
           <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }}>
             Event Registration
           </Typography>
           <Typography variant="body1" color="text.secondary">
             Fill in the form below to register for this event
           </Typography>
         </Box>

        {/* Registration Form */}
        <Grid container spacing={3}>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Full Name"
              value={formData.name}
              onChange={handleInputChange('name')}
              placeholder="Enter your full name"
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                      <Iconify icon="solar:user-bold" width={20} color="text.secondary" />
                    </Box>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={handleInputChange('email')}
              placeholder="your.email@example.com"
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                      <Iconify icon="solar:letter-bold" width={20} color="text.secondary" />
                    </Box>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Phone Number"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              placeholder="+880 1XXX-XXXXXX"
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                      <Iconify icon="solar:phone-bold" width={20} color="text.secondary" />
                    </Box>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              label="Institution/Organization"
              value={formData.institution}
              onChange={handleInputChange('institution')}
              placeholder="Your school/college/university"
              slotProps={{
                input: {
                  startAdornment: (
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                      <Iconify icon="solar:buildings-bold" width={20} color="text.secondary" />
                    </Box>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              multiline
              rows={5}
              label="Message (Optional)"
              value={formData.message}
              onChange={handleInputChange('message')}
              placeholder="Any questions or special requirements?"
              slotProps={{
                input: {
                  startAdornment: (
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'flex-start', mt: 1.5 }}>
                      <Iconify icon="solar:chat-dots-bold" width={20} color="text.secondary" />
                    </Box>
                  ),
                },
              }}
            />
          </Grid>

          {/* Action Buttons */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={() => router.back()}
              startIcon={<Iconify icon="solar:close-circle-bold" width={20} />}
            >
              Cancel
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleSubmitRegistration}
              disabled={!formData.name || !formData.email || !formData.phone}
              startIcon={<Iconify icon="solar:check-circle-bold" width={20} />}
            >
              Submit Registration
            </Button>
          </Grid>
        </Grid>
      </Card>
    </DashboardContent>
  );
}

