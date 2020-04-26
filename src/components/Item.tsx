import React, { useState } from "react";
import CraftingMaterial from "./CraftingMaterial";
import { CraftingComponentNameStrings } from "./typeData";
import SelectComponents from "./SelectComponents";
import styled from "styled-components";
import { DiagramContext } from "./DiagramPanel";

const ItemWrapper = styled.div`
  margin: 10px 0;
  .cta-wrapper {
    display: none;
    margin-bottom: 10px;
    justify-content: space-between;
    &.edit-active {
      display: flex;
    }
  }
  .crafting-container {
    color: #fff;
    position: relative;
    .edit {
      position: absolute;
      top: 5px;
      left: 20px;
    }
  }
`;
const Cta = styled.div`
  display: inline-block;
  padding: 4px 14px;
  border: 1px solid #777;
  border-radius: 3px;
  user-select: none;
  cursor: pointer;
`;
type ItemProps = {
  index: number;
  qty: number;
  name: string;
  onPlusClick: (v: number) => void;
  onMinusClick: (v: number) => void;
  onDeleteClick: (index: number) => void;
  onChangeComponent: (index: number, v: CraftingComponentNameStrings) => void;
};

const Item = (props: ItemProps) => {
  const { index, qty, name } = props;
  const [isEditing, setState] = useState(false);
  const { qtyApplicable, selectOptions } = React.useContext(DiagramContext);
  return (
    <ItemWrapper>
      <div className={`cta-wrapper ${isEditing ? "edit-active" : ""}`}>
        {qtyApplicable && (
          <div>
            <Cta
              onClick={() => {
                const res = Math.min(qty + 1, 10);
                props.onPlusClick(res);
              }}
            >
              <i className="fa fa-plus fa-fw fa-sm" />
            </Cta>
            <Cta
              onClick={() => {
                const res = Math.max(qty - 1, 1);
                props.onMinusClick(res);
              }}
            >
              <i className="fa fa-minus fa-fw fa-sm" />
            </Cta>
          </div>
        )}
        <div>
          <SelectComponents
            onChange={e => {
              props.onChangeComponent(index, e.currentTarget
                .value as CraftingComponentNameStrings);
            }}
            placeholder="Change Component"
            options={selectOptions}
          />
        </div>
        <div>
          <Cta
            onClick={() => {
              setState(false);
            }}
          >
            <i className="fa fa-times fa-fw fa-sm" />
          </Cta>
          <Cta
            onClick={() => {
              props.onDeleteClick(index);
            }}
          >
            <i className="fa fa-trash fa-fw fa-sm" />
          </Cta>
        </div>
      </div>
      <div className="crafting-container">
        <div className="edit" onClick={() => setState(!isEditing)}>
          <i className="fa fa-edit fa-sm" /> <small>Edit</small>
        </div>
        <CraftingMaterial
          name={name}
          qty={qty}
          isRoot
          qtyNotApplicable={!qtyApplicable}
        />
      </div>
    </ItemWrapper>
  );
};

export default Item;
