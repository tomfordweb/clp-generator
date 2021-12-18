import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FragranceEditor from './FragranceEditor';

describe('<FragranceEditor />', () => {
  test('it should mount', () => {
    render(<FragranceEditor />);
    
    const fragranceEditor = screen.getByTestId('FragranceEditor');

    expect(fragranceEditor).toBeInTheDocument();
  });
});