import { useState } from 'react';
import { Brain, Wand2, Globe } from 'lucide-react';
import { useInitialText } from './hooks/useInitialText';
import { useAIActions } from './hooks/useAIActions';
import { useSuccessAnimation } from './hooks/useSuccessAnimation';
import { Header } from './components/Header';
import { TextInput } from './components/TextInput';
import { ActionButton } from './components/ActionButton';
import { OutputDisplay } from './components/OutputDisplay';
import { LoadingIndicator } from './components/LoadingIndicator';

function App() {
  const [input, setInput] = useInitialText();
  const [output, setOutput] = useState("");
  const { loading, activeAction, explain, simplify, translate } = useAIActions();
  const [successPulse, triggerSuccess] = useSuccessAnimation();

  const handleSuccess = (result: string) => {
    setOutput(result);
    if (!result.startsWith('Error:') && !result.includes('...')) {
      triggerSuccess();
    }
  };

  const handleExplain = () => explain(input, handleSuccess);
  const handleSimplify = () => simplify(output || input, handleSuccess);
  const handleTranslate = () => translate(output || input, handleSuccess);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Header />
        
        <TextInput value={input} onChange={setInput} />

        <div className="grid grid-cols-1 gap-3">
          <ActionButton
            onClick={handleExplain}
            disabled={loading || !input}
            icon={Brain}
            label="Explain"
            color="blue"
            isActive={activeAction === 'explain'}
          />
          <ActionButton
            onClick={handleSimplify}
            disabled={loading || !(input || output)}
            icon={Wand2}
            label="Simplify"
            color="purple"
            isActive={activeAction === 'simplify'}
          />
          <ActionButton
            onClick={handleTranslate}
            disabled={loading || !(input || output)}
            icon={Globe}
            label="Translate (EN -> JA)"
            color="green"
            isActive={activeAction === 'translate'}
          />
        </div>

        <OutputDisplay output={output} loading={loading} successPulse={successPulse} />

        {loading && <LoadingIndicator />}
      </div>
    </div>
  );
}

export default App;