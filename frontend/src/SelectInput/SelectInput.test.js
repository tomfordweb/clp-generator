import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SelectInput from './SelectInput';

describe('<SelectInput />', () => {
  test('it should mount', () => {
    render(<SelectInput />);
    
    const selectInput = screen.getByTestId('SelectInput');

    expect(selectInput).toBeInTheDocument();
  });
});