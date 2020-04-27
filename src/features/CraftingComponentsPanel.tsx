import * as React from "react";
import styled from "styled-components";
import SelectComponents, { Select, SelectWrapper } from "components/SelectComponents";
import _ from "lodash";
import Item from "components/Item";
import {
  craftableComponents,
  bwCraftableComponents
} from "data/craftingComponentData";

const CraftingComponentPanelWrapper = styled.div`
  .form {
    * + * {
      margin-left: 5px;
    }
  }
`;
type CraftingComponent = [string, number];
type MyState = { 
  qty: number;
  componentName: string;
  craftingComponents: CraftingComponent[];
};

export const Button = styled.button`
  padding: 10px;
  border: 1px solid #777;
  background: #ddd;
  border-radius: 4px;
  color: #fff;
  background: transparent;
`;

export const selectOptions: [string, string[]][] = [
  ["The Wild Hunt", craftableComponents],
  ["Blood and Wine", bwCraftableComponents]
];

class CraftingComponentPanel extends React.Component {
  state: MyState = {
    qty: 1,
    componentName: "",
    craftingComponents: []
  };

  onSelectChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    this.setState({ componentName: e.currentTarget.value });
  };
  onQtyChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    this.setState({ qty: +e.currentTarget.value });
  };
  onAdd = () => {
    const clone = _.cloneDeep(this.state.craftingComponents);
    clone.push([this.state.componentName, this.state.qty]);
    this.setState({ craftingComponents: clone });
  };
  onItemQtyChange = (index: number, isPlus: boolean) => (newQty: number) => {
    const clone = _.cloneDeep(this.state);
    clone.craftingComponents[index][1] = isPlus
      ? Math.min(newQty, 10)
      : Math.max(newQty, 1);
    this.setState(clone);
  };
  render() {
    return (
      <CraftingComponentPanelWrapper>
        <div className="form">
          <SelectComponents
            value={this.state.componentName}
            onChange={this.onSelectChange}
            options={selectOptions}
          />
          <SelectWrapper>
            <Select value={this.state.qty} onChange={this.onQtyChange}>
              {Array(10)
                .fill("")
                .map((_, i) => {
                  const int = i + 1;
                  return (
                    <option key={i} value={int}>
                      {int}
                    </option>
                  );
                })}
            </Select>
          </SelectWrapper>
          <Button
            onClick={this.onAdd}
            disabled={this.state.componentName === ""}
          >
            Add
          </Button>
        </div>
        {this.state.craftingComponents.map((args, index) => {
          const [name, qty] = args;
          return (
            <Item
              key={index}
              index={index}
              qty={qty}
              name={name} 
              onPlusClick={this.onItemQtyChange(index, true)}
              onMinusClick={this.onItemQtyChange(index, false)}
              onDeleteClick={() => {
                const clone = _.cloneDeep(this.state);
                _.remove(clone.craftingComponents, (elm: CraftingComponent) =>
                  _.isEqual(clone.craftingComponents[index], elm)
                );
                this.setState(clone);
              }}
              onChangeComponent={(index, val) => {
                const clone = _.cloneDeep(this.state);
                clone.craftingComponents[index][0] = val;
                this.setState(clone);
              }}
            />
          );
        })}
      </CraftingComponentPanelWrapper>
    );
  }
}

export default CraftingComponentPanel;
