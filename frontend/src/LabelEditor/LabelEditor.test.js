import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LabelEditor from './LabelEditor';

describe('<LabelEditor />', () => {
  test('it should mount', () => {
    render(<LabelEditor />);
    
    const labelEditor = screen.getByTestId('LabelEditor');

    expect(labelEditor).toBeInTheDocument();
  });
});