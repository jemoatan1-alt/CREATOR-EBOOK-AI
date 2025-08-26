#!/usr/bin/env ts-node

import { ElevenLabsService } from '../src/services/ElevenLabsService';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

class ElevenLabsDemo {
  private elevenLabsService: ElevenLabsService;

  constructor() {
    this.elevenLabsService = new ElevenLabsService();
  }

  async runDemo() {
    console.log('🎙️  ElevenLabs Demo - CREATOR-EBOOK-AI');
    console.log('=====================================\n');

    // Check if API key is configured
    if (!this.elevenLabsService.isConfigured()) {
      console.log('❌ ElevenLabs API key not found!');
      console.log('Please set ELEVENLABS_API_KEY in your .env file');
      console.log('You can get an API key from: https://elevenlabs.io/');
      console.log('\nExample .env configuration:');
      console.log('ELEVENLABS_API_KEY=your_api_key_here');
      return;
    }

    console.log('✅ ElevenLabs API key configured');

    try {
      // Test 1: Get available voices
      console.log('\n📋 Testing: Get Available Voices');
      console.log('----------------------------------');
      const voices = await this.elevenLabsService.getVoices();
      console.log(`Found ${voices.length} voices:`);
      voices.slice(0, 5).forEach((voice: any) => {
        console.log(`  - ${voice.name} (${voice.voice_id})`);
      });

      // Test 2: Generate sample speech
      console.log('\n🎵 Testing: Text-to-Speech Generation');
      console.log('------------------------------------');
      
      const sampleTexts = [
        "Welcome to CREATOR-EBOOK-AI! This is a demonstration of our text-to-speech functionality.",
        "Benvenuti in CREATOR-EBOOK-AI! Questo strumento utilizza l'intelligenza artificiale per creare eBook straordinari.",
        "Chapter One: The Adventure Begins. In a world where technology meets creativity..."
      ];

      for (let i = 0; i < sampleTexts.length; i++) {
        const text = sampleTexts[i];
        console.log(`\nGenerating audio ${i + 1}/${sampleTexts.length}:`);
        console.log(`Text: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`);
        
        try {
          const audioBuffer = await this.elevenLabsService.generateSpeech(text);
          
          // Save audio file
          const outputDir = path.join(__dirname, '../output');
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }
          
          const filename = `demo_audio_${i + 1}.mp3`;
          const filepath = path.join(outputDir, filename);
          fs.writeFileSync(filepath, audioBuffer);
          
          console.log(`✅ Audio generated successfully!`);
          console.log(`📁 Saved to: ${filepath}`);
          console.log(`📊 Size: ${(audioBuffer.length / 1024).toFixed(2)} KB`);
          
        } catch (error: any) {
          console.log(`❌ Failed to generate audio: ${error.message}`);
        }
      }

      // Test 3: Check API usage
      console.log('\n📊 Testing: API Usage Check');
      console.log('----------------------------');
      try {
        const usage = await this.elevenLabsService.checkUsage();
        console.log(`Subscription tier: ${usage.subscription?.tier || 'Free'}`);
        console.log(`Characters used this month: ${usage.subscription?.character_count || 0}`);
        console.log(`Character limit: ${usage.subscription?.character_limit || 10000}`);
      } catch (error: any) {
        console.log(`❌ Failed to get usage info: ${error.message}`);
      }

      console.log('\n🎉 ElevenLabs Demo completed successfully!');
      console.log('\n💡 Tips:');
      console.log('  - Generated audio files are saved in the ./output directory');
      console.log('  - You can use different voice IDs by setting ELEVENLABS_VOICE_ID in .env');
      console.log('  - Experiment with different texts to test the quality');
      console.log('  - Check your usage limits regularly to avoid interruptions');

    } catch (error: any) {
      console.error('❌ Demo failed:', error.message);
      console.log('\n🔧 Troubleshooting:');
      console.log('  1. Verify your API key is correct');
      console.log('  2. Check your internet connection');
      console.log('  3. Ensure you have available characters in your ElevenLabs account');
      console.log('  4. Try running the demo again in a few minutes');
    }
  }
}

// Run the demo if this file is executed directly
if (require.main === module) {
  const demo = new ElevenLabsDemo();
  demo.runDemo().catch(console.error);
}

export default ElevenLabsDemo;