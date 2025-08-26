import axios from 'axios';

export class ElevenLabsService {
  private apiKey: string;
  private baseUrl = 'https://api.elevenlabs.io/v1';
  private defaultVoiceId = '21m00Tcm4TlvDq8ikWAM'; // Rachel voice

  constructor() {
    this.apiKey = process.env.ELEVENLABS_API_KEY || '';
  }

  isConfigured(): boolean {
    return this.apiKey.length > 0;
  }

  async generateSpeech(text: string, voiceId?: string): Promise<Buffer> {
    if (!this.isConfigured()) {
      throw new Error('ElevenLabs API key not configured');
    }

    const voice = voiceId || process.env.ELEVENLABS_VOICE_ID || this.defaultVoiceId;
    
    try {
      const response = await axios.post(
        `${this.baseUrl}/text-to-speech/${voice}`,
        {
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        },
        {
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': this.apiKey
          },
          responseType: 'arraybuffer'
        }
      );

      return Buffer.from(response.data);
    } catch (error: any) {
      console.error('ElevenLabs API Error:', error.response?.data || error.message);
      throw new Error(`Failed to generate speech: ${error.response?.data?.detail || error.message}`);
    }
  }

  async getVoices(): Promise<any[]> {
    if (!this.isConfigured()) {
      throw new Error('ElevenLabs API key not configured');
    }

    try {
      const response = await axios.get(`${this.baseUrl}/voices`, {
        headers: {
          'xi-api-key': this.apiKey
        }
      });

      return response.data.voices;
    } catch (error: any) {
      console.error('ElevenLabs API Error:', error.response?.data || error.message);
      throw new Error(`Failed to get voices: ${error.response?.data?.detail || error.message}`);
    }
  }

  async checkUsage(): Promise<any> {
    if (!this.isConfigured()) {
      throw new Error('ElevenLabs API key not configured');
    }

    try {
      const response = await axios.get(`${this.baseUrl}/user`, {
        headers: {
          'xi-api-key': this.apiKey
        }
      });

      return response.data;
    } catch (error: any) {
      console.error('ElevenLabs API Error:', error.response?.data || error.message);
      throw new Error(`Failed to check usage: ${error.response?.data?.detail || error.message}`);
    }
  }
}