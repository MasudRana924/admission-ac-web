import { useState, useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Paper from '@mui/material/Paper';

import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';

import { ResumePreview } from './resume-preview';

// ----------------------------------------------------------------------

interface ResumeData {
  // Personal Information
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
  website: string;
  summary: string;
  profilePicture: string;

  // Education
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    gpa: string;
  }>;

  // Experience
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;

  // Skills
  skills: string[];

  // Projects
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
    liveUrl: string;
    githubRepo: string;
  }>;

  // References
  references: Array<{
    name: string;
    designation: string;
    companyName: string;
    phone: string;
  }>;
}

const defaultResumeData: ResumeData = {
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  address: '',
  linkedin: '',
  github: '',
  website: '',
  summary: '',
  profilePicture: '',
  education: [],
  experience: [],
  skills: [],
  projects: [],
  references: [],
};

// ----------------------------------------------------------------------

interface TemplateSelectorProps {
  selectedTemplate: 'default' | 'template1';
  onTemplateChange: (template: 'default' | 'template1') => void;
  resumeData: ResumeData;
}

// Sample data for template previews
const sampleResumeData: ResumeData = {
  fullName: 'John Doe',
  jobTitle: 'Software Engineer',
  email: 'john.doe@example.com',
  phone: '+1 234 567 8900',
  address: '123 Main St, City, State',
  linkedin: 'https://linkedin.com/in/johndoe',
  github: 'https://github.com/johndoe',
  website: 'https://johndoe.com',
  summary: 'Experienced software engineer with a passion for building scalable applications.',
  profilePicture: '',
  education: [
    { degree: 'Bachelor of Science', institution: 'University Name', year: '2020', gpa: '3.8' },
  ],
  experience: [
    { title: 'Senior Developer', company: 'Tech Company', startDate: '2021', endDate: 'Present', description: 'Led development of key features.' },
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
  projects: [
    { name: 'Project Name', description: 'Project description here', technologies: 'React, Node.js', liveUrl: '', githubRepo: '' },
  ],
  references: [
    { name: 'Jane Smith', designation: 'Manager', companyName: 'Company Name', phone: '+1 234 567 8901' },
  ],
};

function TemplateSelector({ selectedTemplate, onTemplateChange, resumeData }: TemplateSelectorProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (template: 'default' | 'template1') => {
    onTemplateChange(template);
    handleClose();
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClick}
        endIcon={<Iconify icon="solar:alt-arrow-down-bold" width={16} />}
        size="small"
      >
        {selectedTemplate === 'default' ? 'Default Template' : 'Template 1'}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth={false}
        PaperProps={{
          sx: {
            maxHeight: '90vh',
            maxWidth: '800px',
            width: '100%',
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Choose a Template</Typography>
            <IconButton onClick={handleClose} size="small">
              <Iconify icon="solar:close-circle-bold" width={24} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            overflow: 'hidden',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
          }}
        >
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {/* Default Template Preview */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                onClick={() => handleSelect('default')}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  border: selectedTemplate === 'default' ? 2 : 1,
                  borderColor: selectedTemplate === 'default' ? 'primary.main' : 'divider',
                  bgcolor: selectedTemplate === 'default' ? 'primary.lighter' : 'background.paper',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: 4,
                    bgcolor: 'action.hover',
                  },
                  transition: 'all 0.2s',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Default Template
                  </Typography>
                  {selectedTemplate === 'default' && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main' }}>
                      <Iconify icon="solar:check-circle-bold" width={20} />
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Selected</Typography>
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    position: 'relative',
                    height: '400px',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    p: 1,
                  }}
                >
                  <Box
                    sx={{
                      transform: 'scale(0.45)',
                      transformOrigin: 'top left',
                      width: '222%',
                      pointerEvents: 'none',
                    }}
                  >
                    <ResumePreview data={sampleResumeData} template="default" />
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Template 1 Preview */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                onClick={() => handleSelect('template1')}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  border: selectedTemplate === 'template1' ? 2 : 1,
                  borderColor: selectedTemplate === 'template1' ? 'primary.main' : 'divider',
                  bgcolor: selectedTemplate === 'template1' ? 'primary.lighter' : 'background.paper',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: 4,
                    bgcolor: 'action.hover',
                  },
                  transition: 'all 0.2s',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Template 1
                  </Typography>
                  {selectedTemplate === 'template1' && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main' }}>
                      <Iconify icon="solar:check-circle-bold" width={20} />
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Selected</Typography>
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    position: 'relative',
                    height: '400px',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    p: 1,
                  }}
                >
                  <Box
                    sx={{
                      transform: 'scale(0.45)',
                      transformOrigin: 'top left',
                      width: '222%',
                      pointerEvents: 'none',
                    }}
                  >
                    <ResumePreview data={sampleResumeData} template="template1" />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ----------------------------------------------------------------------

export function ResumeBuilderView() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [skillInput, setSkillInput] = useState('');
  const [profileImagePreview, setProfileImagePreview] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<'default' | 'template1'>('default');
  const [pdfPreviewRef, setPdfPreviewRef] = useState<HTMLDivElement | null>(null);

  const { control, handleSubmit, watch, setValue } = useForm<ResumeData>({
    defaultValues: defaultResumeData,
  });

  const formData = watch();

  // Update resume data when form changes
  useEffect(() => {
    setResumeData({ ...formData, profilePicture: profileImagePreview });
  }, [formData, profileImagePreview]);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileImagePreview(result);
        setValue('profilePicture', result);
      };
      reader.readAsDataURL(file);
    }
  }, [setValue]);

  const onSubmit = useCallback((data: ResumeData) => {
    setResumeData(data);
    console.log('Resume data:', data);
  }, []);

  const handleAddEducation = useCallback(() => {
    const currentEducation = formData.education || [];
    setValue('education', [
      ...currentEducation,
      { degree: '', institution: '', year: '', gpa: '' },
    ]);
  }, [formData.education, setValue]);

  const handleRemoveEducation = useCallback(
    (index: number) => {
      const currentEducation = formData.education || [];
      setValue(
        'education',
        currentEducation.filter((_, i) => i !== index)
      );
    },
    [formData.education, setValue]
  );

  const handleAddExperience = useCallback(() => {
    const currentExperience = formData.experience || [];
    setValue('experience', [
      ...currentExperience,
      { title: '', company: '', startDate: '', endDate: '', description: '' },
    ]);
  }, [formData.experience, setValue]);

  const handleRemoveExperience = useCallback(
    (index: number) => {
      const currentExperience = formData.experience || [];
      setValue(
        'experience',
        currentExperience.filter((_, i) => i !== index)
      );
    },
    [formData.experience, setValue]
  );

  const handleAddSkill = useCallback(() => {
    if (skillInput.trim()) {
      const currentSkills = formData.skills || [];
      setValue('skills', [...currentSkills, skillInput.trim()]);
      setSkillInput('');
    }
  }, [skillInput, formData.skills, setValue]);

  const handleRemoveSkill = useCallback(
    (index: number) => {
      const currentSkills = formData.skills || [];
      setValue(
        'skills',
        currentSkills.filter((_, i) => i !== index)
      );
    },
    [formData.skills, setValue]
  );

  const handleAddProject = useCallback(() => {
    const currentProjects = formData.projects || [];
    setValue('projects', [
      ...currentProjects,
      { name: '', description: '', technologies: '', liveUrl: '', githubRepo: '' },
    ]);
  }, [formData.projects, setValue]);

  const handleRemoveProject = useCallback(
    (index: number) => {
      const currentProjects = formData.projects || [];
      setValue(
        'projects',
        currentProjects.filter((_, i) => i !== index)
      );
    },
    [formData.projects, setValue]
  );

  const handleAddReference = useCallback(() => {
    const currentReferences = formData.references || [];
    setValue('references', [
      ...currentReferences,
      { name: '', designation: '', companyName: '', phone: '' },
    ]);
  }, [formData.references, setValue]);

  const handleRemoveReference = useCallback(
    (index: number) => {
      const currentReferences = formData.references || [];
      setValue(
        'references',
        currentReferences.filter((_, i) => i !== index)
      );
    },
    [formData.references, setValue]
  );

  const handleDownloadPDF = useCallback(async () => {
    // Try to use hidden element first, fallback to visible
    let element = pdfPreviewRef?.querySelector('#resume-preview') as HTMLElement;
    let isHidden = false;
    let originalStyles: { width: string; maxWidth: string; minWidth: string; padding: string } | null = null;
    
    if (element && pdfPreviewRef) {
      // Temporarily make hidden element visible for html2canvas
      pdfPreviewRef.style.visibility = 'visible';
      pdfPreviewRef.style.position = 'fixed';
      pdfPreviewRef.style.left = '0';
      pdfPreviewRef.style.top = '0';
      pdfPreviewRef.style.zIndex = '-1';
      isHidden = true;
      // Wait for element to be ready
      await new Promise(resolve => setTimeout(resolve, 300));
    } else {
      // Fallback to visible element
      element = document.getElementById('resume-preview') as HTMLElement;
      if (!element) return;

      // Store original styles
      originalStyles = {
        width: element.style.width,
        maxWidth: element.style.maxWidth,
        minWidth: element.style.minWidth,
        padding: element.style.padding,
      };

      // Temporarily make element large for PDF generation
      element.style.width = '800px';
      element.style.maxWidth = '800px';
      element.style.minWidth = '800px';
      element.style.padding = '32px';

      // Wait for styles to apply
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    try {
      // Create canvas from the element
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 800,
      });

      const imgData = canvas.toDataURL('image/png');

      // Calculate PDF dimensions (A4 size)
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if content is longer than one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Generate filename from user's name or default
      const fileName = resumeData.fullName
        ? `${resumeData.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';

      // Direct download without preview - use output method
      const pdfBlob = pdf.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Restore styles
      if (isHidden && pdfPreviewRef) {
        pdfPreviewRef.style.visibility = 'hidden';
        pdfPreviewRef.style.position = 'absolute';
        pdfPreviewRef.style.left = '-9999px';
        pdfPreviewRef.style.top = '0';
        pdfPreviewRef.style.zIndex = '';
      } else if (originalStyles && element) {
        element.style.width = originalStyles.width;
        element.style.maxWidth = originalStyles.maxWidth;
        element.style.minWidth = originalStyles.minWidth;
        element.style.padding = originalStyles.padding;
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Restore styles on error
      if (isHidden && pdfPreviewRef) {
        pdfPreviewRef.style.visibility = 'hidden';
        pdfPreviewRef.style.position = 'absolute';
        pdfPreviewRef.style.left = '-9999px';
        pdfPreviewRef.style.top = '0';
        pdfPreviewRef.style.zIndex = '';
      } else if (originalStyles && element) {
        element.style.width = originalStyles.width;
        element.style.maxWidth = originalStyles.maxWidth;
        element.style.minWidth = originalStyles.minWidth;
        element.style.padding = originalStyles.padding;
      }
      // Show error message instead of opening print dialog
      alert('Failed to generate PDF. Please try again.');
    }
  }, [resumeData.fullName, selectedTemplate, pdfPreviewRef]);

  return (
    <DashboardContent 
      maxWidth={false}
      sx={{
        px: { xs: 2, md: 3 },
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', lg: '75%' },
          mx: 'auto',
        }}
      >
        <Box sx={{ mb: 3,mt:5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">Resume Builder</Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="solar:download-bold" width={20} />}
            onClick={handleDownloadPDF}
            disabled={!resumeData.fullName}
          >
            Download PDF
          </Button>
        </Box>

        <Grid container spacing={3}>
        {/* Form Section */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card
            sx={{
              p: 3,
              position: 'sticky',
              top: 24,
              maxHeight: 'calc(100vh - 100px)',
              overflow: 'auto',
              // Hide scrollbar but keep scroll functionality
              scrollbarWidth: 'none', // Firefox
              '&::-webkit-scrollbar': {
                display: 'none', // Chrome, Safari, Edge
              },
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Personal Information */}
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" width={20} />}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Personal Information
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                        Profile Picture
                      </Typography>
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="profile-picture-upload"
                        type="file"
                        onChange={handleImageUpload}
                      />
                      <label htmlFor="profile-picture-upload">
                        <Button
                          variant="outlined"
                          component="span"
                          fullWidth
                          startIcon={<Iconify icon="solar:gallery-bold" width={20} />}
                        >
                          Upload Profile Picture
                        </Button>
                      </label>
                      {profileImagePreview && (
                        <Box
                          component="img"
                          src={profileImagePreview}
                          alt="Profile preview"
                          sx={{
                            mt: 2,
                            width: '100%',
                            maxWidth: 200,
                            height: 'auto',
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'divider',
                          }}
                        />
                      )}
                    </Box>
                    <Controller
                      name="fullName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Full Name"
                          onChange={field.onChange}
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                      )}
                    />
                    <Controller
                      name="jobTitle"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Job Title / Position"
                          placeholder="e.g., BUSINESS CONSULTANT"
                          onChange={field.onChange}
                          slotProps={{ inputLabel: { shrink: true } }}
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
                          onChange={field.onChange}
                          slotProps={{ inputLabel: { shrink: true } }}
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
                          onChange={field.onChange}
                          slotProps={{ inputLabel: { shrink: true } }}
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
                          onChange={field.onChange}
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                      )}
                    />
                    <Controller
                      name="linkedin"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="LinkedIn"
                          onChange={field.onChange}
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                      )}
                    />
                    <Controller
                      name="github"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="GitHub"
                          onChange={field.onChange}
                          slotProps={{ inputLabel: { shrink: true } }}
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
                          onChange={field.onChange}
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                      )}
                    />
                    <Controller
                      name="summary"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Professional Summary"
                          multiline
                          rows={4}
                          onChange={field.onChange}
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                      )}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* Education */}
              <Accordion>
                <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" width={20} />}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Education
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {(formData.education || []).map((edu, index) => (
                      <Card key={index} sx={{ p: 2, bgcolor: 'background.neutral' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle2">Education #{index + 1}</Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveEducation(index)}
                            color="error"
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={18} />
                          </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                          <Controller
                            name={`education.${index}.degree`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                size="small"
                                label="Degree"
                                onChange={field.onChange}
                                slotProps={{ inputLabel: { shrink: true } }}
                              />
                            )}
                          />
                          <Controller
                            name={`education.${index}.institution`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                size="small"
                                label="Institution"
                                onChange={field.onChange}
                                slotProps={{ inputLabel: { shrink: true } }}
                              />
                            )}
                          />
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Controller
                              name={`education.${index}.year`}
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  size="small"
                                  label="Year"
                                  onChange={field.onChange}
                                  slotProps={{ inputLabel: { shrink: true } }}
                                />
                              )}
                            />
                            <Controller
                              name={`education.${index}.gpa`}
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  size="small"
                                  label="GPA/CGPA"
                                  onChange={field.onChange}
                                  slotProps={{ inputLabel: { shrink: true } }}
                                />
                              )}
                            />
                          </Box>
                        </Box>
                      </Card>
                    ))}
                    <Button
                      variant="outlined"
                      startIcon={<Iconify icon="solar:add-circle-bold" width={20} />}
                      onClick={handleAddEducation}
                    >
                      Add Education
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* Experience */}
              <Accordion>
                <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" width={20} />}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Work Experience
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {(formData.experience || []).map((exp, index) => (
                      <Card key={index} sx={{ p: 2, bgcolor: 'background.neutral' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle2">Experience #{index + 1}</Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveExperience(index)}
                            color="error"
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={18} />
                          </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                          <Controller
                            name={`experience.${index}.title`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                size="small"
                                label="Job Title"
                                onChange={field.onChange}
                                slotProps={{ inputLabel: { shrink: true } }}
                              />
                            )}
                          />
                          <Controller
                            name={`experience.${index}.company`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                size="small"
                                label="Company"
                                onChange={field.onChange}
                                slotProps={{ inputLabel: { shrink: true } }}
                              />
                            )}
                          />
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Controller
                              name={`experience.${index}.startDate`}
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  size="small"
                                  label="Start Date"
                                  placeholder="MM/YYYY"
                                  onChange={field.onChange}
                                  slotProps={{ inputLabel: { shrink: true } }}
                                />
                              )}
                            />
                            <Controller
                              name={`experience.${index}.endDate`}
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  size="small"
                                  label="End Date"
                                  placeholder="MM/YYYY or Present"
                                  onChange={field.onChange}
                                  slotProps={{ inputLabel: { shrink: true } }}
                                />
                              )}
                            />
                          </Box>
                          <Controller
                            name={`experience.${index}.description`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                size="small"
                                label="Description"
                                multiline
                                rows={3}
                                onChange={field.onChange}
                                slotProps={{ inputLabel: { shrink: true } }}
                              />
                            )}
                          />
                        </Box>
                      </Card>
                    ))}
                    <Button
                      variant="outlined"
                      startIcon={<Iconify icon="solar:add-circle-bold" width={20} />}
                      onClick={handleAddExperience}
                    >
                      Add Experience
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* Skills */}
              <Accordion>
                <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" width={20} />}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Skills
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Add a skill"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill();
                          }
                        }}
                        slotProps={{ inputLabel: { shrink: true } }}
                      />
                      <Button variant="outlined" onClick={handleAddSkill}>
                        Add
                      </Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {(formData.skills || []).map((skill, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            bgcolor: 'primary.lighter',
                            color: 'primary.darker',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                          }}
                        >
                          <Typography variant="body2">{skill}</Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveSkill(index)}
                            sx={{ p: 0, width: 20, height: 20 }}
                          >
                            <Iconify icon="solar:close-circle-bold" width={14} />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* Projects */}
              <Accordion>
                <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" width={20} />}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Projects
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {(formData.projects || []).map((project, index) => (
                      <Card key={index} sx={{ p: 2, bgcolor: 'background.neutral' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle2">Project #{index + 1}</Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveProject(index)}
                            color="error"
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={18} />
                          </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                          <Controller
                            name={`projects.${index}.name`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                size="small"
                                label="Project Name"
                                onChange={field.onChange}
                                slotProps={{ inputLabel: { shrink: true } }}
                              />
                            )}
                          />
                          <Controller
                            name={`projects.${index}.description`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                size="small"
                                label="Description"
                                multiline
                                rows={2}
                                onChange={field.onChange}
                                slotProps={{ inputLabel: { shrink: true } }}
                              />
                            )}
                          />
                          <Controller
                            name={`projects.${index}.technologies`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                size="small"
                                label="Technologies"
                                onChange={field.onChange}
                                slotProps={{ inputLabel: { shrink: true } }}
                              />
                            )}
                          />
                          <Controller
                            name={`projects.${index}.liveUrl`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                size="small"
                                label="Live URL"
                                placeholder="https://example.com"
                                onChange={field.onChange}
                                slotProps={{ inputLabel: { shrink: true } }}
                              />
                            )}
                          />
                          <Controller
                            name={`projects.${index}.githubRepo`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                size="small"
                                label="GitHub Repository"
                                placeholder="https://github.com/username/repo"
                                onChange={field.onChange}
                                slotProps={{ inputLabel: { shrink: true } }}
                              />
                            )}
                          />
                        </Box>
                      </Card>
                    ))}
                    <Button
                      variant="outlined"
                      startIcon={<Iconify icon="solar:add-circle-bold" width={20} />}
                      onClick={handleAddProject}
                    >
                      Add Project
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* References */}
              <Accordion>
                <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" width={20} />}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    References
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {(formData.references || []).map((ref, index) => (
                      <Card key={index} sx={{ p: 2, bgcolor: 'background.neutral' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle2">Reference #{index + 1}</Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveReference(index)}
                            color="error"
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={18} />
                          </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                          <Controller
                            name={`references.${index}.name`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                size="small"
                                label="Name"
                                onChange={field.onChange}
                                slotProps={{ inputLabel: { shrink: true } }}
                              />
                            )}
                          />
                          <Controller
                            name={`references.${index}.designation`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                size="small"
                                label="Designation"
                                onChange={field.onChange}
                                slotProps={{ inputLabel: { shrink: true } }}
                              />
                            )}
                          />
                          <Controller
                            name={`references.${index}.companyName`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                size="small"
                                label="Company Name"
                                onChange={field.onChange}
                                slotProps={{ inputLabel: { shrink: true } }}
                              />
                            )}
                          />
                          <Controller
                            name={`references.${index}.phone`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                size="small"
                                label="Phone"
                                onChange={field.onChange}
                                slotProps={{ inputLabel: { shrink: true } }}
                              />
                            )}
                          />
                        </Box>
                      </Card>
                    ))}
                    <Button
                      variant="outlined"
                      startIcon={<Iconify icon="solar:add-circle-bold" width={20} />}
                      onClick={handleAddReference}
                    >
                      Add Reference
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </form>
          </Card>
        </Grid>

        {/* Preview Section */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ p: 3, position: 'sticky', top: 24 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Preview
              </Typography>
              <TemplateSelector 
                selectedTemplate={selectedTemplate} 
                onTemplateChange={setSelectedTemplate}
                resumeData={resumeData}
              />
            </Box>
            <ResumePreview data={resumeData} template={selectedTemplate} />
          </Card>
        </Grid>
      </Grid>
      
      {/* Hidden PDF Preview - Always large size for PDF generation */}
      <Box
        ref={setPdfPreviewRef}
        sx={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          width: '800px',
          visibility: 'hidden',
          pointerEvents: 'none',
          '& #resume-preview': {
            width: '800px !important',
            maxWidth: '800px !important',
            minWidth: '800px !important',
            padding: '32px !important',
            fontSize: '14px !important',
          },
        }}
      >
        <ResumePreview data={resumeData} template={selectedTemplate} />
      </Box>
      </Box>
    </DashboardContent>
  );
}

