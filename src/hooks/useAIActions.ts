import { useState } from 'react';
import { aiService } from '../services/aiService';

export type ActionType = 'explain' | 'simplify' | 'translate' | null;

export function useAIActions() {
  const [loading, setLoading] = useState(false);
  const [activeAction, setActiveAction] = useState<ActionType>(null);
  const [error, setError] = useState<string | null>(null);

  const executeAction = async (
    action: () => Promise<string>,
    actionName: ActionType,
    loadingMessage: string,
    onSuccess: (result: string) => void
  ) => {
    setLoading(true);
    setActiveAction(actionName);
    setError(null);
    onSuccess(loadingMessage);

    try {
      const result = await action();
      onSuccess(result);
      return true;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      onSuccess(`Error: ${errorMessage}`);
      console.error("AI error:", err);
      return false;
    } finally {
      setLoading(false);
      setActiveAction(null);
    }
  };

  const explain = (text: string, onSuccess: (result: string) => void) => {
    return executeAction(
      () => aiService.explain(text),
      'explain',
      '🧠 Analyzing your text...',
      onSuccess
    );
  };

  const simplify = (text: string, onSuccess: (result: string) => void) => {
    return executeAction(
      () => aiService.simplify(text),
      'simplify',
      '✨ Making it simpler...',
      onSuccess
    );
  };

  const translate = (text: string, onSuccess: (result: string) => void) => {
    return executeAction(
      () => aiService.translate(text, 'en'),
      'translate',
      '🌍 Translating...',
      onSuccess
    );
  };

  return {
    loading,
    activeAction,
    error,
    explain,
    simplify,
    translate,
  };
}