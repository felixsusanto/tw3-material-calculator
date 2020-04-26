import React from "react";
import { util } from "./CraftingMaterial";
import styled from "styled-components";

export const Select = styled.select`
  background: transparent;
  -webkit-appearance: none;
  color: #fff;
  border: 1px solid #777;
  border-radius: 4px;
  padding: 10px;
  padding-right: 20px;
  option,
  optgroup {
    color: black;
  }
`;
export const SelectWrapper = styled.div`
  display: inline-block;
  position: relative;
  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-bottom: none;
    border-top-color: #fff;
    right: 10px;
    top: 50%;
    margin-top: -3px;
  }
`;

type OptGroup = string;

type SelectCompProps = React.DOMAttributes<HTMLSelectElement> & {
  placeholder?: string;
  value?: string;
  options?: [OptGroup, string[]][];
};

const SelectComponents = (props: SelectCompProps) => {
  return (
    <SelectWrapper>
      <Select {...props}>
        <option value="">{props.placeholder || "Select Component"}</option>
        {props.options?.map((el) => {
          const [optGroupLabel, goods] = el;
          return (
            <optgroup label={optGroupLabel}>
              {goods.map((el: string) => {
                return <option key={el} value={el}>{util.titleCase(el)}</option>;
              })}
            </optgroup>
          );
        })}
      </Select>
    </SelectWrapper>
  );
};


export default SelectComponents;
