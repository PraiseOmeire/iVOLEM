interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  variant = "primary",
  disabled = false,
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-colors duration-200 cursor-pointer";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "bg-secondary text-white hover:bg-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
