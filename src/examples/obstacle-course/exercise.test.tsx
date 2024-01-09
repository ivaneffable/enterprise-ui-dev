import { render, screen, within, waitFor } from 'test/utilities';
import ObstacleCourse from '.';

it('should input text into the input field', async () => {
  const thought = 'Ravioli are a form of pop tart.';

  const { user } = render(<ObstacleCourse />);

  const input = screen.getByLabelText('Deep Thought');
  await user.type(input, thought);

  expect(input).toHaveValue(thought);
});

it('should control a select input', async () => {
  const { user } = render(<ObstacleCourse />);

  const select = screen.getByLabelText('Favorite Avenger');
  await user.selectOptions(select, 'Captain America');

  expect(select).toHaveValue('Captain America');
});

it('should find and control a checkbox input', async () => {
  const { user } = render(<ObstacleCourse />);

  const checkbox = screen.getByLabelText('Sardines');
  await user.click(checkbox);

  expect(checkbox).toBeChecked();
});

it('should find and control a radio input', async () => {
  const { user } = render(<ObstacleCourse />);

  const radio = screen.getByLabelText('John');
  await user.click(radio);

  expect(radio).toBeChecked();
});

it('should find and control a color input', async () => {
  const { user } = render(<ObstacleCourse />);

  const color = screen.getByLabelText('Favorite Color');
  await user.type(color, '#fff');

  waitFor(() => expect(color).toHaveValue('#fff'));
});

it('should find and control a date input', async () => {
  const { user } = render(<ObstacleCourse />);

  const date = screen.getByLabelText('Date');
  await user.type(date, '2021-12-17');

  waitFor(() => expect(date).toHaveValue('2021-12-17'));
});

it('should find and control a range input', async () => {
  const { user } = render(<ObstacleCourse />);

  const range = screen.getByLabelText('Rating');
  await user.type(range, '4');

  expect(range).toHaveValue('4');
});

it('should find and control a file input', async () => {
  const { user } = render(<ObstacleCourse />);

  const file = screen.getByLabelText('Résumé');
  await user.upload(
    file,
    new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
  );

  expect(file).toHaveValue(`C:\\fakepath\\chucknorris.png`);
});
