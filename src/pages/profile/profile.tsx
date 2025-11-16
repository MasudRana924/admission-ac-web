import { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import { _myAccount } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { DocumentUploadCard } from 'src/components';
import { profileSchema } from 'src/schemas/profile-schema';

// ----------------------------------------------------------------------

export default function ProfileView() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState('primary');
  const [previewFile, setPreviewFile] = useState<{ file: File; url: string } | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      displayName: _myAccount.displayName,
      email: _myAccount.email,
      phone: '+1 (555) 123-4567',
      address: '123 Main Street, New York, NY 10001',
      bio: 'Full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies.',
      website: 'https://masudrana.dev',
      company: 'Tech Solutions Inc.',
      position: 'Senior Developer',
      // MSC fields
      mscInstitution: '',
      mscSubject: '',
      mscResult: '',
      mscPassingYear: '',
      // BSC fields
      bscInstitution: '',
      bscSubject: '',
      bscResult: '',
      bscPassingYear: '',
      // HSC fields
      hscInstitution: '',
      hscGroup: '',
      hscResult: '',
      hscPassingYear: '',
      // SSC fields
      sscInstitution: '',
      sscGroup: '',
      sscResult: '',
      sscPassingYear: '',
      // Documents
      mscDocument: null as File | null,
      bscDocument: null as File | null,
      hscDocument: null as File | null,
      sscDocument: null as File | null,
      passportDocument: null as File | null,
    },
  });

  const formData = watch();

  const handleFileUpload = (field: string) => (file: File) => {
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

  const onSubmit = useCallback((data: any) => {
    // Handle form submission here
    console.log('Profile data:', data);
    // You can add a success notification here
  }, []);

  return (
    <DashboardContent>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 3 }}>
        <Button
          variant="text"
          size="large"
          onClick={() => router.push('/dashboard')}
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

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Card sx={{ flex: 1, p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Profile Information
          </Typography>

          {/* Profile Picture Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
            <Avatar 
              src={_myAccount.photoURL} 
              alt={_myAccount.displayName}
              sx={{ width: 80, height: 80 }}
            >
              {_myAccount.displayName.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h6">{_myAccount.displayName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {_myAccount.email}
              </Typography>
            </Box>
          </Box>

          {/* Tabs */}
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => setCurrentTab(newValue)}
            sx={{ mb: 3 }}
          >
            <Tab label="Primary Information" value="primary" />
            <Tab label="Academic" value="academic" />
            <Tab label="Documents" value="documents" />
          </Tabs>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Primary Information Tab */}
            {currentTab === 'primary' && (
              <>
                {/* Personal Information */}
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Personal Information
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
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
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
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
                          label="Email Address"
                          type="email"
                          error={!!errors.email}
                          helperText={errors.email?.message}
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Phone Number"
                          error={!!errors.phone}
                          helperText={errors.phone?.message}
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="website"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Website"
                          error={!!errors.website}
                          helperText={errors.website?.message}
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
                  </Box>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Address"
                        error={!!errors.address}
                        helperText={errors.address?.message}
                        slotProps={{
                          inputLabel: { shrink: true },
                        }}
                      />
                    )}
                  />
                </Box>

                {/* Professional Information */}
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Professional Information
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Controller
                      name="company"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Company"
                          error={!!errors.company}
                          helperText={errors.company?.message}
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="position"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Position"
                          error={!!errors.position}
                          helperText={errors.position?.message}
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
                  </Box>
                </Box>

                {/* Bio */}
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'bold' }}>
                    About Me
                  </Typography>
                  <Controller
                    name="bio"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Bio"
                        multiline
                        rows={4}
                        error={!!errors.bio}
                        helperText={errors.bio?.message}
                        slotProps={{
                          inputLabel: { shrink: true },
                        }}
                      />
                    )}
                  />
                </Box>
              </>
            )}

            {/* Academic Tab */}
            {currentTab === 'academic' && (
              <>
                {/* MSC */}
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                    MSC (Master of Science)
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Controller
                      name="mscInstitution"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Institution Name"
                          error={!!errors.mscInstitution}
                          helperText={errors.mscInstitution?.message}
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="mscSubject"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Subject"
                          error={!!errors.mscSubject}
                          helperText={errors.mscSubject?.message}
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Controller
                      name="mscResult"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Result (CGPA/Grade)"
                          error={!!errors.mscResult}
                          helperText={errors.mscResult?.message}
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="mscPassingYear"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Passing Year"
                          error={!!errors.mscPassingYear}
                          helperText={errors.mscPassingYear?.message}
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
                  </Box>
                </Box>

                {/* BSC */}
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                    BSC (Bachelor of Science)
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Controller
                      name="bscInstitution"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Institution Name"
                          error={!!errors.bscInstitution}
                          helperText={errors.bscInstitution?.message}
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
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
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Controller
                      name="bscResult"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Result (CGPA/Grade)"
                          error={!!errors.bscResult}
                          helperText={errors.bscResult?.message}
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
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
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
                  </Box>
                </Box>

                {/* HSC */}
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                    HSC (Higher Secondary Certificate)
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Controller
                      name="hscInstitution"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Institution Name"
                          error={!!errors.hscInstitution}
                          helperText={errors.hscInstitution?.message}
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="hscGroup"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Group (Science/Commerce/Arts)"
                          error={!!errors.hscGroup}
                          helperText={errors.hscGroup?.message}
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Controller
                      name="hscResult"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Result (GPA)"
                          error={!!errors.hscResult}
                          helperText={errors.hscResult?.message}
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
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
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
                  </Box>
                </Box>

                {/* SSC */}
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                    SSC (Secondary School Certificate)
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Controller
                      name="sscInstitution"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Institution Name"
                          error={!!errors.sscInstitution}
                          helperText={errors.sscInstitution?.message}
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="sscGroup"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Group (Science/Commerce/Arts)"
                          error={!!errors.sscGroup}
                          helperText={errors.sscGroup?.message}
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Controller
                      name="sscResult"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Result (GPA)"
                          error={!!errors.sscResult}
                          helperText={errors.sscResult?.message}
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
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
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
                  </Box>
                </Box>
              </>
            )}

            {/* Documents Tab */}
            {currentTab === 'documents' && (
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'bold' }}>
                  Upload Documents
                </Typography>
                <Box 
                  sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                    gap: 3 
                  }}
                >
                  {/* MSC Document */}
                  <DocumentUploadCard
                    title="MSC Certificate"
                    document={formData.mscDocument || null}
                    onUpload={handleFileUpload('mscDocument')}
                    onPreview={handlePreview}
                    color="primary"
                  />

                  {/* BSC Document */}
                  <DocumentUploadCard
                    title="BSC Certificate"
                    document={formData.bscDocument || null}
                    onUpload={handleFileUpload('bscDocument')}
                    onPreview={handlePreview}
                    color="info"
                  />

                  {/* HSC Document */}
                  <DocumentUploadCard
                    title="HSC Certificate"
                    document={formData.hscDocument || null}
                    onUpload={handleFileUpload('hscDocument')}
                    onPreview={handlePreview}
                    color="warning"
                  />

                  {/* SSC Document */}
                  <DocumentUploadCard
                    title="SSC Certificate"
                    document={formData.sscDocument || null}
                    onUpload={handleFileUpload('sscDocument')}
                    onPreview={handlePreview}
                    color="error"
                  />

                  {/* Passport Document */}
                  <DocumentUploadCard
                    title="Passport"
                    document={formData.passportDocument || null}
                    onUpload={handleFileUpload('passportDocument')}
                    onPreview={handlePreview}
                    color="success"
                    icon="solar:passport-bold"
                  />
                </Box>
              </Box>
            )}

            {/* Save Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit(onSubmit)}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>

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
          {/* Close Button */}
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

          {/* Preview Content */}
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
