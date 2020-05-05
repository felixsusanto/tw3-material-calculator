import React from 'react';
import Item from 'components/Item';
import { render, fireEvent } from '@testing-library/react';
import SelectComponents from "components/SelectComponents";

jest.mock('components/SelectComponents', () => jest.fn());
describe('<Item />', () => {
  it('should render', () => {
    (SelectComponents as jest.Mock<any>)
      .mockImplementation((props) => (
          <select {...props}>
            <option value="a">a</option>
          </select>
        ))
      ;
    const plus = jest.fn();
    const minus = jest.fn();
    const remove = jest.fn();
    const change = jest.fn();
    const { getByText, getByTestId } = render(
      <Item
        index={1}
        qty={1}
        name="name"
        onPlusClick={plus}
        onMinusClick={minus}
        onDeleteClick={remove}
        onChangeComponent={change}
      />
    );
    const getEdit = getByText("Edit");
    const getPlus = getByTestId("plus");
    const getMinus = getByTestId("minus");
    const getClose = getByTestId("close");
    const getDelete = getByTestId("delete");
    const getSelect = getByTestId("select");
    fireEvent.click(getEdit);
    fireEvent.click(getPlus);
    fireEvent.click(getMinus);
    fireEvent.click(getClose);
    fireEvent.click(getEdit);
    fireEvent.click(getDelete);
    fireEvent.change(getSelect, { target: {value: 'a'}});
  });
});