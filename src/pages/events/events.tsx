import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { BackButton } from 'src/components/back-button';

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
  {
    id: '4',
    title: 'NSU Open House Event',
    time: '28th Dec, 2024 | 11:00 AM',
    location: 'NSU Campus',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop',
    type: 'University Fair',
  },
  {
    id: '5',
    title: 'IBA MBA Program Info',
    time: '30th Dec, 2024 | 3:00 PM',
    location: 'IBA, DU',
    image:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1470&auto=format&fit=crop',
    type: 'Admission Info',
  },
  {
    id: '6',
    title: 'Study Abroad Fair 2024',
    time: '5th Jan, 2025 | 10:00 AM',
    location: 'Bashundhara City',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1470&auto=format&fit=crop',
    type: 'International',
  },
];

const eventTypes = ['All', 'University Fair', 'Admission Info', 'Medical Admission', 'International'];

export default function EventsView() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  // Filter events based on search and type
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <DashboardContent>
      {/* Header with Back Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 3 }}>
        <BackButton />
      </Box>

      {/* Page Title */}
      <Typography variant="h4" sx={{ mb: 4 }}>
        All Events
      </Typography>

      {/* Search and Filter Section */}
      <Card sx={{ p: 3, mb: 4 }}>
        {/* Search Input */}
        <TextField
          fullWidth
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="solar:magnifer-bold" width={24} sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{ mb: 3 }}
        />

        {/* Filter Chips */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Event Type
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {eventTypes.map((type) => (
              <Chip
                key={type}
                label={type}
                onClick={() => setSelectedType(type)}
                color={selectedType === type ? 'primary' : 'default'}
                variant={selectedType === type ? 'filled' : 'outlined'}
                sx={{
                  fontWeight: selectedType === type ? 600 : 400,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: selectedType === type ? 'primary.dark' : 'action.hover',
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Card>

      {/* Results Count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing {filteredEvents.length} of {events.length} events
      </Typography>

      {/* Events Grid */}
      <Grid container spacing={3}>
        {filteredEvents.map((event) => (
          <Grid key={event.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              onClick={() => router.push(`/events/${event.id}`)}
              sx={{
                height: '100%',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: (theme) => theme.shadows[12],
                  borderColor: 'primary.main',
                },
              }}
            >
              {/* Event Image */}
              <CardMedia
                component="img"
                height="200"
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
                  <Iconify icon="solar:map-point-bold" width={18} sx={{ color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {event.location}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No Results */}
      {filteredEvents.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            No events found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filter to find what you&apos;re looking for.
          </Typography>
        </Box>
      )}
    </DashboardContent>
  );
}

