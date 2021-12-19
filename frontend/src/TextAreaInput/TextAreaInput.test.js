import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TextAreaInput from './TextAreaInput';

describe('<TextAreaInput />', () => {
  test('it should mount', () => {
    render(<TextAreaInput />);
    
    const textAreaInput = screen.getByTestId('TextAreaInput');

    expect(textAreaInput).toBeInTheDocument();
  });
});