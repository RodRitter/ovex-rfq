import Button from '@/components/Button';
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
});
