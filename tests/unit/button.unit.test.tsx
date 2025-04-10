import Button, { ButtonSize } from '@/components/Button';
import { render, screen } from '@testing-library/react';

describe('Button', () => {
  it('should display button text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('should trigger onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    screen.getByText('Click Me').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not trigger onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click Me
      </Button>
    );
    screen.getByText('Click Me').click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should apply block style when block prop is true', () => {
    render(<Button block>Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('w-full');
  });

  it('should apply normal size styles by default', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('text-sm py-2 px-3');
  });

  it('should apply large size styles when size is set to Large', () => {
    render(<Button size={ButtonSize.Large}>Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('text-lg py-4 px-4');
  });
});
