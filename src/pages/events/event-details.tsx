import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useParams } from 'react-router-dom';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function EventDetailsView() {
  const router = useRouter();
  const { id } = useParams();

  const handleRegister = () => {
    router.push(`/events/${id}/register`);
  };

  // Dummy event data
  const event = {
    title: 'Dhaka University Admission Fair',
    image:
      'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1470&auto=format&fit=crop',
    type: 'University Fair',
    date: '15th December, 2024',
    time: '9:00 AM - 5:00 PM',
    location: 'DU Campus, Dhaka',
    organizer: 'Dhaka University',
    description:
      'Join us for the biggest university admission fair of the year! Meet representatives from top universities, get information about programs, scholarships, and admission requirements. This is your opportunity to explore various educational options and make informed decisions about your future.',
    highlights: [
      'Meet with admission officers from 50+ universities',
      'Attend career counseling sessions',
      'Learn about scholarship opportunities',
      'Get free study materials and guides',
      'Participate in interactive workshops',
    ],
    speakers: [
      { name: 'Dr. Ahmed Rahman', designation: 'Vice Chancellor, DU' },
      { name: 'Prof. Sarah Khan', designation: 'Admission Coordinator' },
      { name: 'Mr. Karim Hossain', designation: 'Career Counselor' },
    ],
    contact: {
      email: 'admissions@du.ac.bd',
      phone: '+880-2-9661900',
      website: 'https://www.du.ac.bd',
    },
  };

  return (
    <DashboardContent maxWidth="lg">
      {/* Back Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="text"
          size="large"
          onClick={() => router.back()}
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

      {/* Full Width Image */}
      <Box
        component="img"
        src={event.image}
        alt={event.title}
        sx={{
          width: '100%',
          height: { xs: 250, md: 400 },
          objectFit: 'cover',
          borderRadius: 2,
          mb: 4,
        }}
      />

      {/* Event Header */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Chip
              label={event.type}
              size="small"
              sx={{
                mb: 2,
                bgcolor: 'primary.lighter',
                color: 'primary.main',
                fontWeight: 600,
              }}
            />
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
              {event.title}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Iconify icon="solar:calendar-bold" width={20} sx={{ color: 'primary.main' }} />
                <Typography variant="body1">{event.date}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Iconify icon="solar:clock-circle-bold" width={20} sx={{ color: 'warning.main' }} />
                <Typography variant="body1">{event.time}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Iconify icon="solar:map-point-bold" width={20} sx={{ color: 'error.main' }} />
              <Typography variant="body1">{event.location}</Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            size="large"
            onClick={handleRegister}
            startIcon={<Iconify icon="solar:ticket-bold" width={20} />}
            sx={{
              px: { xs: 2, md: 4 },
              fontSize: { xs: '0.875rem', md: '1rem' },
            }}
          >
            Register Now
          </Button>
        </Box>
      </Card>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* About Event */}
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
              About Event
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {event.description}
            </Typography>
          </Card>

          {/* Event Highlights */}
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
              Event Highlights
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {event.highlights.map((highlight, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      mt: 1,
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="body1" color="text.secondary">
                    {highlight}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>

          {/* Speakers */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
              Speakers
            </Typography>
            <Grid container spacing={2}>
              {event.speakers.map((speaker, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6 }}>
                  <Card
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      p: 2.5,
                      textAlign: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: 'primary.lighter',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      <Iconify icon="solar:user-bold" width={30} color="primary.main" />
                    </Box>
                    <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
                      {speaker.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {speaker.designation}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>

        {/* Right Column - Event Info Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, position: 'sticky', top: 24 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
              Event Information
            </Typography>

            {/* Organizer */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Iconify icon="solar:buildings-bold" width={20} color="primary.main" />
                <Typography variant="subtitle2" color="text.secondary">
                  Organizer
                </Typography>
              </Box>
              <Typography variant="body1" fontWeight={600} sx={{ pl: 4.5 }}>
                {event.organizer}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Contact Information */}
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>
              Contact
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Iconify icon="solar:letter-bold" width={20} color="error.main" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {event.contact.email}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Iconify icon="solar:phone-bold" width={20} color="success.main" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {event.contact.phone}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Iconify icon="solar:global-bold" width={20} color="info.main" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Website
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {event.contact.website}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Register Button */}
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleRegister}
              startIcon={<Iconify icon="solar:ticket-bold" width={20} />}
            >
              Register Now
            </Button>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}

