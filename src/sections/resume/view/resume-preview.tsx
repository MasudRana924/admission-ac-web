import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// ----------------------------------------------------------------------

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  website: string;
  summary: string;
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
  }>;
}

interface ResumePreviewProps {
  data: ResumeData;
}

// ----------------------------------------------------------------------

export function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <Box
      id="resume-preview"
      sx={{
        bgcolor: 'background.paper',
        p: 4,
        minHeight: '800px',
        '@media print': {
          p: 3,
        },
      }}
    >
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            mb: 1,
            color: 'text.primary',
          }}
        >
          {data.fullName || 'Your Name'}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 1.5,
            fontSize: '0.875rem',
            color: 'text.secondary',
          }}
        >
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>• {data.phone}</span>}
          {data.address && <span>• {data.address}</span>}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 1.5,
            fontSize: '0.875rem',
            color: 'text.secondary',
            mt: 0.5,
          }}
        >
          {data.linkedin && (
            <span>
              LinkedIn: <a href={data.linkedin}>{data.linkedin}</a>
            </span>
          )}
          {data.website && (
            <span>
              Website: <a href={data.website}>{data.website}</a>
            </span>
          )}
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

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
              fontSize: '1rem',
            }}
          >
            Professional Summary
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6, color: 'text.secondary' }}>
            {data.summary}
          </Typography>
        </Box>
      )}

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              mb: 1.5,
              color: 'primary.main',
              textTransform: 'uppercase',
              fontSize: '1rem',
            }}
          >
            Education
          </Typography>
          {data.education.map((edu, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {edu.degree || 'Degree'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {edu.institution || 'Institution'}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  {edu.year && (
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {edu.year}
                    </Typography>
                  )}
                  {edu.gpa && (
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      GPA: {edu.gpa}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              mb: 1.5,
              color: 'primary.main',
              textTransform: 'uppercase',
              fontSize: '1rem',
            }}
          >
            Work Experience
          </Typography>
          {data.experience.map((exp, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {exp.title || 'Job Title'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {exp.company || 'Company'}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : exp.startDate || exp.endDate}
                </Typography>
              </Box>
              {exp.description && (
                <Typography variant="body2" sx={{ lineHeight: 1.6, color: 'text.secondary', mt: 0.5 }}>
                  {exp.description}
                </Typography>
              )}
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
              color: 'primary.main',
              textTransform: 'uppercase',
              fontSize: '1rem',
            }}
          >
            Skills
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {data.skills.map((skill, index) => (
              <Box
                key={index}
                sx={{
                  bgcolor: 'primary.lighter',
                  color: 'primary.darker',
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
              color: 'primary.main',
              textTransform: 'uppercase',
              fontSize: '1rem',
            }}
          >
            Projects
          </Typography>
          {data.projects.map((project, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {project.name || 'Project Name'}
              </Typography>
              {project.description && (
                <Typography variant="body2" sx={{ lineHeight: 1.6, color: 'text.secondary', mt: 0.5 }}>
                  {project.description}
                </Typography>
              )}
              {project.technologies && (
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, fontStyle: 'italic' }}>
                  Technologies: {project.technologies}
                </Typography>
              )}
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

