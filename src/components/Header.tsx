import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center space-y-2">
      <div className="flex items-center justify-center gap-2">
        <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          SensAI
        </h1>
        <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
      </div>
      <p className="text-gray-400 text-sm">Need help understanding this... ✨</p>
    </div>
  );
}
