import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardToggle from '../../app/components/CardToggle';

describe('CardToggle Component', () => {
  it('renders with the correct labels', () => {
    const { getByText } = render(
      <CardToggle leftLabel="Off" rightLabel="On" />
    );

    expect(getByText('Off')).toBeInTheDocument();
    expect(getByText('On')).toBeInTheDocument();
  });

  it('toggles state when clicked', () => {
    const { getByText } = render(
      <CardToggle leftLabel="Off" rightLabel="On" />
    );

    const leftLabel = getByText('Off');
    const rightLabel = getByText('On');

    expect(leftLabel).toHaveClass('text-black');
    expect(rightLabel).toHaveClass('text-gray-400');

    fireEvent.click(leftLabel);

    expect(leftLabel).toHaveClass('text-gray-400');
    expect(rightLabel).toHaveClass('text-black');
  });

  it('calls onClick prop with the correct state', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <CardToggle leftLabel="Off" rightLabel="On" onClick={handleClick} />
    );

    const leftLabel = getByText('Off');

    fireEvent.click(leftLabel);

    expect(handleClick).toHaveBeenCalledWith(true);

    fireEvent.click(leftLabel);

    expect(handleClick).toHaveBeenCalledWith(false);
  });
});
