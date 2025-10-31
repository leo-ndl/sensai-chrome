import { Brain, Zap } from 'lucide-react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TextInput({ value, onChange, placeholder }: TextInputProps) {
  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 blur-lg" />
      <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-slate-700">
        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
          <Brain className="w-4 h-4" />
          Input Text
        </label>
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full h-32 rounded-xl p-3 bg-slate-900/50 text-white border border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all resize-none placeholder-gray-500"
          placeholder={placeholder || "Paste your text here or select text on any webpage..."}
        />
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>{value.length} characters</span>
          {value && <Zap className="w-4 h-4 text-yellow-400" />}
        </div>
      </div>
    </div>
  );
}
