import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

// ----------------------------------------------------------------------

export function UserProfileCard() {
  return (
    <Box
      sx={{
        p: 3,
        minHeight: 180,
        borderRadius: 2,
        bgcolor: 'background.neutral',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Avatar
          src="/assets/images/avatar/avatar-1.webp"
          alt="User Avatar"
          sx={{ width: 56, height: 56 }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            John Doe
          </Typography>
        </Box>
      </Box>

      <Box>
        <LinearProgress
          variant="determinate"
          value={75}
          sx={{
            height: 8,
            borderRadius: 1,
            mb: 1,
            bgcolor: 'action.hover',
            '& .MuiLinearProgress-bar': {
              borderRadius: 1,
            },
          }}
        />
        <Typography variant="caption" color="text.secondary">
          75% profile updated
        </Typography>
      </Box>
    </Box>
  );
}

