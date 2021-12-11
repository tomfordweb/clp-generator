import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LabelDisplay from './LabelDisplay';

describe('<LabelDisplay />', () => {
  test('it should mount', () => {
    render(<LabelDisplay />);
    
    const labelDisplay = screen.getByTestId('LabelDisplay');

    expect(labelDisplay).toBeInTheDocument();
  });
});