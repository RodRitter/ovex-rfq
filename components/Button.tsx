import React, { PropsWithChildren } from 'react';

export enum ButtonVariant {
  Primary,
  Outline,
}

interface ButtonProps extends PropsWithChildren {
  onClick?: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
}

const Button = ({
  children,
  onClick,
  disabled,
  variant = ButtonVariant.Primary,
}: ButtonProps) => {
  const defaultStyles =
    'py-2 px-3 rounded-sm text-sm font-semibold transition-opacity duration-200 cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-default';

  const buttonStyles = {
    [ButtonVariant.Primary]: `bg-primary text-white ${defaultStyles}`,
    [ButtonVariant.Outline]: `border border-primary text-primary ${defaultStyles}`,
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={buttonStyles[variant]}
    >
      {children}
    </button>
  );
};

export default Button;
