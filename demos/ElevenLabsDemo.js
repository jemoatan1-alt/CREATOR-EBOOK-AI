#!/usr/bin/env ts-node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ElevenLabsService_1 = require("../src/services/ElevenLabsService");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
class ElevenLabsDemo {
    constructor() {
        this.elevenLabsService = new ElevenLabsService_1.ElevenLabsService();
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
            voices.slice(0, 5).forEach((voice) => {
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
                }
                catch (error) {
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
            }
            catch (error) {
                console.log(`❌ Failed to get usage info: ${error.message}`);
            }
            console.log('\n🎉 ElevenLabs Demo completed successfully!');
            console.log('\n💡 Tips:');
            console.log('  - Generated audio files are saved in the ./output directory');
            console.log('  - You can use different voice IDs by setting ELEVENLABS_VOICE_ID in .env');
            console.log('  - Experiment with different texts to test the quality');
            console.log('  - Check your usage limits regularly to avoid interruptions');
        }
        catch (error) {
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
exports.default = ElevenLabsDemo;
//# sourceMappingURL=ElevenLabsDemo.js.map