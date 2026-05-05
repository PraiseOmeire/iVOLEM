import Link from "next/link";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  disabled?: boolean;
  href?: string;
}

export function Card({
  icon,
  title,
  description,
  buttonText,
  disabled = true,
  href,
}: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
      <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-primary-light text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      {href && !disabled ? (
        <Link
          href={href}
          className="px-6 py-2 rounded-lg bg-secondary text-white font-medium hover:bg-secondary-dark transition-colors duration-200"
        >
          {buttonText}
        </Link>
      ) : (
        <button
          disabled={disabled}
          className="px-6 py-2 rounded-lg bg-secondary text-white font-medium opacity-50 cursor-not-allowed"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
