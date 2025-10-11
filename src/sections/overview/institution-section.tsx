import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { useNavigate } from 'react-router-dom';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const institutes = [
  {
    id: 1,
    name: 'Algoma University',
    location: 'Nova Scotia, Canada',
    programs: '2 matching programs',
    acceptance: '74%',
    cost: '$12k',
    logoType: 'algoma',
  },
  {
    id: 2,
    name: 'Acadia University',
    location: 'Nova Scotia, Canada',
    programs: '2 matching programs',
    acceptance: '74%',
    cost: '$12k',
    logoType: 'acadia',
  },
  {
    id: 3,
    name: 'Cal Arts University',
    location: 'Nova Scotia, Canada',
    programs: '2 matching programs',
    acceptance: '74%',
    cost: '$12k',
    logoType: 'calArts',
  },
];

// Helper function to get logo background color based on university
const getLogoColor = (logoType: string) => {
  const colors: Record<string, string> = {
    algoma: '#1976d2',
    acadia: '#d32f2f',
    calArts: '#f57c00',
  };
  return colors[logoType] || '#757575';
};

// Helper function to get first letter of university name
const getInitials = (name: string) => name.charAt(0).toUpperCase();

export function InstitutionSection() {
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
        <Typography variant="h5">Institution</Typography>
        <Button
          onClick={() => navigate('/institutions')}
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

      {/* Institution Cards */}
      <Grid container spacing={3}>
        {institutes.map((institute) => (
          <Grid key={institute.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
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
              <CardContent sx={{ p: 3 }}>
                {/* University Logo & Name */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      bgcolor: getLogoColor(institute.logoType),
                      fontSize: '1.5rem',
                      fontWeight: 600,
                    }}
                  >
                    {getInitials(institute.name)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600 }}>
                      {institute.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Iconify
                        icon="solar:map-point-bold"
                        width={16}
                        sx={{ color: 'text.secondary' }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {institute.location}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Programs */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    mb: 2,
                    px: 1.5,
                    py: 0.75,
                    bgcolor: 'primary.lighter',
                    borderRadius: 1,
                  }}
                >
                  <Iconify
                    icon="solar:diploma-bold-duotone"
                    width={18}
                    sx={{ color: 'primary.main' }}
                  />
                  <Typography variant="body2" color="primary.main" fontWeight={600}>
                    {institute.programs}
                  </Typography>
                </Box>

                {/* Stats Row */}
                <Grid container spacing={2}>
                  <Grid size={6}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Acceptance Rate
                      </Typography>
                      <Typography variant="h6" fontWeight={600}>
                        {institute.acceptance}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={6}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Avg. Cost/Year
                      </Typography>
                      <Typography variant="h6" fontWeight={600}>
                        {institute.cost}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}



