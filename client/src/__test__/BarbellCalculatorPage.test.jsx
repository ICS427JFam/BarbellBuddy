import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BarbellCalculatorPage from '../ui/pages/BarbellCalculatorPage';

describe('test suite', () => {
  it('test', () => {
    const { getByLabelText } = render(<BarbellCalculatorPage/>);

    fireEvent.change(getByLabelText(/weightInput/i), {
      target: { value: 100 },
    });
    fireEvent.click(getByLabelText(/submit/i));
    expect(window.localStorage.getItem('user-token')).toBeDefined();
  });
});
