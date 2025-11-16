import { useState, useCallback } from 'react';

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

// ----------------------------------------------------------------------

export default function ProfileView() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState('primary');
  const [previewFile, setPreviewFile] = useState<{ file: File; url: string } | null>(null);

  const [formData, setFormData] = useState({
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
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleFileUpload = (field: string) => (file: File) => {
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
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

  const handleSubmit = useCallback(() => {
    // Handle form submission here
    console.log('Profile data:', formData);
    // You can add a success notification here
  }, [formData]);

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
                    <TextField
                      fullWidth
                      name="displayName"
                      label="Full Name"
                      value={formData.displayName}
                      onChange={handleInputChange('displayName')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                    <TextField
                      fullWidth
                      name="email"
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                      fullWidth
                      name="phone"
                      label="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange('phone')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                    <TextField
                      fullWidth
                      name="website"
                      label="Website"
                      value={formData.website}
                      onChange={handleInputChange('website')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                  </Box>
                  <TextField
                    fullWidth
                    name="address"
                    label="Address"
                    value={formData.address}
                    onChange={handleInputChange('address')}
                    slotProps={{
                      inputLabel: { shrink: true },
                    }}
                  />
                </Box>

                {/* Professional Information */}
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Professional Information
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                      fullWidth
                      name="company"
                      label="Company"
                      value={formData.company}
                      onChange={handleInputChange('company')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                    <TextField
                      fullWidth
                      name="position"
                      label="Position"
                      value={formData.position}
                      onChange={handleInputChange('position')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                  </Box>
                </Box>

                {/* Bio */}
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'bold' }}>
                    About Me
                  </Typography>
                  <TextField
                    fullWidth
                    name="bio"
                    label="Bio"
                    multiline
                    rows={4}
                    value={formData.bio}
                    onChange={handleInputChange('bio')}
                    slotProps={{
                      inputLabel: { shrink: true },
                    }}
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
                    <TextField
                      fullWidth
                      name="mscInstitution"
                      label="Institution Name"
                      value={formData.mscInstitution}
                      onChange={handleInputChange('mscInstitution')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                    <TextField
                      fullWidth
                      name="mscSubject"
                      label="Subject"
                      value={formData.mscSubject}
                      onChange={handleInputChange('mscSubject')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      fullWidth
                      name="mscResult"
                      label="Result (CGPA/Grade)"
                      value={formData.mscResult}
                      onChange={handleInputChange('mscResult')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                    <TextField
                      fullWidth
                      name="mscPassingYear"
                      label="Passing Year"
                      value={formData.mscPassingYear}
                      onChange={handleInputChange('mscPassingYear')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                  </Box>
                </Box>

                {/* BSC */}
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                    BSC (Bachelor of Science)
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                      fullWidth
                      name="bscInstitution"
                      label="Institution Name"
                      value={formData.bscInstitution}
                      onChange={handleInputChange('bscInstitution')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                    <TextField
                      fullWidth
                      name="bscSubject"
                      label="Subject"
                      value={formData.bscSubject}
                      onChange={handleInputChange('bscSubject')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      fullWidth
                      name="bscResult"
                      label="Result (CGPA/Grade)"
                      value={formData.bscResult}
                      onChange={handleInputChange('bscResult')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                    <TextField
                      fullWidth
                      name="bscPassingYear"
                      label="Passing Year"
                      value={formData.bscPassingYear}
                      onChange={handleInputChange('bscPassingYear')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                  </Box>
                </Box>

                {/* HSC */}
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                    HSC (Higher Secondary Certificate)
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                      fullWidth
                      name="hscInstitution"
                      label="Institution Name"
                      value={formData.hscInstitution}
                      onChange={handleInputChange('hscInstitution')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                    <TextField
                      fullWidth
                      name="hscGroup"
                      label="Group (Science/Commerce/Arts)"
                      value={formData.hscGroup}
                      onChange={handleInputChange('hscGroup')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      fullWidth
                      name="hscResult"
                      label="Result (GPA)"
                      value={formData.hscResult}
                      onChange={handleInputChange('hscResult')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                    <TextField
                      fullWidth
                      name="hscPassingYear"
                      label="Passing Year"
                      value={formData.hscPassingYear}
                      onChange={handleInputChange('hscPassingYear')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                  </Box>
                </Box>

                {/* SSC */}
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                    SSC (Secondary School Certificate)
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                      fullWidth
                      name="sscInstitution"
                      label="Institution Name"
                      value={formData.sscInstitution}
                      onChange={handleInputChange('sscInstitution')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                    <TextField
                      fullWidth
                      name="sscGroup"
                      label="Group (Science/Commerce/Arts)"
                      value={formData.sscGroup}
                      onChange={handleInputChange('sscGroup')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      fullWidth
                      name="sscResult"
                      label="Result (GPA)"
                      value={formData.sscResult}
                      onChange={handleInputChange('sscResult')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                    <TextField
                      fullWidth
                      name="sscPassingYear"
                      label="Passing Year"
                      value={formData.sscPassingYear}
                      onChange={handleInputChange('sscPassingYear')}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
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
                    document={formData.mscDocument}
                    onUpload={handleFileUpload('mscDocument')}
                    onPreview={handlePreview}
                    color="primary"
                  />

                  {/* BSC Document */}
                  <DocumentUploadCard
                    title="BSC Certificate"
                    document={formData.bscDocument}
                    onUpload={handleFileUpload('bscDocument')}
                    onPreview={handlePreview}
                    color="info"
                  />

                  {/* HSC Document */}
                  <DocumentUploadCard
                    title="HSC Certificate"
                    document={formData.hscDocument}
                    onUpload={handleFileUpload('hscDocument')}
                    onPreview={handlePreview}
                    color="warning"
                  />

                  {/* SSC Document */}
                  <DocumentUploadCard
                    title="SSC Certificate"
                    document={formData.sscDocument}
                    onUpload={handleFileUpload('sscDocument')}
                    onPreview={handlePreview}
                    color="error"
                  />

                  {/* Passport Document */}
                  <DocumentUploadCard
                    title="Passport"
                    document={formData.passportDocument}
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
                onClick={handleSubmit}
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
