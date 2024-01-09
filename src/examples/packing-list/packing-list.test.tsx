import { render, screen, within } from 'test/utilities';
import PackingList from '.';

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  expect(screen.getByLabelText(/new item name/i)).toBeInTheDocument();
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  expect(screen.getByLabelText(/new item name/i)).toHaveValue('');
  expect(screen.getByRole('button', { name: /add new item/i })).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);
  const input = screen.getByLabelText(/new item name/i);
  await user.type(input, 'Socks');

  expect(screen.getByRole('button', { name: /add new item/i })).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);
  const input = screen.getByLabelText(/new item name/i);
  await user.type(input, 'Socks');
  await user.click(screen.getByRole('button', { name: /add new item/i }));

  const unpackedItems = screen.getByTestId('unpacked-items');
  within(unpackedItems).getByText('Socks');
});
