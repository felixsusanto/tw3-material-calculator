import React from 'react';
import CraftingComponentPanel from 'features/CraftingComponentsPanel';
import { render, fireEvent } from '@testing-library/react';

jest.mock("components/SelectComponents");
jest.mock("components/Item");

describe('<CraftingComponentsPanel />', () => {
  it('should render', () => {
    const { getByTestId, getByText } = render(<CraftingComponentPanel />);
    const select = getByTestId("select");
    const qty = getByTestId("qty");
    const add = getByTestId("button");
    fireEvent.change(select, { target: { value: "GRANDMASTER_FELINE_TROUSERS" } });
    fireEvent.change(qty, { target: { value: "5" } });
    fireEvent.click(add);
    const change = getByText("change");
    const remove = getByText("delete");
    const plus = getByText("plus");
    const minus = getByText("minus");
    fireEvent.click(change);
    fireEvent.click(plus);
    fireEvent.click(minus);
    fireEvent.click(remove);
  });
});