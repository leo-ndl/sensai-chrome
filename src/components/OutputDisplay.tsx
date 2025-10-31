import { Sparkles } from 'lucide-react';

interface OutputDisplayProps {
  output: string;
  loading: boolean;
  successPulse: boolean;
}

export function OutputDisplay({ output, loading, successPulse }: OutputDisplayProps) {
  if (!output) return null;

  return (
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
  );
}