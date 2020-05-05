import React from 'react';
import App from 'App';
import { render, fireEvent } from '@testing-library/react';

jest.mock('features/CraftingComponentsPanel');
jest.mock('features/DiagramPanel');

describe('<App />', () => {
  it('should render', () => {
    const { debug, getByTestId } = render(<App />);
    const otherTab = getByTestId("CRAFTING_COMPONENTS");
    fireEvent.click(otherTab);
  });
});