import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Iconify } from 'src/components/iconify';
import { Logo } from 'src/components/logo';

// ----------------------------------------------------------------------

export function Footer() {
  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Why Choose Us', href: '/why-choose-us' },
      { label: 'Our Team', href: '/team' },
      { label: 'Success Stories', href: '/success-stories' },
    ],
    services: [
      { label: 'University Selection', href: '/services/university' },
      { label: 'Application Support', href: '/services/application' },
      { label: 'Visa Assistance', href: '/services/visa' },
      { label: 'Scholarship Guidance', href: '/services/scholarship' },
    ],
    destinations: [
      { label: 'Study in USA', href: '/destinations/usa' },
      { label: 'Study in UK', href: '/destinations/uk' },
      { label: 'Study in Canada', href: '/destinations/canada' },
      { label: 'Study in Australia', href: '/destinations/australia' },
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  };

  const socialLinks = [
    { icon: 'mdi:facebook', href: '#', color: '#1877F2' },
    { icon: 'mdi:instagram', href: '#', color: '#E4405F' },
    { icon: 'mdi:linkedin', href: '#', color: '#0A66C2' },
    { icon: 'mdi:youtube', href: '#', color: '#FF0000' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.neutral',
        pt: 8,
        pb: 3,
        mt: 10,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: { xs: '100%', lg: '75%' },
          mx: 'auto',
        }}
      >
        <Grid container spacing={4}>
          {/* Logo & Description */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Logo sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, pr: { md: 3 } }}>
              We help Bangladeshi students achieve their dreams of studying abroad. From university
              selection to visa assistance, we guide you through every step of your journey.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener"
                  sx={{
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: social.color,
                      borderColor: social.color,
                      transform: 'translateY(-4px)',
                      '& .iconify': {
                        color: 'white',
                      },
                    },
                  }}
                >
                  <Iconify
                    icon={social.icon}
                    width={20}
                    sx={{ color: social.color, transition: 'color 0.3s ease' }}
                    className="iconify"
                  />
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Company Links */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {footerLinks.company.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  underline="none"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Services Links */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {footerLinks.services.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  underline="none"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Destinations Links */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Destinations
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {footerLinks.destinations.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  underline="none"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Support Links */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {footerLinks.support.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  underline="none"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
            mt: 6,
            pt: 3,
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body2" color="text.secondary" textAlign={{ xs: 'center', md: 'left' }}>
                © {new Date().getFullYear()} All rights reserved. Made with ❤️ for Bangladeshi
                students
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  justifyContent: { xs: 'center', md: 'flex-end' },
                  flexWrap: 'wrap',
                }}
              >
                <Link
                  href="/terms"
                  underline="none"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  Terms of Service
                </Link>
                <Link
                  href="/privacy"
                  underline="none"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  Privacy Policy
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

