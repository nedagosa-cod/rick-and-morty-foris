import { type InputHTMLAttributes, forwardRef, useState } from 'react';
import './Input.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', type = 'text', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const isPasswordType = type === 'password';
    const inputType = isPasswordType && showPassword ? 'text' : type;

    const baseClass = 'input';
    const containerClass = [
      `${baseClass}-container`,
      fullWidth ? `${baseClass}-container--full-width` : '',
      className
    ].filter(Boolean).join(' ');

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className={containerClass}>
        <label className={`${baseClass}__label`} htmlFor={props.id || props.name}>
          {label}
        </label>
        <div className={`${baseClass}__wrapper`}>
          <input
            ref={ref}
            id={props.id || props.name}
            type={inputType}
            className={`${baseClass}__field ${error ? `${baseClass}__field--error` : ''}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${props.id || props.name}-error` : undefined}
            {...props}
          />
          {isPasswordType && (
            <button
              type="button"
              className={`${baseClass}__toggle`}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              aria-pressed={showPassword}
            >
              {/* Eye icon svg */}
              {showPassword ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off">
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          )}
        </div>
        {error && (
          <span className={`${baseClass}__error-message`} id={`${props.id || props.name}-error`} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
