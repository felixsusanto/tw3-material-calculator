import * as React from "react";
import styled from "styled-components";
import SelectComponents, { Select, SelectWrapper } from "components/SelectComponents";
import _ from "lodash";
import Item from "components/Item";
import { selectOptions } from "features/selectOptions";
import Empty from "components/Empty";
import * as gtag from 'analytics/analytics';

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

class CraftingComponentPanel extends React.Component {
  state: MyState = {
    qty: 1,
    componentName: "",
    craftingComponents: []
  };

  onSelectChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    this.setState({ componentName: e.currentTarget.value });
    gtag.gaSendChange(true, 'components', e.currentTarget.value);
  };
  onQtyChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    const qty = +e.currentTarget.value;
    gtag.gaSendChange(true, 'quantity', e.currentTarget.value); 
    this.setState({ qty });
  };
  onAdd = () => {
    const clone = _.cloneDeep(this.state.craftingComponents);
    clone.push([this.state.componentName, this.state.qty]);
    gtag.gaSendAdd(this.state.componentName, this.state.qty);
    this.setState({ craftingComponents: clone });
  };
  onPlusHandler = (newQty: number, index: number) => {
    const clone = _.cloneDeep(this.state);
    const newValidatedQty = Math.min(newQty, 10);
    clone.craftingComponents[index][1] = newValidatedQty;
    gtag.gaSendChange(true, 'plus', newValidatedQty+''); 
    this.setState(clone);
  };
  onMinusHandler = (newQty: number, index: number) => {
    const clone = _.cloneDeep(this.state);
    const newValidatedQty = Math.max(newQty, 1)
    clone.craftingComponents[index][1] = newValidatedQty;
    gtag.gaSendChange(true, 'minus', newValidatedQty+''); 
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
            data-testid="select"
          />
          <SelectWrapper>
            <Select value={this.state.qty} onChange={this.onQtyChange} data-testid="qty">
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
            data-testid="button"
          >
            Add
          </Button>
        </div>
        {!this.state.craftingComponents.length && <Empty placeholder="Component" />}
        {this.state.craftingComponents.map((args, index) => {
          const [name, qty] = args;
          return (
            <Item
              key={index}
              index={index}
              qty={qty}
              name={name} 
              onPlusClick={this.onPlusHandler}
              onMinusClick={this.onMinusHandler}
              onDeleteClick={() => {
                const clone = _.cloneDeep(this.state);
                _.remove(clone.craftingComponents, (elm: CraftingComponent) =>
                  _.isEqual(clone.craftingComponents[index], elm)
                );
                gtag.gaSendRemove(name);
                this.setState(clone);
              }}
              onChangeComponent={(index, val) => {
                const clone = _.cloneDeep(this.state);
                clone.craftingComponents[index][0] = val;
                gtag.gaSendChange(false, 'component', val);
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
