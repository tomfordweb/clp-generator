import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LabelAddressForm from './LabelAddressForm';

describe('<LabelAddressForm />', () => {
  test('it should mount', () => {
    render(<LabelAddressForm />);
    
    const labelAddressForm = screen.getByTestId('LabelAddressForm');

    expect(labelAddressForm).toBeInTheDocument();
  });
});