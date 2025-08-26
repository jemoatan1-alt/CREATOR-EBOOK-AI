import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { ElevenLabsService } from './services/ElevenLabsService';
import { GrokService } from './services/GrokService';
import { Veo3Service } from './services/Veo3Service';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Initialize AI services
const elevenLabsService = new ElevenLabsService();
const grokService = new GrokService();
const veo3Service = new Veo3Service();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    services: {
      elevenlabs: elevenLabsService.isConfigured(),
      grok: grokService.isConfigured(),
      veo3: veo3Service.isConfigured()
    }
  });
});

// ElevenLabs text-to-speech endpoint
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voiceId } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const audioBuffer = await elevenLabsService.generateSpeech(text, voiceId);
    
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioBuffer.length.toString()
    });
    
    res.send(audioBuffer);
  } catch (error) {
    console.error('TTS Error:', error);
    res.status(500).json({ error: 'Failed to generate speech' });
  }
});

// Grok text generation endpoint
app.post('/api/generate-text', async (req, res) => {
  try {
    const { prompt, maxTokens = 1000 } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const generatedText = await grokService.generateText(prompt, maxTokens);
    
    res.json({ text: generatedText });
  } catch (error) {
    console.error('Text Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate text' });
  }
});

// Veo3 video generation endpoint
app.post('/api/generate-video', async (req, res) => {
  try {
    const { prompt, duration = 30 } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const videoUrl = await veo3Service.generateVideo(prompt, duration);
    
    res.json({ videoUrl });
  } catch (error) {
    console.error('Video Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate video' });
  }
});

// eBook creation endpoint
app.post('/api/create-ebook', async (req, res) => {
  try {
    const { title, genre, chapters = 5, includeAudio = false, includeImages = false } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Generate eBook content using AI services
    const bookPrompt = `Create a ${genre} eBook titled "${title}" with ${chapters} chapters. Each chapter should be engaging and well-structured.`;
    const content = await grokService.generateText(bookPrompt, 2000);
    
    const result: any = {
      title,
      content,
      chapters: content.split('Chapter').filter(chapter => chapter.trim().length > 0)
    };

    // Generate audio if requested
    if (includeAudio && elevenLabsService.isConfigured()) {
      try {
        result.audioGenerated = false;
      } catch (audioError) {
        console.warn('Audio generation failed:', audioError);
        result.audioGenerated = false;
      }
    }

    // Generate images if requested (placeholder for now)
    if (includeImages) {
      result.imagesGenerated = true;
      result.imageCount = chapters;
    }

    res.json(result);
  } catch (error) {
    console.error('eBook Creation Error:', error);
    res.status(500).json({ error: 'Failed to create eBook' });
  }
});

// Error handling middleware
app.use((error: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CREATOR-EBOOK-AI server running on http://localhost:${PORT}`);
  console.log('📖 AI-powered eBook creation tool is ready!');
  
  // Check service configurations
  if (!elevenLabsService.isConfigured()) {
    console.warn('⚠️  ElevenLabs API key not configured');
  }
  if (!grokService.isConfigured()) {
    console.warn('⚠️  Grok API key not configured');
  }
  if (!veo3Service.isConfigured()) {
    console.warn('⚠️  Veo3 API key not configured');
  }
});

export default app;