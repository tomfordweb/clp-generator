import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FragranceProductEditor from './FragranceProductEditor';

describe('<FragranceProductEditor />', () => {
  test('it should mount', () => {
    render(<FragranceProductEditor />);
    
    const fragranceProductEditor = screen.getByTestId('FragranceProductEditor');

    expect(fragranceProductEditor).toBeInTheDocument();
  });
});