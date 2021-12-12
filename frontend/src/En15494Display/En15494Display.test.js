import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import En15494Display from './En15494Display';

describe('<En15494Display />', () => {
  test('it should mount', () => {
    render(<En15494Display />);
    
    const en15494Display = screen.getByTestId('En15494Display');

    expect(en15494Display).toBeInTheDocument();
  });
});