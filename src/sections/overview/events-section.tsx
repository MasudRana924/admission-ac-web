import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { useNavigate } from 'react-router-dom';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const events = [
  {
    id: '1',
    title: 'Dhaka University Admission Fair',
    time: '15th Dec, 2024 | 9:00 AM',
    location: 'DU Campus',
    image:
      'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1470&auto=format&fit=crop',
    type: 'University Fair',
  },
  {
    id: '2',
    title: 'BUET Engineering Info Session',
    time: '20th Dec, 2024 | 2:00 PM',
    location: 'BUET Campus',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop',
    type: 'Admission Info',
  },
  {
    id: '3',
    title: 'Medical College Guidance',
    time: '25th Dec, 2024 | 10:00 AM',
    location: 'DMC Campus',
    image:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1470&auto=format&fit=crop',
    type: 'Medical Admission',
  },
];

export function EventsSection() {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Typography variant="h5">Events</Typography>
        <Button
          onClick={() => navigate('/events')}
          endIcon={<Iconify icon="solar:alt-arrow-right-linear" width={20} />}
          sx={{
            color: 'primary.main',
            fontWeight: 600,
            '&:hover': {
              bgcolor: 'primary.lighter',
            },
          }}
        >
          See All
        </Button>
      </Box>

      {/* Event Cards */}
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid key={event.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              onClick={() => navigate(`/events/${event.id}`)}
              sx={{
                height: '100%',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 'none',
                bgcolor: 'background.paper',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: (theme) => theme.shadows[8],
                },
              }}
            >
              {/* Event Image */}
              <CardMedia
                component="img"
                height="180"
                image={event.image}
                alt={event.title}
                sx={{
                  objectFit: 'cover',
                }}
              />

              <CardContent sx={{ p: 2.5 }}>
                {/* Event Type Badge */}
                <Chip
                  label={event.type}
                  size="small"
                  sx={{
                    mb: 1.5,
                    height: 24,
                    bgcolor: 'primary.lighter',
                    color: 'primary.main',
                    fontWeight: 600,
                    '& .MuiChip-label': {
                      px: 1,
                    },
                  }}
                />

                {/* Event Title */}
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1.5,
                    fontWeight: 600,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    minHeight: 48,
                  }}
                >
                  {event.title}
                </Typography>

                {/* Time */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <Iconify
                    icon="solar:calendar-bold-duotone"
                    width={18}
                    sx={{ color: 'text.secondary' }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {event.time}
                  </Typography>
                </Box>

                {/* Location */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Iconify
                    icon="solar:map-point-bold"
                    width={18}
                    sx={{ color: 'text.secondary' }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {event.location}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}



