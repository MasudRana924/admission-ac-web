import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const IMAGES = [
  // Study abroad / scholarships themed images
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1470&auto=format&fit=crop', // University campus
  'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1470&auto=format&fit=crop', // Students studying
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1470&auto=format&fit=crop', // Graduation caps
];

// ----------------------------------------------------------------------

export function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <SliderContainer>
        <ImageWrapper>
          {IMAGES.map((image, index) => (
            <SlideImage
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={index === currentIndex ? 'active' : ''}
            />
          ))}
        </ImageWrapper>

        <DotsContainer>
          {IMAGES.map((_, index) => (
            <Dot
              key={index}
              className={index === currentIndex ? 'active' : ''}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </DotsContainer>
      </SliderContainer>
    </Box>
  );
}

// ----------------------------------------------------------------------

const SliderContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 400,
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    height: 500,
  },
}));

const ImageWrapper = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100%',
});

const SlideImage = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  opacity: 0,
  transition: 'opacity 1s ease-in-out',
  '&.active': {
    opacity: 1,
  },
});

const DotsContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  display: 'flex',
  gap: theme.spacing(1),
  zIndex: 2,
}));

const Dot = styled(Box)(({ theme }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    transform: 'scale(1.2)',
  },
  '&.active': {
    backgroundColor: theme.palette.primary.main,
    transform: 'scale(1.3)',
  },
}));

