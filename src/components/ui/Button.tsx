interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base =
    'font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-dark focus:ring-offset-2 focus:ring-offset-white-800 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-blue-light hover:bg-blue-dark text-white-900 shadow-md hover:shadow-lg',
    secondary:
      'bg-yellow-primary hover:bg-yellow-primary/90 text-black-200 shadow-md hover:shadow-lg',
    outline:
      'border-2 border-blue-light text-blue-light hover:bg-blue-light/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-14',
    md: 'px-6 py-3 text-18',
    lg: 'px-8 py-4 text-20',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
