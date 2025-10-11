import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function WhyChooseUs() {
  const cards = [
    {
      icon: 'solar:diploma-bold-duotone',
      title: '1,500+ programs',
      description: 'Top global programs',
      growth: '+2.6%',
      color: 'primary',
    },
    {
      icon: 'solar:wallet-money-bold-duotone',
      title: 'Scholarships',
      description: 'Find funding options',
      growth: '+3.8%',
      color: 'success',
    },
    {
      icon: 'solar:chart-2-bold-duotone',
      title: 'Fast matching',
      description: 'Personalized results',
      growth: '+1.9%',
      color: 'info',
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Why Choose Us
      </Typography>
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 'none',
                bgcolor: 'background.paper',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: (theme) => theme.shadows[8],
                },
              }}
            >
              <CardContent sx={{ py: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {card.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Iconify
                        icon="solar:graph-up-bold"
                        width={16}
                        sx={{ color: 'success.main' }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.primary',
                          fontWeight: 600,
                        }}
                      >
                        {card.growth}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        last 7 days
                      </Typography>
                    </Box>
                  </Box>
                  <Iconify
                    icon={card.icon}
                    width={56}
                    sx={{
                      color: `${card.color}.main`,
                      flexShrink: 0,
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

