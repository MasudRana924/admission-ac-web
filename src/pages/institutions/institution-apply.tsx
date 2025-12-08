import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';

import { useRouter } from 'src/routes/hooks';

import { _myAccount } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { BackButton } from 'src/components/back-button';
import { DocumentUploadCardCompact } from 'src/components/document-upload-card-compact';
import {
  applicationFormSchema,
} from 'src/schemas/application-form-schema';

// ----------------------------------------------------------------------

// Reusable TextField border and label styling
const textFieldBorderStyles = {
  width: '100%',
  margin: 0,
  '& .MuiOutlinedInput-root': {
    width: '100%',
    margin: 0,
    '& fieldset': {
      borderColor: 'grey.300',
    },
    '&:hover fieldset': {
      borderColor: 'grey.400',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'common.black',
      borderWidth: 2,
    },
  },
  '& .MuiInputBase-input': {
    width: '100%',
  },
  '& .MuiInputLabel-root': {
    color: 'grey.600',
    '&.Mui-focused': {
      color: 'common.black',
    },
  },
};

export default function InstitutionApplyView() {
  const router = useRouter();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [previewFile, setPreviewFile] = useState<{ file: File; url: string } | null>(null);

  // Get program name from URL params
  const programNameParam = searchParams.get('program');
  const decodedProgramName = programNameParam ? decodeURIComponent(programNameParam) : null;

  // Dummy data - in real app, fetch from API using id
  const institution = {
    name: 'Harvard University',
    type: 'Ivy League University',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL2sw4hgQft6loHWnHAksFXmDsIpPu8jqdhg&s',
    rating: 4.9,
    location: 'Cambridge, Massachusetts, USA',
    established: '1636',
  };

  // Program data - in real app, fetch from API based on program name
  const selectedProgram = decodedProgramName ? {
    name: decodedProgramName,
    intake: 'Fall 2025',
    deadline: 'June 30, 2025',
    duration: '4 Years',
    degree: 'B.Sc',
    subjects: ['AI', 'Cybersecurity', 'Data Science'],
  } : {
    name: 'Computer Science',
    intake: 'Fall 2025',
    deadline: 'June 30, 2025',
    duration: '4 Years',
    degree: 'B.Sc',
    subjects: ['AI', 'Cybersecurity', 'Data Science'],
  };

  // Apply form with react-hook-form
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(applicationFormSchema),
    defaultValues: {
      // Primary Information
      displayName: _myAccount.displayName,
      email: _myAccount.email,
      phone: '',
      address: '',
      // Academic Information
      bscInstitution: '',
      bscSubject: '',
      bscResult: '',
      bscPassingYear: '',
      hscInstitution: '',
      hscGroup: '',
      hscResult: '',
      hscPassingYear: '',
      sscInstitution: '',
      sscGroup: '',
      sscResult: '',
      sscPassingYear: '',
      // Documents
      bscDocument: null as File | null,
      hscDocument: null as File | null,
      sscDocument: null as File | null,
      passportDocument: null as File | null,
    },
  });

  // Watch document fields for display
  const bscDocument = watch('bscDocument');
  const hscDocument = watch('hscDocument');
  const sscDocument = watch('sscDocument');
  const passportDocument = watch('passportDocument');

  const handleApplyFileUpload = (field: string) => (file: File) => {
    setValue(field as any, file, { shouldValidate: true });
  };

  const handlePreview = (file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewFile({ file, url });
    }
  };

  const handleClosePreview = () => {
    if (previewFile) {
      URL.revokeObjectURL(previewFile.url);
    }
    setPreviewFile(null);
  };

  const onSubmitApplication = async (data: any) => {
    // Handle application submission
    console.log('Application data:', data);
    console.log('Institution ID:', id);
    console.log('Program:', selectedProgram);
    // Navigate back after submission
    router.push(`/institutions/${id}`);
  };

  return (
    <DashboardContent maxWidth="lg">
      {/* Back Button */}
      <Box sx={{ mb: 3 }}>
        <BackButton />
      </Box>

      <Typography variant="h3" sx={{ mb: 4, fontWeight: 700 }}>
        Application Form
      </Typography>

      <Grid container spacing={3}>
        {/* Left Side - Form Fields */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ 
            // p: { xs: 2, sm: 4 }, 
            p:{pt:3},
            width: { xs: '95vw', sm: '95%', lg: '100%' }, 
            mx: { xs: 'auto', sm: 0 },
            maxWidth: { xs: '95vw', sm: 'none' },
            '& .MuiTextField-root': {
              width: '100%',
              margin: 0,
              marginLeft: 0,
              marginRight: 0,
            },
          }}>
            {/* Primary Information Section */}
            <Box sx={{ mb: 4, width: '100%', margin: 0, padding: 0 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                Primary Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', margin: 0, padding: 0, ml: 0, mr: 0 }}>
                <Controller
                  name="displayName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Full Name"
                      error={!!errors.displayName}
                      helperText={errors.displayName?.message}
                      required
                      sx={textFieldBorderStyles}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      type="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      required
                      sx={textFieldBorderStyles}
                    />
                  )}
                />
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Phone"
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      required
                      sx={textFieldBorderStyles}
                    />
                  )}
                />
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Address"
                      multiline
                      rows={3}
                      error={!!errors.address}
                      helperText={errors.address?.message}
                      required
                      sx={textFieldBorderStyles}
                    />
                  )}
                />
              </Box>
            </Box>

            {/* <Divider sx={{ my: 4 }} /> */}

            {/* Academic Information Section */}
            <Box sx={{ mb: 4, width: '100%', mt:3, padding: 0 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                Academic Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%', margin: 0, padding: 0, ml: 0, mr: 0 }}>
                {/* BSC */}
                <Box>
                  {/* <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                    BSC Information
                  </Typography> */}
                  <Grid container spacing={2}>
                    <Grid size={12}>
                      <Controller
                        name="bscInstitution"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Unisersity Name"
                            error={!!errors.bscInstitution}
                            helperText={errors.bscInstitution?.message}
                            required
                            sx={textFieldBorderStyles}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Controller
                        name="bscSubject"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Subject"
                            error={!!errors.bscSubject}
                            helperText={errors.bscSubject?.message}
                            required
                            sx={textFieldBorderStyles}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Controller
                        name="bscResult"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Result"
                            error={!!errors.bscResult}
                            helperText={errors.bscResult?.message}
                            required
                            sx={textFieldBorderStyles}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Controller
                        name="bscPassingYear"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Passing Year"
                            error={!!errors.bscPassingYear}
                            helperText={errors.bscPassingYear?.message}
                            required
                            sx={textFieldBorderStyles}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Box>

                {/* <Divider /> */}

                {/* HSC */}
                <Box>
                  {/* <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                    HSC Information
                  </Typography> */}
                  <Grid container spacing={2}>
                    <Grid size={12}>
                      <Controller
                        name="hscInstitution"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="College Name"
                            error={!!errors.hscInstitution}
                            helperText={errors.hscInstitution?.message}
                            required
                            sx={textFieldBorderStyles}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Controller
                        name="hscGroup"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Group"
                            error={!!errors.hscGroup}
                            helperText={errors.hscGroup?.message}
                            required
                            sx={textFieldBorderStyles}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Controller
                        name="hscResult"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Result"
                            error={!!errors.hscResult}
                            helperText={errors.hscResult?.message}
                            required
                            sx={textFieldBorderStyles}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Controller
                        name="hscPassingYear"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Passing Year"
                            error={!!errors.hscPassingYear}
                            helperText={errors.hscPassingYear?.message}
                            required
                            sx={textFieldBorderStyles}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Box>

                {/* <Divider /> */}

                {/* SSC */}
                <Box>
                  {/* <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                    SSC Information
                  </Typography> */}
                  <Grid container spacing={2}>
                    <Grid size={12}>
                      <Controller
                        name="sscInstitution"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="School Name"
                            error={!!errors.sscInstitution}
                            helperText={errors.sscInstitution?.message}
                            required
                            sx={textFieldBorderStyles}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Controller
                        name="sscGroup"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Group"
                            error={!!errors.sscGroup}
                            helperText={errors.sscGroup?.message}
                            required
                            sx={textFieldBorderStyles}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Controller
                        name="sscResult"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Result"
                            error={!!errors.sscResult}
                            helperText={errors.sscResult?.message}
                            required
                            sx={textFieldBorderStyles}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Controller
                        name="sscPassingYear"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Passing Year"
                            error={!!errors.sscPassingYear}
                            helperText={errors.sscPassingYear?.message}
                            required
                            sx={textFieldBorderStyles}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>

            {/* <Divider sx={{ my: 4 }} /> */}

            {/* Documents Section */}
            <Box sx={{ width: '100%', mt: 3, padding: 0 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                Documents
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', margin: 0, padding: 0, ml: 0, mr: 0 }}>
                <DocumentUploadCardCompact
                  title="BSC Certificate"
                  document={bscDocument || null}
                  onUpload={handleApplyFileUpload('bscDocument')}
                  onPreview={handlePreview}
                  color="info"
                />
                <DocumentUploadCardCompact
                  title="HSC Certificate"
                  document={hscDocument || null}
                  onUpload={handleApplyFileUpload('hscDocument')}
                  onPreview={handlePreview}
                  color="warning"
                />
                <DocumentUploadCardCompact
                  title="SSC Certificate"
                  document={sscDocument || null}
                  onUpload={handleApplyFileUpload('sscDocument')}
                  onPreview={handlePreview}
                  color="error"
                />
                <DocumentUploadCardCompact
                  title="Passport"
                  document={passportDocument || null}
                  onUpload={handleApplyFileUpload('passportDocument')}
                  onPreview={handlePreview}
                  color="success"
                  icon="solar:passport-bold"
                />
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Right Side - Institution Information & Submit Button */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Box sx={{ position: { xs: 'static', lg: 'sticky' }, top: { lg: 24 } }}>
            <Card sx={{ 
              p: 3, 
              mb: 3, 
              width: { xs: '95vw', sm: '100%' }, 
              mx: { xs: 'auto', sm: 0 },
              maxWidth: { xs: '95vw', sm: 'none' }
            }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                Institution Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Iconify icon="solar:buildings-bold" width={20} color="primary.main" />
                    <Typography variant="body2" color="text.secondary">
                      Institution Name
                    </Typography>
                  </Box>
                  <Typography variant="body1" fontWeight={600}>
                    {institution.name}
                  </Typography>
                </Box>
                {selectedProgram && (
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Iconify icon="solar:diploma-bold" width={20} color="success.main" />
                      <Typography variant="body2" color="text.secondary">
                        Selected Program
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight={600}>
                      {selectedProgram.name} ({selectedProgram.degree})
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                      Intake: {selectedProgram.intake}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      Deadline: {selectedProgram.deadline}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Card>

            {/* Submit Button */}
            <Card sx={{ 
              p: 3, 
              width: { xs: '95vw', sm: '100%' }, 
              mx: { xs: 'auto', sm: 0 },
              maxWidth: { xs: '95vw', sm: 'none' }
            }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleSubmit(onSubmitApplication)}
                startIcon={<Iconify icon="solar:check-circle-bold" width={20} />}
              >
                Submit Application
              </Button>
            </Card>
          </Box>
        </Grid>
      </Grid>

      {/* Preview Modal */}
      <Modal
        open={!!previewFile}
        onClose={handleClosePreview}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflow: 'hidden',
          }}
        >
          <IconButton
            onClick={handleClosePreview}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'background.paper',
              boxShadow: 2,
              zIndex: 1,
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            <Iconify icon="solar:close-circle-bold" width={32} />
          </IconButton>

          <Box
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography variant="h6" sx={{ pt: 1 }}>
              {previewFile?.file.name}
            </Typography>

            {previewFile?.file.type.startsWith('image/') ? (
              <Box
                component="img"
                src={previewFile.url}
                alt="Preview"
                sx={{
                  maxWidth: '80vw',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  borderRadius: 1,
                }}
              />
            ) : (
              <Box
                component="iframe"
                src={previewFile?.url}
                title="PDF Preview"
                sx={{
                  width: '80vw',
                  height: '70vh',
                  border: 'none',
                  borderRadius: 1,
                }}
              />
            )}
          </Box>
        </Box>
      </Modal>
    </DashboardContent>
  );
}
