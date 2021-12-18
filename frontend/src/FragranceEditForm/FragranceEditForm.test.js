import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FragranceEditForm from './FragranceEditForm';

describe('<FragranceEditForm />', () => {
  test('it should mount', () => {
    render(<FragranceEditForm />);
    
    const fragranceEditForm = screen.getByTestId('FragranceEditForm');

    expect(fragranceEditForm).toBeInTheDocument();
  });
});