import { render, screen } from '@testing-library/react';
import App from './App';

test('renders loader when loading is true', () => {
  render(<App />);
  const loaderElement = screen.queryByText(/Loading.../i);
  expect(loaderElement).toBeInTheDocument();
});