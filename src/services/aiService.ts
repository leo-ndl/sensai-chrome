import type { AIService } from '../types';

class AIServiceImpl implements AIService {
  private async createLanguageModelSession() {
    const systemPrompt = {
      role: 'system',
      content: 'You are a helpful and friendly assistant.',
    };

    const config = {
      initialPrompts: [systemPrompt],
      expectedOutputs: [{
        type: "text" as const,
        languages: ["en"]
      }],
    };

    const availability = await LanguageModel.availability(config);
    if (!availability) {
      throw new Error("Language model not available");
    }

    return await LanguageModel.create(config);
  }

  private async executePrompt(prompt: string, text: string): Promise<string> {
    const session = await this.createLanguageModelSession();
    const fullPrompt = `${prompt}:\n\n${text}`;
    const userPrompt = {
      role: 'user',
      content: fullPrompt,
    };
    return await session.prompt([userPrompt]);
  }

  async explain(text: string): Promise<string> {
    return this.executePrompt("Explain this code in simple terms", text);
  }

  async simplify(text: string): Promise<string> {
    return this.executePrompt("Rewrite this in a simpler, beginner-friendly way", text);
  }

  async translate(text: string, sourceLang: string = 'es'): Promise<string> {
    if (!('Translator' in self)) {
      throw new Error("Translator not available");
    }

    const translator = await Translator.create({
      sourceLanguage: sourceLang,
      targetLanguage: 'es',
      monitor(m: any) {
        m.addEventListener('downloadprogress', (e: ProgressEvent) => {
          console.log(`Downloaded ${e.loaded * 100}%`);
        });
      },
    });

    return await translator.translate(text, sourceLang);
  }
}

export const aiService = new AIServiceImpl();