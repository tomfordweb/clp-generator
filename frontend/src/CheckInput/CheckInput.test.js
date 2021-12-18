import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CheckInput from './CheckInput';

describe('<CheckInput />', () => {
  test('it should mount', () => {
    render(<CheckInput />);
    
    const checkInput = screen.getByTestId('CheckInput');

    expect(checkInput).toBeInTheDocument();
  });
});
