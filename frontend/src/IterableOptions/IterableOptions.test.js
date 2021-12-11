import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RadioOptions from './RadioOptions';

describe('<RadioOptions />', () => {
  test('it should mount', () => {
    render(<RadioOptions />);
    
    const radioOptions = screen.getByTestId('RadioOptions');

    expect(radioOptions).toBeInTheDocument();
  });
});