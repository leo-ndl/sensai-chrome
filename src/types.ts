export interface AIService {
  explain: (text: string) => Promise<string>;
  simplify: (text: string) => Promise<string>;
  translate: (text: string, sourceLang: string) => Promise<string>;
}