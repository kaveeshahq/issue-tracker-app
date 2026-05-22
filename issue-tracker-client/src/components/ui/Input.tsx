import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

const Input = ({ label, error, leftIcon, className = '', ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          className={`
            w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all
            ${leftIcon ? 'pl-10' : ''}
            ${error
              ? 'border-red-400 focus:ring-2 focus:ring-red-200'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
            }
            disabled:bg-gray-50 disabled:text-gray-400
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;