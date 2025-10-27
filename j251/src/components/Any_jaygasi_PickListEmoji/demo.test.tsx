// import { expect, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import '@testing-library/jest-dom';

import * as DemoStories from './demo.stories';

const { BaseAnyJaygasiPickListEmoji } = composeStories(DemoStories);

test('renders AnyJaygasiPickListEmoji', async () => {
  render(<BaseAnyJaygasiPickListEmoji />);
  expect(await screen.findByText('Picklist Sample')).toBeVisible();
  expect(await screen.findByText('Picklist Helper Text')).toBeVisible();

  const picklistElement = (screen.getByTestId('picklist-12345678') as HTMLSelectElement);
  expect(picklistElement).toHaveAttribute('label', 'Picklist Sample');
  expect(picklistElement.value).toContain('');

  fireEvent.click(picklistElement);

  fireEvent.change(picklistElement, { target: { value: 'Option 1' } });

  expect(picklistElement.value).toContain('Option 1');

});
