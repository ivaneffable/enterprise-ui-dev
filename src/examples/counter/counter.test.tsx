import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';

test('it should render the component', () => {
  render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  await user.click(screen.getByRole('button', { name: /increment/i }));

  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('1');
});

test('it should be able to initailize the count', async () => {
  render(<Counter initialCount={5} />);

  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('5');
});

test('it should reset when the "Reset" button is pressed', async () => {
  render(<Counter />);

  fireEvent.click(screen.getByRole('button', { name: /increment/i }));
  fireEvent.click(screen.getByRole('button', { name: /reset/i }));

  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
});
