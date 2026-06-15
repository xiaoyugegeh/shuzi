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
    'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-sky-400/50 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary:
      'bg-sky-400 text-zinc-900 hover:bg-sky-300 shadow-lg shadow-sky-400/20',
    secondary:
      'bg-zinc-100 text-zinc-800 ring-1 ring-zinc-200/50 hover:bg-zinc-200',
    ghost:
      'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800',
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
