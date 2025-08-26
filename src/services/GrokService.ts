import axios from 'axios';

export class GrokService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.GROK_API_KEY || '';
    this.baseUrl = process.env.GROK_API_URL || 'https://api.x.ai/v1';
  }

  isConfigured(): boolean {
    return this.apiKey.length > 0;
  }

  async generateText(prompt: string, maxTokens: number = 1000): Promise<string> {
    if (!this.isConfigured()) {
      console.warn('Grok API key not configured, using fallback content');
      return this.generateFallbackContent(prompt, maxTokens);
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: 'grok-beta',
          messages: [
            {
              role: 'system',
              content: 'You are a creative writing assistant specialized in creating engaging eBooks and stories. Provide well-structured, creative content.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: maxTokens,
          temperature: 0.7,
          stream: false
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      return response.data.choices[0]?.message?.content || '';
    } catch (error: any) {
      console.error('Grok API Error:', error.response?.data || error.message);
      
      // Fallback to mock content if API is not available
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.warn('Grok API authentication failed, using fallback content');
        return this.generateFallbackContent(prompt, maxTokens);
      }
      
      throw new Error(`Failed to generate text: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  async generateStoryOutline(title: string, genre: string, chapters: number): Promise<string> {
    const prompt = `Create a detailed outline for a ${genre} story titled "${title}" with ${chapters} chapters. Include:
    - Brief plot summary
    - Main characters
    - Chapter-by-chapter breakdown
    - Key plot points and conflicts
    - Conclusion
    
    Make it engaging and well-structured for an eBook format.`;

    return this.generateText(prompt, 1500);
  }

  async generateChapter(title: string, chapterNumber: number, outline: string): Promise<string> {
    const prompt = `Based on this story outline:
    ${outline}
    
    Write Chapter ${chapterNumber} for the story "${title}". Make it:
    - Approximately 1000-1500 words
    - Engaging and well-paced
    - Consistent with the overall story
    - Include dialogue and descriptive elements
    - End with a hook for the next chapter`;

    return this.generateText(prompt, 2000);
  }

  private generateFallbackContent(prompt: string, _maxTokens: number): string {
    // Simple fallback content generator
    const isEbookPrompt = prompt.toLowerCase().includes('ebook') || prompt.toLowerCase().includes('chapter');
    
    if (isEbookPrompt) {
      return `# Sample eBook Content

This is a demonstration chapter for your eBook project. 

## Chapter 1: The Beginning

In a world where artificial intelligence meets creativity, our story begins with a simple idea that would change everything. The protagonist discovers an ancient manuscript that holds the key to unlocking the power of storytelling through technology.

As the sun set over the digital landscape, Sarah opened her laptop and began typing the words that would transform her understanding of what it means to create. She had always been fascinated by the intersection of technology and art, but never imagined she would be at the center of such a revolutionary discovery.

The old library was quiet except for the gentle hum of servers in the basement - a reminder that even in this traditional space, the future was already present. Sarah's fingers moved across the keyboard as if guided by an unseen force, each word flowing naturally into the next.

"This is just the beginning," she whispered to herself, not knowing how prophetic those words would prove to be.

## What Happens Next?

The story continues to unfold as our protagonist embarks on a journey that will challenge everything she thought she knew about creativity, technology, and the power of human imagination.

---

*Note: This is sample content generated as a fallback. Configure your Grok API key for AI-generated content.*`;
    }
    
    return `Generated content based on your prompt: "${prompt.substring(0, 100)}..."

This is a sample response that demonstrates the text generation functionality. To get AI-powered content, please configure your Grok API key in the environment variables.

The system is working correctly and ready to generate creative content once the API keys are properly configured.`;
  }
}