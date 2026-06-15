interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'sky' | 'outline';
  onClick?: () => void;
  active?: boolean;
}

export function Badge({ children, variant = 'default', onClick, active }: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium transition-all';

  const variants = {
    default: active
      ? 'bg-sky-400/20 text-sky-400 ring-1 ring-sky-400/30'
      : 'bg-zinc-100 text-zinc-500 ring-1 ring-zinc-200/50 hover:bg-zinc-200/80',
    sky: 'bg-sky-100 text-sky-500 ring-1 ring-sky-400/30',
    outline: 'bg-transparent text-zinc-500 ring-1 ring-zinc-200/50 hover:bg-zinc-50/50',
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
