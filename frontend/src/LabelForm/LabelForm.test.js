import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LabelForm from './LabelForm';

describe('<LabelForm />', () => {
  test('it should mount', () => {
    render(<LabelForm />);
    
    const labelForm = screen.getByTestId('LabelForm');

    expect(labelForm).toBeInTheDocument();
  });
});