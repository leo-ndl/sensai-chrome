import { useState, useEffect } from 'react';
import { Sparkles, Zap, Globe, Brain, Wand2 } from 'lucide-react';

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [successPulse, setSuccessPulse] = useState(false);

  useEffect(() => {
    chrome.storage.local.get("selectedText", ({ selectedText }: { selectedText?: string }) => {
      if (selectedText) {
        setInput(selectedText);
        chrome.storage.local.remove("selectedText");
      }
    });
  }, []);

  async function handlePrompt(prompt: string, loadingMessage: string, textToProcess: string, actionName: string) {
    setLoading(true);
    setActiveAction(actionName);
    setOutput(loadingMessage);
    try {
      const systemPrompt = {
        role: 'system',
        content: 'You are a helpful and friendly assistant.',
      }
      const availability = await LanguageModel.availability({
        initialPrompts: [systemPrompt],
        expectedOutputs: [{
          type: "text",
          languages: ["en"]
        }],
      });
      if (!availability) {
        throw new Error("Language model not available");
      }

      const session = await LanguageModel.create({
        initialPrompts: [systemPrompt],
        expectedOutputs: [{
          type: "text",
          languages: ["en"]
        }],
      });

      const fullPrompt = `${prompt}:\n\n${textToProcess}`;
      const userPrompt = {
        role: 'user',
        content: fullPrompt,
      };
      const response: string = await session.prompt([userPrompt]);

      setOutput(response);
      setSuccessPulse(true);
      setTimeout(() => setSuccessPulse(false), 600);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`);
      } else {
        setOutput(`Error: ${String(error)}`);
      }
      console.error("AI error:", error);
    } finally {
      setLoading(false);
      setActiveAction(null);
    }
  }

  const explain = () => handlePrompt("Explain this code in simple terms", "🧠 Analyzing your text...", input, "explain");
  const simplify = () => handlePrompt("Rewrite this in a simpler, beginner-friendly way", "✨ Making it simpler...", output || input, "simplify");

  async function translate() {
    setLoading(true);
    setActiveAction("translate");
    setOutput("🌍 Translating...");
    try {
      if (!('Translator' in self)) {
        throw new Error("Translator not available");
      }

      const translator = await Translator.create({
        sourceLanguage: 'es',
        targetLanguage: 'fr',
        monitor(m: any) {
          m.addEventListener('downloadprogress', (e: ProgressEvent) => {
            console.log(`Downloaded ${e.loaded * 100}%`);
          });
        },
      });

      const translation = await translator.translate(output || input, "es");
      setOutput(translation);
      setSuccessPulse(true);
      setTimeout(() => setSuccessPulse(false), 600);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`);
      } else {
        setOutput(`Error: ${String(error)}`);
      }
      console.error("AI error:", error);
    } finally {
      setLoading(false);
      setActiveAction(null);
    }
  }

  const ActionButton = ({ 
    onClick, 
    disabled, 
    icon: Icon, 
    label, 
    color, 
    actionName 
  }: { 
    onClick: () => void; 
    disabled: boolean; 
    icon: any; 
    label: string; 
    color: string;
    actionName: string;
  }) => {
    const isActive = activeAction === actionName;
    const colorClasses = {
      blue: 'from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 shadow-blue-500/50',
      purple: 'from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 shadow-purple-500/50',
      green: 'from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 shadow-green-500/50',
    }[color];

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          relative group w-full py-3 px-4 rounded-xl font-semibold text-white
          bg-gradient-to-br ${colorClasses}
          disabled:from-gray-600 disabled:to-gray-700 disabled:shadow-none
          disabled:cursor-not-allowed disabled:opacity-50
          transition-all duration-300 transform
          ${!disabled && !isActive ? 'hover:scale-105 hover:shadow-lg' : ''}
          ${isActive ? 'scale-95 animate-pulse' : ''}
          flex items-center justify-center gap-2
        `}
      >
        <Icon className={`w-5 h-5 ${isActive ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'}`} />
        <span>{label}</span>
        {!disabled && !isActive && (
          <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              AI Power Tools
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-gray-400 text-sm">Transform your text with AI magic ✨</p>
        </div>

        {/* Input Area */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 blur-lg" />
          <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-slate-700">
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Input Text
            </label>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              className="w-full h-32 rounded-xl p-3 bg-slate-900/50 text-white border border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all resize-none placeholder-gray-500"
              placeholder="Paste your text here or select text on any webpage..."
            />
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>{input.length} characters</span>
              {input && <Zap className="w-4 h-4 text-yellow-400" />}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-3">
          <ActionButton
            onClick={explain}
            disabled={loading || !input}
            icon={Brain}
            label="Explain"
            color="blue"
            actionName="explain"
          />
          <ActionButton
            onClick={simplify}
            disabled={loading || !(input || output)}
            icon={Wand2}
            label="Simplify"
            color="purple"
            actionName="simplify"
          />
          <ActionButton
            onClick={translate}
            disabled={loading || !(input || output)}
            icon={Globe}
            label="Translate (ES → FR)"
            color="green"
            actionName="translate"
          />
        </div>

        {/* Output Area */}
        {output && (
          <div className={`relative transition-all duration-500 ${successPulse ? 'scale-105' : 'scale-100'}`}>
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl opacity-20 blur-lg" />
            <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-slate-700">
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-green-400" />
                AI Response
              </label>
              <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-600 min-h-[100px] max-h-[300px] overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-200 font-mono leading-relaxed">
                  {output}
                </pre>
              </div>
              {!loading && output && (
                <div className="mt-3 flex items-center gap-2 text-xs text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Response complete!</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-center justify-center gap-2 text-purple-400">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;