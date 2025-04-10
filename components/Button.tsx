import React, { PropsWithChildren } from 'react';

export enum ButtonVariant {
  Primary,
  Outline,
}

export enum ButtonSize {
  Normal,
  Large,
}

interface ButtonProps extends PropsWithChildren {
  onClick?: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  block?: boolean;
  size?: ButtonSize;
}

const Button = ({
  children,
  onClick,
  disabled,
  variant = ButtonVariant.Primary,
  block = false,
  size = ButtonSize.Normal,
}: ButtonProps) => {
  const defaultStyles =
    'py-2 px-3 rounded-sm text-sm font-semibold transition-opacity duration-200 cursor-pointer hover:opacity-90 active:opacity-100 disabled:opacity-50 disabled:cursor-default';

  const buttonStyles = {
    [ButtonVariant.Primary]: `bg-primary text-white ${defaultStyles}`,
    [ButtonVariant.Outline]: `border border-primary text-primary ${defaultStyles}`,
  };

  const blockStyle = block ? 'w-full' : '';

  const sizeStyles = {
    [ButtonSize.Normal]: 'text-sm py-2 px-3',
    [ButtonSize.Large]: 'text-lg py-4 px-4',
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${buttonStyles[variant]} ${blockStyle} ${sizeStyles[size]}`}
    >
      {children}
    </button>
  );
};

export default Button;
