import React from 'react';
import DiagramPanel from 'features/DiagramPanel';
import { render, fireEvent } from '@testing-library/react';
 
jest.mock("components/SelectComponents");
jest.mock("components/Item");
jest.mock("components/Empty");

describe('<DiagramPanel />', () => {
  it('should render', () => {
    const { getByTestId, getByText } = render(<DiagramPanel />);
    const select = getByTestId("select");
    const add = getByTestId("button");
    fireEvent.change(select, { target: { value: "GRANDMASTER_FELINE_TROUSERS" } });
    fireEvent.click(add);
    const change = getByText("change");
    const remove = getByText("delete");
    fireEvent.click(change);
    fireEvent.click(remove);
  });
});