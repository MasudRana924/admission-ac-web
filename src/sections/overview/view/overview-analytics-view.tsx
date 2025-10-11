import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { UserProfileCard } from 'src/layouts/components/user-profile-card';

import { WhyChooseUs } from '../why-choose-us';
import { ImageSlider } from '../image-slider';
import { InstitutionSection } from '../institution-section';
import { EventsSection } from '../events-section';


// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  const navigate = useNavigate();

  return (
    <DashboardContent 
      maxWidth={false}
      sx={{
        px: { xs: 2, md: 3 },
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', lg: '75%' },
          mx: 'auto',
        }}
      >
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          Hi, Welcome back 👋
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <UserProfileCard />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.vars.palette.primary.main} 0%, ${theme.vars.palette.primary.dark} 100%)`,
                color: 'white',
                height: 180,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <CardContent
                sx={{
                  width: '100%',
                  p: 3,
                  '&:last-child': {
                    pb: 3,
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      sx={{
                        width: 72,
                        height: 72,
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                      }}
                    >
                      <Iconify icon="solar:chat-round-dots-bold" width={36} />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ color: 'white', mb: 0.5 }}>
                        Need Help?
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        Chat with our support team
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/advisor-chat')}
                    sx={{
                      flexShrink: 0,
                      bgcolor: 'white',
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                      },
                    }}
                  >
                    Chat Now
                  </Button>
                </Box>
              </CardContent>
              <Iconify
                icon="solar:chat-line-bold-duotone"
                width={64}
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  color: 'rgba(255, 255, 255, 0.3)',
                }}
              />
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }}>
          <WhyChooseUs />
        </Box>

        <Box sx={{ mt: 5 }}>
          <ImageSlider />
        </Box>

        <Box sx={{ mt: 5 }}>
          <InstitutionSection />
        </Box>

        <Box sx={{ mt: 5 }}>
          <EventsSection />
        </Box>
      </Box>
    </DashboardContent>
  );
}

