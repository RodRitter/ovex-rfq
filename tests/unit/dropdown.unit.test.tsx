import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Dropdown from '../../components/Dropdown';

describe('Dropdown Component', () => {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  it('renders with placeholder text', () => {
    render(
      <Dropdown
        options={options}
        onChange={() => {}}
        placeholder="Select an option"
      />
    );
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('opens dropdown on click and displays options', () => {
    render(<Dropdown options={options} onChange={() => {}} />);
    fireEvent.click(screen.getByText('Select an option'));
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('calls onChange with the correct value when an option is clicked', () => {
    const handleChange = jest.fn();
    render(<Dropdown options={options} onChange={handleChange} />);
    fireEvent.click(screen.getByText('Select an option'));
    fireEvent.click(screen.getByText('Option 2'));
    expect(handleChange).toHaveBeenCalledWith('2');
  });

  it('closes dropdown when clicking outside', () => {
    render(<Dropdown options={options} onChange={() => {}} />);
    fireEvent.click(screen.getByText('Select an option'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('disables interaction when disabled prop is true', () => {
    render(<Dropdown options={options} onChange={() => {}} disabled />);
    const dropdown = screen.getByText('Select an option');
    fireEvent.click(dropdown);
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('shows selected option label after selection', () => {
    render(<Dropdown options={options} onChange={() => {}} />);
    fireEvent.click(screen.getByText('Select an option'));
    fireEvent.click(screen.getByText('Option 3'));
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });
});
