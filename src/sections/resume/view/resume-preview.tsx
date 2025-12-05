import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github?: string;
  website: string;
  summary: string;
  jobTitle?: string;
  profilePicture?: string;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    gpa: string;
  }>;
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
    liveUrl: string;
    githubRepo: string;
  }>;
  references?: Array<{
    name: string;
    designation: string;
    companyName: string;
    phone: string;
  }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
  volunteerWork?: Array<{
    organization: string;
    role: string;
    date: string;
    description: string;
  }>;
}

interface ResumePreviewProps {
  data: ResumeData;
  template?: 'default' | 'template1';
}

// ----------------------------------------------------------------------

export function ResumePreview({ data, template = 'default' }: ResumePreviewProps) {
  if (template === 'template1') {
    return <Template1 data={data} />;
  }
  
  return <DefaultTemplate data={data} />;
}

// ----------------------------------------------------------------------

function DefaultTemplate({ data }: { data: ResumeData }) {
  return (
    <Box
      id="resume-preview"
      sx={{
        bgcolor: 'background.paper',
        p: 4,
        minHeight: '800px',
        fontFamily: 'Arial, sans-serif',
        '@media print': {
          p: 3,
        },
      }}
    >
      {/* Header Section with Profile Picture */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3, gap: 3 }}>
        {data.profilePicture && (
          <Avatar
            src={data.profilePicture}
            alt={data.fullName}
            sx={{
              width: 100,
              height: 100,
              border: '2px solid',
              borderColor: 'divider',
            }}
          />
        )}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              mb: 0.5,
              color: 'text.primary',
              fontSize: '1.75rem',
              letterSpacing: '0.5px',
            }}
          >
            {data.fullName || 'Your Name'}
          </Typography>
          {data.jobTitle && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 1.5,
                color: 'text.secondary',
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              {data.jobTitle}
            </Typography>
          )}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              fontSize: '0.875rem',
              color: 'text.secondary',
              alignItems: 'center',
            }}
          >
            {data.email && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Iconify icon="solar:letter-bold" width={16} />
                <span>{data.email}</span>
              </Box>
            )}
            {data.phone && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Iconify icon="solar:phone-bold" width={16} />
                <span>{data.phone}</span>
              </Box>
            )}
            {data.address && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Iconify icon="solar:map-point-bold" width={16} />
                <span>{data.address}</span>
              </Box>
            )}
          </Box>
          {(data.linkedin || data.website) && (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                fontSize: '0.875rem',
                color: 'text.secondary',
                mt: 1,
                alignItems: 'center',
              }}
            >
              {data.linkedin && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Iconify icon="mdi:linkedin" width={16} />
                  <Link href={data.linkedin} target="_blank" rel="noopener" sx={{ color: 'inherit', textDecoration: 'none' }}>
                    LinkedIn
                  </Link>
                </Box>
              )}
              {data.website && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Iconify icon="solar:global-bold" width={16} />
                  <Link href={data.website} target="_blank" rel="noopener" sx={{ color: 'inherit', textDecoration: 'none' }}>
                    Website
                  </Link>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>

      <Divider sx={{ my: 2.5, borderWidth: 1 }} />

      {/* Professional Summary */}
      {data.summary && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              mb: 1,
              color: 'primary.main',
              textTransform: 'uppercase',
              fontSize: '0.95rem',
              letterSpacing: '0.5px',
            }}
          >
            Professional Summary
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.7, color: 'text.secondary', fontSize: '0.9rem' }}>
            {data.summary}
          </Typography>
        </Box>
      )}

      {/* Experience Section - Two Column Layout */}
      {data.experience && data.experience.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: 'text.primary',
              textTransform: 'uppercase',
              fontSize: '0.95rem',
              letterSpacing: '0.5px',
            }}
          >
            Work Experience
          </Typography>
          {data.experience.map((exp, index) => (
            <Box key={index} sx={{ mb: 2.5 }}>
              <Grid container spacing={2}>
                {/* Left Column - Dates and Company */}
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Box>
                    {(exp.startDate || exp.endDate) && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.85rem',
                          mb: 0.5,
                          fontWeight: 500,
                        }}
                      >
                        {exp.startDate && exp.endDate
                          ? `${exp.startDate} - ${exp.endDate}`
                          : exp.startDate || exp.endDate}
                      </Typography>
                    )}
                    {exp.company && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                        }}
                      >
                        {exp.company}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                {/* Right Column - Title and Description */}
                <Grid size={{ xs: 12, sm: 9 }}>
                  <Box>
                    {exp.title && (
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 'bold',
                          mb: 0.5,
                          fontSize: '1rem',
                          color: 'text.primary',
                        }}
                      >
                        {exp.title}
                      </Typography>
                    )}
                    {exp.description && (
                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: 1.7,
                          color: 'text.secondary',
                          fontSize: '0.9rem',
                          mt: 0.5,
                        }}
                      >
                        {exp.description}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
              {index < data.experience.length - 1 && <Divider sx={{ mt: 2, borderWidth: 0.5 }} />}
            </Box>
          ))}
        </Box>
      )}

      {/* Education Section - Two Column Layout */}
      {data.education && data.education.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: 'text.primary',
              textTransform: 'uppercase',
              fontSize: '0.95rem',
              letterSpacing: '0.5px',
            }}
          >
            Education
          </Typography>
          {data.education.map((edu, index) => (
            <Box key={index} sx={{ mb: 2.5 }}>
              <Grid container spacing={2}>
                {/* Left Column - Year and Institution */}
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Box>
                    {edu.year && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.85rem',
                          mb: 0.5,
                          fontWeight: 500,
                        }}
                      >
                        {edu.year}
                      </Typography>
                    )}
                    {edu.institution && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                        }}
                      >
                        {edu.institution}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                {/* Right Column - Degree and GPA */}
                <Grid size={{ xs: 12, sm: 9 }}>
                  <Box>
                    {edu.degree && (
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 'bold',
                          mb: 0.5,
                          fontSize: '1rem',
                          color: 'text.primary',
                        }}
                      >
                        {edu.degree}
                      </Typography>
                    )}
                    {edu.gpa && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.9rem',
                        }}
                      >
                        GPA: {edu.gpa}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
              {index < data.education.length - 1 && <Divider sx={{ mt: 2, borderWidth: 0.5 }} />}
            </Box>
          ))}
        </Box>
      )}

      {/* Certifications Section - Two Column Layout */}
      {data.certifications && data.certifications.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: 'primary.main',
              textTransform: 'uppercase',
              fontSize: '0.95rem',
              letterSpacing: '0.5px',
            }}
          >
            Certifications
          </Typography>
          {data.certifications.map((cert, index) => (
            <Box key={index} sx={{ mb: 2.5 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                    }}
                  >
                    {cert.date}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 9 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 'bold',
                      mb: 0.5,
                      fontSize: '1rem',
                      color: 'text.primary',
                    }}
                  >
                    {cert.name}
                  </Typography>
                  {cert.issuer && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.9rem',
                      }}
                    >
                      {cert.issuer}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              {data.certifications && index < data.certifications.length - 1 && <Divider sx={{ mt: 2, borderWidth: 0.5 }} />}
            </Box>
          ))}
        </Box>
      )}

      {/* Volunteer Work Section - Two Column Layout */}
      {data.volunteerWork && data.volunteerWork.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: 'primary.main',
              textTransform: 'uppercase',
              fontSize: '0.95rem',
              letterSpacing: '0.5px',
            }}
          >
            Volunteer Work
          </Typography>
          {data.volunteerWork.map((vol, index) => (
            <Box key={index} sx={{ mb: 2.5 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Box>
                    {vol.date && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.85rem',
                          mb: 0.5,
                          fontWeight: 500,
                        }}
                      >
                        {vol.date}
                      </Typography>
                    )}
                    {vol.organization && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                        }}
                      >
                        {vol.organization}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 9 }}>
                  <Box>
                    {vol.role && (
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 'bold',
                          mb: 0.5,
                          fontSize: '1rem',
                          color: 'text.primary',
                        }}
                      >
                        {vol.role}
                      </Typography>
                    )}
                    {vol.description && (
                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: 1.7,
                          color: 'text.secondary',
                          fontSize: '0.9rem',
                          mt: 0.5,
                        }}
                      >
                        {vol.description}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
              {data.volunteerWork && index < data.volunteerWork.length - 1 && <Divider sx={{ mt: 2, borderWidth: 0.5 }} />}
            </Box>
          ))}
        </Box>
      )}

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              mb: 1.5,
              color: 'text.primary',
              textTransform: 'uppercase',
              fontSize: '0.95rem',
              letterSpacing: '0.5px',
            }}
          >
            Skills
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {data.skills.map((skill, index) => (
              <Box
                key={index}
                sx={{
                  bgcolor: 'grey.300',
                  color: 'text.primary',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: '0.875rem',
                }}
              >
                {skill}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              mb: 1.5,
              color: 'text.primary',
              textTransform: 'uppercase',
              fontSize: '0.95rem',
              letterSpacing: '0.5px',
            }}
          >
            Projects
          </Typography>
          {data.projects.map((project, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 'bold',
                  mb: 0.5,
                  fontSize: '1rem',
                  color: 'text.primary',
                }}
              >
                {project.name || 'Project Name'}
              </Typography>
              {project.description && (
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1.7,
                    color: 'text.secondary',
                    mt: 0.5,
                    fontSize: '0.9rem',
                  }}
                >
                  {project.description}
                </Typography>
              )}
              {project.technologies && (
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    mt: 0.5,
                    fontSize: '0.9rem',
                    fontStyle: 'italic',
                  }}
                >
                  Technologies: {project.technologies}
                </Typography>
              )}
              {(project.liveUrl || project.githubRepo) && (
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    mt: 1,
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  }}
                >
                  {project.liveUrl && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Iconify icon="solar:global-bold" width={16} />
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener"
                        sx={{ fontSize: '0.875rem', color: 'primary.main' }}
                      >
                        Live Demo
                      </Link>
                    </Box>
                  )}
                  {project.githubRepo && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Iconify icon="mdi:github" width={16} />
                      <Link
                        href={project.githubRepo}
                        target="_blank"
                        rel="noopener"
                        sx={{ fontSize: '0.875rem', color: 'primary.main' }}
                      >
                        GitHub Repo
                      </Link>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* References Section */}
      {data.references && data.references.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: 'text.primary',
              textTransform: 'uppercase',
              fontSize: '0.95rem',
              letterSpacing: '0.5px',
            }}
          >
            References
          </Typography>
          {data.references.map((ref, index) => (
            <Box key={index} sx={{ mb: 2.5 }}>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 'bold',
                    mb: 0.5,
                    fontSize: '1rem',
                    color: 'text.primary',
                  }}
                >
                  {ref.name}
                </Typography>
                {ref.phone && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                    <Iconify icon="solar:phone-bold" width={16} />
                    <Typography variant="body2" sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>
                      {ref.phone}
                    </Typography>
                  </Box>
                )}
                {ref.designation && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.9rem',
                      mb: 0.5,
                    }}
                  >
                    {ref.designation}
                  </Typography>
                )}
                {ref.companyName && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.9rem',
                    }}
                  >
                    {ref.companyName}
                  </Typography>
                )}
              </Box>
              {data.references && index < data.references.length - 1 && <Divider sx={{ mt: 2, borderWidth: 0.5 }} />}
            </Box>
          ))}
        </Box>
      )}

      {/* Empty State */}
      {!data.fullName &&
        !data.summary &&
        (!data.education || data.education.length === 0) &&
        (!data.experience || data.experience.length === 0) &&
        (!data.skills || data.skills.length === 0) &&
        (!data.projects || data.projects.length === 0) && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px',
              color: 'text.secondary',
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Start Building Your Resume
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              Fill out the form on the left to see your resume preview here
            </Typography>
          </Box>
        )}
    </Box>
  );
}

// ----------------------------------------------------------------------

function Template1({ data }: { data: ResumeData }) {
  return (
    <Box
      id="resume-preview"
      sx={{
        bgcolor: 'background.paper',
        p: 4,
        minHeight: '800px',
        fontFamily: 'Arial, sans-serif',
        '@media print': {
          p: 3,
        },
      }}
    >
      {/* Header Section - Centered Image, Name, Job Title */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        {data.profilePicture && (
          <Avatar
            src={data.profilePicture}
            alt={data.fullName}
            sx={{
              width: 120,
              height: 120,
              border: '2px solid',
              borderColor: 'divider',
              mb: 2,
            }}
          />
        )}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            mb: 0.5,
            color: 'text.primary',
            fontSize: '1.75rem',
            letterSpacing: '0.5px',
            textAlign: 'center',
          }}
        >
          {data.fullName || 'Your Name'}
        </Typography>
        {data.jobTitle && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: 'text.secondary',
              fontSize: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              textAlign: 'center',
            }}
          >
            {data.jobTitle}
          </Typography>
        )}
        
        {/* Contact Info Row - Full Width, Left to Right */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            fontSize: '0.875rem',
            color: 'text.secondary',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'flex-start',
          }}
        >
          {data.email && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Iconify icon="solar:letter-bold" width={16} />
              <span>{data.email}</span>
            </Box>
          )}
          {data.phone && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Iconify icon="solar:phone-bold" width={16} />
              <span>{data.phone}</span>
            </Box>
          )}
          {data.address && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Iconify icon="solar:map-point-bold" width={16} />
              <span>{data.address}</span>
            </Box>
          )}
          {data.linkedin && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Iconify icon="mdi:linkedin" width={16} />
              <Link href={data.linkedin} target="_blank" rel="noopener" sx={{ color: 'inherit', textDecoration: 'none' }}>
                LinkedIn
              </Link>
            </Box>
          )}
          {data.website && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Iconify icon="solar:global-bold" width={16} />
              <Link href={data.website} target="_blank" rel="noopener" sx={{ color: 'inherit', textDecoration: 'none' }}>
                Website
              </Link>
            </Box>
          )}
          {data.github && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Iconify icon="mdi:github" width={16} />
              <Link href={data.github} target="_blank" rel="noopener" sx={{ color: 'inherit', textDecoration: 'none' }}>
                GitHub
              </Link>
            </Box>
          )}
        </Box>
      </Box>

      <Divider sx={{ my: 2.5, borderWidth: 1 }} />

      {/* Professional Summary */}
      {data.summary && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              mb: 1,
              color: 'primary.main',
              textTransform: 'uppercase',
              fontSize: '0.95rem',
              letterSpacing: '0.5px',
            }}
          >
            Professional Summary
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.7, color: 'text.secondary', fontSize: '0.9rem' }}>
            {data.summary}
          </Typography>
        </Box>
      )}

      {/* Two Column Layout: Left (Works, Education, Skills) | Right (Projects) */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>
        {/* Left Column - Works, Education, Skills */}
        <Box sx={{ flex: 1, width: { xs: '100%', md: 'auto' } }}>
          {/* Work Experience */}
          {data.experience && data.experience.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  color: 'text.primary',
                  textTransform: 'uppercase',
                  fontSize: '0.95rem',
                  letterSpacing: '0.5px',
                }}
              >
                Work Experience
              </Typography>
              {data.experience.map((exp, index) => (
                <Box key={index} sx={{ mb: 2.5 }}>
                  {exp.title && (
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 'bold',
                        mb: 0.5,
                        fontSize: '1rem',
                        color: 'text.primary',
                      }}
                    >
                      {exp.title}
                    </Typography>
                  )}
                  {exp.company && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.85rem',
                        mb: 0.5,
                        fontWeight: 500,
                      }}
                    >
                      {exp.company}
                    </Typography>
                  )}
                  {(exp.startDate || exp.endDate) && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.85rem',
                        mb: 1,
                        fontWeight: 500,
                      }}
                    >
                      {exp.startDate && exp.endDate
                        ? `${exp.startDate} - ${exp.endDate}`
                        : exp.startDate || exp.endDate}
                    </Typography>
                  )}
                  {exp.description && (
                    <Typography
                      variant="body2"
                      sx={{
                        lineHeight: 1.7,
                        color: 'text.secondary',
                        fontSize: '0.9rem',
                        mt: 0.5,
                      }}
                    >
                      {exp.description}
                    </Typography>
                  )}
                  {index < data.experience.length - 1 && <Divider sx={{ mt: 2, borderWidth: 0.5 }} />}
                </Box>
              ))}
            </Box>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  color: 'text.primary',
                  textTransform: 'uppercase',
                  fontSize: '0.95rem',
                  letterSpacing: '0.5px',
                }}
              >
                Education
              </Typography>
              {data.education.map((edu, index) => (
                <Box key={index} sx={{ mb: 2.5 }}>
                  {edu.degree && (
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 'bold',
                        mb: 0.5,
                        fontSize: '1rem',
                        color: 'text.primary',
                      }}
                    >
                      {edu.degree}
                    </Typography>
                  )}
                  {edu.institution && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.85rem',
                        mb: 0.5,
                        fontWeight: 500,
                      }}
                    >
                      {edu.institution}
                    </Typography>
                  )}
                  {edu.year && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.85rem',
                        mb: 0.5,
                        fontWeight: 500,
                      }}
                    >
                      {edu.year}
                    </Typography>
                  )}
                  {edu.gpa && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.9rem',
                      }}
                    >
                      GPA: {edu.gpa}
                    </Typography>
                  )}
                  {index < data.education.length - 1 && <Divider sx={{ mt: 2, borderWidth: 0.5 }} />}
                </Box>
              ))}
            </Box>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  mb: 1.5,
                  color: 'text.primary',
                  textTransform: 'uppercase',
                  fontSize: '0.95rem',
                  letterSpacing: '0.5px',
                }}
              >
                Skills
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {data.skills.map((skill, index) => (
                  <Box
                    key={index}
                    sx={{
                      bgcolor: 'grey.300',
                      color: 'text.primary',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.875rem',
                    }}
                  >
                    {skill}
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {/* Vertical/Horizontal Divider */}
        <Divider 
          orientation="vertical" 
          flexItem 
          sx={{ 
            borderWidth: 1,
            display: { xs: 'none', md: 'block' }
          }} 
        />
        <Divider 
          sx={{ 
            borderWidth: 1,
            display: { xs: 'block', md: 'none' },
            my: 2
          }} 
        />

        {/* Right Column - Projects */}
        <Box sx={{ flex: 1, width: { xs: '100%', md: 'auto' } }}>
          {data.projects && data.projects.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  mb: 1.5,
                  color: 'text.primary',
                  textTransform: 'uppercase',
                  fontSize: '0.95rem',
                  letterSpacing: '0.5px',
                }}
              >
                Projects
              </Typography>
              {data.projects.map((project, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 'bold',
                      mb: 0.5,
                      fontSize: '1rem',
                      color: 'text.primary',
                    }}
                  >
                    {project.name || 'Project Name'}
                  </Typography>
                  {project.description && (
                    <Typography
                      variant="body2"
                      sx={{
                        lineHeight: 1.7,
                        color: 'text.secondary',
                        mt: 0.5,
                        fontSize: '0.9rem',
                      }}
                    >
                      {project.description}
                    </Typography>
                  )}
                  {project.technologies && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        mt: 0.5,
                        fontSize: '0.9rem',
                        fontStyle: 'italic',
                      }}
                    >
                      Technologies: {project.technologies}
                    </Typography>
                  )}
                  {(project.liveUrl || project.githubRepo) && (
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        mt: 1,
                        flexWrap: 'wrap',
                        alignItems: 'center',
                      }}
                    >
                      {project.liveUrl && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Iconify icon="solar:global-bold" width={16} />
                          <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener"
                            sx={{ fontSize: '0.875rem', color: 'primary.main' }}
                          >
                            Live Demo
                          </Link>
                        </Box>
                      )}
                      {project.githubRepo && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Iconify icon="mdi:github" width={16} />
                          <Link
                            href={project.githubRepo}
                            target="_blank"
                            rel="noopener"
                            sx={{ fontSize: '0.875rem', color: 'primary.main' }}
                          >
                            GitHub Repo
                          </Link>
                        </Box>
                      )}
                    </Box>
                  )}
                  {index < data.projects.length - 1 && <Divider sx={{ mt: 2, borderWidth: 0.5 }} />}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* References Section - Below the two columns */}
      {data.references && data.references.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: 'text.primary',
              textTransform: 'uppercase',
              fontSize: '0.95rem',
              letterSpacing: '0.5px',
            }}
          >
            References
          </Typography>
          {data.references.map((ref, index) => (
            <Box key={index} sx={{ mb: 2.5 }}>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 'bold',
                    mb: 0.5,
                    fontSize: '1rem',
                    color: 'text.primary',
                  }}
                >
                  {ref.name}
                </Typography>
                {ref.phone && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                    <Iconify icon="solar:phone-bold" width={16} />
                    <Typography variant="body2" sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>
                      {ref.phone}
                    </Typography>
                  </Box>
                )}
                {ref.designation && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.9rem',
                      mb: 0.5,
                    }}
                  >
                    {ref.designation}
                  </Typography>
                )}
                {ref.companyName && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.9rem',
                    }}
                  >
                    {ref.companyName}
                  </Typography>
                )}
              </Box>
              {data.references && index < data.references.length - 1 && <Divider sx={{ mt: 2, borderWidth: 0.5 }} />}
            </Box>
          ))}
        </Box>
      )}

      {/* Empty State */}
      {!data.fullName &&
        !data.summary &&
        (!data.education || data.education.length === 0) &&
        (!data.experience || data.experience.length === 0) &&
        (!data.skills || data.skills.length === 0) &&
        (!data.projects || data.projects.length === 0) && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px',
              color: 'text.secondary',
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Start Building Your Resume
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              Fill out the form on the left to see your resume preview here
            </Typography>
          </Box>
        )}
    </Box>
  );
}
