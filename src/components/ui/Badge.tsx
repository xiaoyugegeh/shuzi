interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'amber' | 'outline';
  onClick?: () => void;
  active?: boolean;
}

export function Badge({ children, variant = 'default', onClick, active }: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium transition-all';

  const variants = {
    default: active
      ? 'bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/30'
      : 'bg-zinc-800 text-zinc-400 ring-1 ring-zinc-700/50 hover:bg-zinc-700/80',
    amber: 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30',
    outline: 'bg-transparent text-zinc-400 ring-1 ring-zinc-700/50 hover:bg-zinc-800/50',
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
