interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary:
      'bg-amber-500 text-zinc-900 hover:bg-amber-400 shadow-lg shadow-amber-500/20',
    secondary:
      'bg-zinc-800 text-zinc-200 ring-1 ring-zinc-700/50 hover:bg-zinc-700',
    ghost:
      'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
