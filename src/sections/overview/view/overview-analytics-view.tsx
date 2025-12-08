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

        {/* Main Section: Why Choose Us (Left) and Resume Builder (Right) */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3, mt: 5, alignItems: { lg: 'stretch' } }}>
          {/* Left Side - Why Choose Us (reduced width) */}
          <Box sx={{ width: { xs: '100%', lg: '70%' }, flex: { lg: '0 0 65%' }, display: 'flex', flexDirection: 'column' }}>
            <WhyChooseUs />
          </Box>

          {/* Right Side - Resume Builder Card (increased width) */}
          <Box sx={{ width: { xs: '100%', lg: '35%' }, flex: { lg: '0 0 33%' }, display: 'flex', mt: { lg: 7 } }}>
            <Card
              sx={{
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.vars.palette.info.main} 0%, ${theme.vars.palette.info.dark} 100%)`,
                color: 'white',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                width: '100%',
                height: '100%',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
                position: 'relative',
                overflow: 'hidden',
              }}
              onClick={() => navigate('/resume-builder')}
            >
              <CardContent
                sx={{
                  width: '100%',
                  py: 2,
                  px: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                  '&:last-child': {
                    pb: 2,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      flexShrink: 0,
                    }}
                  >
                    <Iconify icon="solar:document-text-bold-duotone" width={20} />
                  </Avatar>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    Resume Builder
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', flex: 1 }}>
                    Create a professional resume
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/resume-builder');
                    }}
                    sx={{
                      bgcolor: 'white',
                      color: 'info.main',
                      flexShrink: 0,
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                      },
                    }}
                  >
                    Create Resume
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
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

