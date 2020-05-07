import React from 'react';
import App from 'App';
import { render, fireEvent } from '@testing-library/react';

jest.mock('features/CraftingComponentsPanel');
jest.mock('features/DiagramPanel');

describe('<App />', () => {
  it('should render', () => {
    const { getByTestId } = render(<App />);
    const otherTab = getByTestId("CRAFTING_COMPONENTS");
    const user = getByTestId("user");
    const repo = getByTestId("repo");
    fireEvent.click(otherTab);
    fireEvent.click(user);
    fireEvent.click(repo);
  });
});