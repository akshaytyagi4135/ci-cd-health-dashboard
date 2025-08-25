import { render, screen } from '@testing-library/react';
import MetricCard from '../src/components/MetricCard.jsx';
import '@testing-library/jest-dom';

test('displays title and value', () => {
  render(<MetricCard title="Test" value="123" />);
  expect(screen.getByText('Test')).toBeInTheDocument();
  expect(screen.getByText('123')).toBeInTheDocument();
});
