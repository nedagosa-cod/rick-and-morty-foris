import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * La variante visual del botón
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'primary-dark' | 'secondary-dark' | 'error';
  /**
   * El tamaño del botón
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Muestra un indicador de carga y deshabilita el botón
   * @default false
   */
  isLoading?: boolean;
  /**
   * El contenido del botón (texto, iconos)
   */
  children: ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'sm',
  isLoading = false,
  disabled = false,
  children,
  className = '',
  ...props
}: ButtonProps) => {
  // Construcción de clases usando metodología BEM
  const baseClass = 'button';
  const variantClass = `${baseClass}--${variant}`;
  const sizeClass = `${baseClass}--${size}`;
  const loadingClass = isLoading ? `${baseClass}--loading` : '';

  const combinedClasses = [
    baseClass,
    variantClass,
    sizeClass,
    loadingClass,
    className
  ].filter(Boolean).join(' ');

  const isDisabled = disabled || isLoading;

  return (
    <button
      className={combinedClasses}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className={`${baseClass}__spinner`} aria-hidden="true" />
          <span className={`${baseClass}__text`}>{children}</span>
        </>
      ) : (
        <span className={`${baseClass}__text`}>{children}</span>
      )}
    </button>
  );
};
