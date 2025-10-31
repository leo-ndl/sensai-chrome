import type { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  onClick: () => void;
  disabled: boolean;
  icon: LucideIcon;
  label: string;
  color: 'blue' | 'purple' | 'green';
  isActive: boolean;
}

export function ActionButton({ 
  onClick, 
  disabled, 
  icon: Icon, 
  label, 
  color,
  isActive 
}: ActionButtonProps) {
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
}