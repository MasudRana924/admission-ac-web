import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const institutions = [
  {
    id: '1',
    name: 'Harvard University',
    type: 'Ivy League University',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop',
    rating: '4.9',
    programs: 'Undergraduate & Graduate',
  },
  {
    id: '2',
    name: 'Oxford University',
    type: 'UK University',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop',
    rating: '4.8',
    programs: 'Liberal Arts & Sciences',
  },
  {
    id: '3',
    name: 'MIT',
    type: 'Engineering University',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop',
    rating: '4.9',
    programs: 'Technology & Engineering',
  },
  {
    id: '4',
    name: 'Stanford University',
    type: 'Private Research University',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop',
    rating: '4.8',
    programs: 'Business & Technology',
  },
  {
    id: '5',
    name: 'Cambridge University',
    type: 'UK University',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop',
    rating: '4.7',
    programs: 'Research & Academia',
  },
  {
    id: '6',
    name: 'ETH Zurich',
    type: 'Swiss University',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop',
    rating: '4.6',
    programs: 'Engineering & Technology',
  },
];

const institutionTypes = [
  'All',
  'Ivy League University',
  'UK University',
  'Engineering University',
  'Private Research University',
  'Swiss University',
];

const countries = ['All', 'USA', 'UK', 'Switzerland', 'Canada', 'Australia'];
const states = ['All', 'California', 'Massachusetts', 'New York', 'Texas', 'Ontario'];

const ieltsScores = ['All', '6.0', '6.5', '7.0', '7.5', '8.0'];

export default function InstitutionsView() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedIelts, setSelectedIelts] = useState('All');

  // Filter institutions based on search and filters
  const filteredInstitutions = institutions.filter((institution) => {
    const matchesSearch = institution.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || institution.type === selectedType;
    // You can add more filter logic here for country, state, IELTS
    return matchesSearch && matchesType;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSelectedCountry('All');
    setSelectedState('All');
    setSelectedIelts('All');
  };

  return (
    <DashboardContent>
      {/* Header with Back Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 3 }}>
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

      {/* Page Title */}
      <Typography variant="h4" sx={{ mb: 4 }}>
        All Institutions
      </Typography>

      {/* Search and Filter Section */}
      <Card sx={{ p: 3, mb: 4 }}>
        {/* Search Input */}
        <TextField
          fullWidth
          placeholder="Search institutions..."
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

        <Divider sx={{ mb: 3 }} />

        {/* Advanced Filters */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              Advanced Filters
            </Typography>
            <Button
              size="small"
              onClick={handleResetFilters}
              startIcon={<Iconify icon="solar:refresh-bold" width={18} />}
              sx={{ color: 'text.secondary' }}
            >
              Reset All
            </Button>
          </Box>

          <Grid container spacing={2}>
            {/* Country */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Country</InputLabel>
                <Select
                  value={selectedCountry}
                  label="Country"
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* State */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>State/Province</InputLabel>
                <Select
                  value={selectedState}
                  label="State/Province"
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* IELTS Score */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>IELTS Score</InputLabel>
                <Select
                  value={selectedIelts}
                  label="IELTS Score"
                  onChange={(e) => setSelectedIelts(e.target.value)}
                >
                  {ieltsScores.map((score) => (
                    <MenuItem key={score} value={score}>
                      {score === 'All' ? 'All Scores' : score}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Filter Chips */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Institution Type
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {institutionTypes.map((type) => (
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
        Showing {filteredInstitutions.length} of {institutions.length} institutions
      </Typography>

      {/* Institutions Grid */}
      <Grid container spacing={3}>
        {filteredInstitutions.map((institution) => (
          <Grid key={institution.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              onClick={() => router.push(`/institutions/${institution.id}`)}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
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
              {/* Image */}
              <Box
                component="img"
                src={institution.image}
                alt={institution.name}
                sx={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                }}
              />

              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Institution Name */}
                <Box>
                  <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 700 }}>
                    {institution.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {institution.type}
                  </Typography>
                </Box>

                {/* Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={parseFloat(institution.rating)} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" fontWeight={600}>
                    {institution.rating}
                  </Typography>
                </Box>

                {/* Programs */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1.5,
                    py: 1,
                    bgcolor: 'primary.lighter',
                    borderRadius: 1,
                  }}
                >
                  <Iconify
                    icon="solar:diploma-bold-duotone"
                    width={20}
                    sx={{ color: 'primary.main' }}
                  />
                  <Typography variant="body2" color="primary.main" fontWeight={600}>
                    {institution.programs}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No Results */}
      {filteredInstitutions.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'error.lighter',
              color: 'error.main',
              mx: 'auto',
              mb: 2,
            }}
          >
            <Iconify icon="solar:magnifer-zoom-out-bold" width={40} />
          </Avatar>
          <Typography variant="h6" sx={{ mb: 1 }}>
            No institutions found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filter to find what you&apos;re looking for.
          </Typography>
        </Box>
      )}
    </DashboardContent>
  );
}

