import React from 'react';
export default (props: any) => {
  const { index, qty, onDeleteClick, onPlusClick, onMinusClick, onChangeComponent, ...rest } = props;
  return (
    <div {...rest}>
      <div onClick={() => onPlusClick(qty+1, index)}>plus</div>
      <div onClick={() => onMinusClick(qty-1, index)}>minus</div>
      <div onClick={() => onDeleteClick()}>delete</div>
      <div onClick={() => onChangeComponent(index, "a")}>change</div>
    </div>
  );
};