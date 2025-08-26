import { ElevenLabsService } from '../src/services/ElevenLabsService';
import { GrokService } from '../src/services/GrokService';
import { Veo3Service } from '../src/services/Veo3Service';

describe('AI Services', () => {
  describe('ElevenLabsService', () => {
    let service: ElevenLabsService;

    beforeEach(() => {
      service = new ElevenLabsService();
    });

    test('should initialize without API key', () => {
      expect(service).toBeDefined();
      expect(service.isConfigured()).toBe(false);
    });

    test('should detect API key configuration', () => {
      process.env.ELEVENLABS_API_KEY = 'test-key';
      service = new ElevenLabsService();
      expect(service.isConfigured()).toBe(true);
      delete process.env.ELEVENLABS_API_KEY;
    });

    test('should throw error when generating speech without API key', async () => {
      await expect(service.generateSpeech('test text')).rejects.toThrow('ElevenLabs API key not configured');
    });
  });

  describe('GrokService', () => {
    let service: GrokService;

    beforeEach(() => {
      service = new GrokService();
    });

    test('should initialize without API key', () => {
      expect(service).toBeDefined();
      expect(service.isConfigured()).toBe(false);
    });

    test('should detect API key configuration', () => {
      process.env.GROK_API_KEY = 'test-key';
      service = new GrokService();
      expect(service.isConfigured()).toBe(true);
      delete process.env.GROK_API_KEY;
    });

    test('should provide fallback content when API key not configured', async () => {
      const result = await service.generateText('Test prompt');
      expect(result).toContain('sample response');
      expect(result).toContain('configure your Grok API key');
    });
  });

  describe('Veo3Service', () => {
    let service: Veo3Service;

    beforeEach(() => {
      service = new Veo3Service();
    });

    test('should initialize without API key', () => {
      expect(service).toBeDefined();
      expect(service.isConfigured()).toBe(false);
    });

    test('should detect API key configuration', () => {
      process.env.VEO3_API_KEY = 'test-key';
      service = new Veo3Service();
      expect(service.isConfigured()).toBe(true);
      delete process.env.VEO3_API_KEY;
    });

    test('should throw error when generating video without API key', async () => {
      await expect(service.generateVideo('test prompt')).rejects.toThrow('Veo3 API key not configured');
    });
  });
});