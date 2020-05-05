import React from 'react';

export const Select = (props: any) => {
  const {children, ...rest} = props;
  return <select {...rest}>{children}</select>
};
export const SelectWrapper = (props: any) => <div>{props.children}</div>;
export default (props: any) => (
  <select {...props}>
    <option value="a">a</option>
    <option value="GRANDMASTER_FELINE_TROUSERS">GRANDMASTER_FELINE_TROUSERS</option>
  </select>
);