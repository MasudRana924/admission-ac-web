import { useState, useEffect, useRef } from 'react';

import axios from 'axios';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { BackButton } from 'src/components/back-button';

// ----------------------------------------------------------------------

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export default function AdvisorChatView() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<HTMLDivElement>(null);

  const API_KEY = 'AIzaSyDwvW_TkIEr5jQzw5zHNvK5qyAVo5rHWG0';
  const API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  // Auto welcome message when screen loads
  useEffect(() => {
    const welcomeMessage: Message = {
      role: 'bot',
      text: '👋 Welcome to admission.ac! How may we help you?',
    };
    setMessages([welcomeMessage]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
          contents: [{ role: 'user', parts: [{ text: input }] }],
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const reply =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

      const botMessage: Message = { role: 'bot', text: reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: '⚠️ Error fetching response!' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        top: scrollViewRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <DashboardContent>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 3 }}>
        <BackButton />
      </Box>

      <Card
        sx={{
          p: 3,
          height: 'calc(100vh - 240px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            pb: 2,
            mb: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          {/* <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: 'primary.main',
            }}
          >
            <Iconify icon="solar:chat-round-dots-bold" width={28} />
          </Avatar> */}
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Advisor Chat
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Get instant help with your admission queries
            </Typography>
          </Box>
        </Box>

        {/* Messages Container */}
        <Box
          ref={scrollViewRef}
          sx={{
            flex: 1,
            overflowY: 'auto',
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            pr: 1,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'background.neutral',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'grey.400',
              borderRadius: '10px',
              '&:hover': {
                backgroundColor: 'grey.500',
              },
            },
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                mb: 1,
              }}
            >
              <Box
                sx={{
                  maxWidth: '70%',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.5,
                  flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: message.role === 'user' ? 'success.main' : 'primary.main',
                  }}
                >
                  <Iconify
                    icon={
                      message.role === 'user'
                        ? 'solar:user-circle-bold'
                        : 'solar:chat-round-dots-bold'
                    }
                    width={20}
                  />
                </Avatar>
                <Box
                  sx={{
                    bgcolor: message.role === 'user' ? 'success.lighter' : 'primary.lighter',
                    borderRadius: 2,
                    px: 2,
                    py: 1.5,
                    boxShadow: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      color: message.role === 'user' ? 'success.darker' : 'primary.darker',
                    }}
                  >
                    {message.text}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}

          {loading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                mb: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: 'primary.main',
                  }}
                >
                  <Iconify icon="solar:chat-round-dots-bold" width={20} />
                </Avatar>
                <Box
                  sx={{
                    bgcolor: 'primary.lighter',
                    borderRadius: 2,
                    px: 2,
                    py: 1.5,
                    boxShadow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <CircularProgress size={16} />
                  <Typography variant="body2" color="primary.darker">
                    Thinking...
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>

        {/* Input Section */}
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <TextField
            fullWidth
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            multiline
            maxRows={4}
            slotProps={{
              input: {
                startAdornment: (
                  <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                    <Iconify icon="solar:pen-bold" width={20} color="text.secondary" />
                  </Box>
                ),
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
          <Button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            sx={{
              bgcolor: 'primary.main',
              width: 56,
              height: 56,
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              '&:disabled': {
                bgcolor: 'action.disabledBackground',
              },
            }}
          >
 
            <Iconify 
              icon="solar:alt-arrow-right-linear" 
              width={24} 
              sx={{ 
                color: '#fff',
                '.Mui-disabled &': {
                  color: 'action.disabled',
                },
              }} 
            />
          </Button>
  
        </Box>
      </Card>
    </DashboardContent>
  );
}

