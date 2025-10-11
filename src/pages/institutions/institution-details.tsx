import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function InstitutionDetailsView() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState('programs');
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState<number | null>(0);
  const [reviewComment, setReviewComment] = useState('');

  // Dummy data
  const institution = {
    name: 'Harvard University',
    type: 'Ivy League University',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL2sw4hgQft6loHWnHAksFXmDsIpPu8jqdhg&s',
    rating: 4.9,
    location: 'Cambridge, Massachusetts, USA',
    established: '1636',
    about:
      'Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Established in 1636, Harvard is the oldest institution of higher education in the United States.',
  };

  const programs = [
    {
      name: 'Computer Science',
      intake: 'Fall 2025',
      deadline: 'June 30, 2025',
      duration: '4 Years',
      degree: 'B.Sc',
      subjects: ['AI', 'Cybersecurity', 'Data Science'],
    },
    {
      name: 'Business Administration',
      intake: 'Spring 2025',
      deadline: 'Dec 15, 2024',
      duration: '3 Years',
      degree: 'BBA',
      subjects: ['Marketing', 'Finance', 'HR Management'],
    },
    {
      name: 'Design & Arts',
      intake: 'Fall 2025',
      deadline: 'July 10, 2025',
      duration: '4 Years',
      degree: 'B.Des',
      subjects: ['Graphic Design', 'Fashion Design'],
    },
  ];

  const requirements = [
    'Minimum GPA: 3.0',
    'IELTS: 6.5 or TOEFL: 90',
    'Copy of passport',
    'Transcripts & certificates',
  ];

  const scholarships = [
    { name: 'Merit-based Scholarship', amount: '50% Tuition Fee' },
    { name: 'Sports Excellence Scholarship', amount: '25% Tuition Fee' },
  ];

  const facilities = ['Library', 'Sports Complex', 'Laboratories', 'Hostel', 'Cafeteria'];

  const [reviews, setReviews] = useState([
    { name: 'Alice', rating: 5, comment: 'Great campus and faculty!' },
    { name: 'Bob', rating: 4, comment: 'Amazing programs, but accommodation is limited.' },
  ]);

  const handleSubmitReview = () => {
    if (reviewName.trim() && reviewRating && reviewComment.trim()) {
      const newReview = {
        name: reviewName,
        rating: reviewRating,
        comment: reviewComment,
      };
      setReviews([newReview, ...reviews]);
      // Reset form
      setReviewName('');
      setReviewRating(0);
      setReviewComment('');
    }
  };

  const contact = {
    email: 'admissions@exampleuniversity.com',
    phone: '+1 234 567 890',
    website: 'https://www.exampleuniversity.com',
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
        src={institution.image}
        alt={institution.name}
        sx={{
          width: '100%',
          height: { xs: 250, md: 400 },
          objectFit: 'cover',
          borderRadius: 2,
          mb: 4,
        }}
      />

      {/* Institution Header */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }}>
              {institution.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              {institution.type}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Iconify icon="solar:map-point-bold" width={20} sx={{ color: 'error.main' }} />
                <Typography variant="body1">{institution.location}</Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Iconify icon="solar:calendar-bold" width={20} sx={{ color: 'warning.main' }} />
                <Typography variant="body1">Est. {institution.established}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating value={institution.rating} precision={0.1} readOnly />
              <Typography variant="h6" fontWeight={600}>
                {institution.rating}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            size="large"
            startIcon={<Iconify icon="solar:pen-bold" width={20} />}
            sx={{ 
              px: { xs: 2, md: 4 },
              fontSize: { xs: '0.875rem', md: '1rem' },
              minWidth: { xs: 'auto', md: 'auto' },
              '& .MuiButton-startIcon': {
                '& svg': {
                  width: { xs: 18, md: 20 },
                  height: { xs: 18, md: 20 },
                },
              },
            }}
          >
            Apply Now
          </Button>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" color="text.secondary">
          {institution.about}
        </Typography>
      </Card>

      {/* Tabs */}
      <Card sx={{ mb: 3 }}>
        <Tabs
          value={currentTab}
          onChange={(e, newValue) => setCurrentTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
        >
          <Tab label="Programs" value="programs" />
          <Tab label="Requirements" value="requirements" />
          <Tab label="Scholarships" value="scholarships" />
          <Tab label="Facilities" value="facilities" />
          <Tab label="Reviews" value="reviews" />
          <Tab label="Contact" value="contact" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {/* Programs Tab */}
          {currentTab === 'programs' && (
            <Grid container spacing={3}>
              {programs.map((program, index) => (
                <Grid key={index} size={{ xs: 12, md: 6 }}>
                  <Card
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      p: 3,
                      height: '100%',
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                      {program.name}
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid size={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Iconify icon="solar:calendar-mark-bold" width={18} color="primary.main" />
                          <Typography variant="body2" color="text.secondary">
                            Intake
                          </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight={600}>
                          {program.intake}
                        </Typography>
                      </Grid>
                      <Grid size={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Iconify icon="solar:alarm-bold" width={18} color="error.main" />
                          <Typography variant="body2" color="text.secondary">
                            Deadline
                          </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight={600}>
                          {program.deadline}
                        </Typography>
                      </Grid>
                      <Grid size={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Iconify icon="solar:clock-circle-bold" width={18} color="warning.main" />
                          <Typography variant="body2" color="text.secondary">
                            Duration
                          </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight={600}>
                          {program.duration}
                        </Typography>
                      </Grid>
                      <Grid size={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Iconify icon="solar:diploma-bold" width={18} color="success.main" />
                          <Typography variant="body2" color="text.secondary">
                            Degree
                          </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight={600}>
                          {program.degree}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Subjects
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {program.subjects.map((subject, idx) => (
                        <Chip key={idx} label={subject} size="small" color="primary" variant="outlined" />
                      ))}
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Requirements Tab */}
          {currentTab === 'requirements' && (
            <Box>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                Admission Requirements
              </Typography>
              <Grid container spacing={2}>
                {requirements.map((requirement, index) => (
                  <Grid key={index} size={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'success.lighter', color: 'success.main' }}>
                        <Iconify icon="solar:check-circle-bold" width={24} />
                      </Avatar>
                      <Typography variant="body1">{requirement}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Scholarships Tab */}
          {currentTab === 'scholarships' && (
            <Box>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                Available Scholarships
              </Typography>
              <Grid container spacing={3}>
                {scholarships.map((scholarship, index) => (
                  <Grid key={index} size={{ xs: 12, md: 6 }}>
                    <Card
                      sx={{
                        border: '2px solid',
                        borderColor: 'warning.main',
                        bgcolor: 'warning.lighter',
                        p: 3,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Iconify icon="solar:medal-star-bold" width={32} color="warning.main" />
                        <Typography variant="h6" fontWeight={700}>
                          {scholarship.name}
                        </Typography>
                      </Box>
                      <Typography variant="h5" color="warning.darker" fontWeight={700}>
                        {scholarship.amount}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Facilities Tab */}
          {currentTab === 'facilities' && (
            <Box>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                Campus Facilities
              </Typography>
              <Grid container spacing={2}>
                {facilities.map((facility, index) => (
                  <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        bgcolor: 'background.neutral',
                      }}
                    >
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <Iconify icon="solar:home-smile-bold" width={24} />
                      </Avatar>
                      <Typography variant="body1" fontWeight={600}>
                        {facility}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Reviews Tab */}
          {currentTab === 'reviews' && (
            <Grid container spacing={3}>
              {/* Left: All Reviews */}
              <Grid size={{ xs: 12, md: 7 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                  All Reviews ({reviews.length})
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {reviews.map((review, index) => (
                    <Card key={index} sx={{ border: '1px solid', borderColor: 'divider', p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {review.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {review.name}
                          </Typography>
                          <Rating value={review.rating} readOnly size="small" />
                        </Box>
                      </Box>
                      <Typography variant="body1" color="text.secondary">
                        {review.comment}
                      </Typography>
                    </Card>
                  ))}
                </Box>
              </Grid>

              {/* Right: Write Review Form */}
              <Grid size={{ xs: 12, md: 5 }}>
                <Card
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: '#ffffff',
                    p: 3,
                    position: 'sticky',
                    top: 24,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                    Write Your Review
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="Enter your name"
                    />
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Your Rating
                      </Typography>
                      <Rating
                        value={reviewRating}
                        onChange={(event, newValue) => setReviewRating(newValue)}
                        size="large"
                      />
                    </Box>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Your Review"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience..."
                    />
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={handleSubmitReview}
                      disabled={!reviewName.trim() || !reviewRating || !reviewComment.trim()}
                      startIcon={<Iconify icon="solar:pen-bold" width={20} />}
                    >
                      Submit Review
                    </Button>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Contact Tab */}
          {currentTab === 'contact' && (
            <Box>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                Contact Information
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card sx={{ border: '1px solid', borderColor: 'divider', p: 3, textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: 'error.lighter', color: 'error.main', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                      <Iconify icon="solar:letter-bold" width={28} />
                    </Avatar>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      Email
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {contact.email}
                    </Typography>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card sx={{ border: '1px solid', borderColor: 'divider', p: 3, textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: 'success.lighter', color: 'success.main', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                      <Iconify icon="solar:phone-bold" width={28} />
                    </Avatar>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      Phone
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {contact.phone}
                    </Typography>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card sx={{ border: '1px solid', borderColor: 'divider', p: 3, textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: 'info.lighter', color: 'info.main', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                      <Iconify icon="solar:global-bold" width={28} />
                    </Avatar>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      Website
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {contact.website}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Card>
    </DashboardContent>
  );
}

