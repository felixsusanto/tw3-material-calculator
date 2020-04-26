import React, { createContext } from "react";
import SelectComponents from "./SelectComponents";
import { bwArmorSelect } from "./diagramData";
import { Button } from "./CraftingComponentsPanel";
import _ from "lodash";
import styled from "styled-components";
import Item from "./Item";
import { selectOptions } from "./CraftingComponentsPanel";
const PanelWrapper = styled.div`
  .form {
    * + * {
      margin-left: 5px;
    }
  }
`;

const defaultContextValue = {
  qtyApplicable: true,
  selectOptions
};

export const DiagramContext = createContext(defaultContextValue);
export const diagramSelectOptions: [string, string[]][] = [
  ["The Wild Hunt", bwArmorSelect]
];

class DiagramPanel extends React.Component {
  state = {
    name: "",
    diagrams: []
  };

  onSelectChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    this.setState({ name: e.currentTarget.value });
  };
  onAdd = () => {
    const clone = _.cloneDeep(this.state.diagrams);
    clone.push(this.state.name);
    this.setState({ diagrams: clone });
  };

  render() {
    return (
      <PanelWrapper>
        <div className="form">
          <SelectComponents
            value={this.state.name}
            onChange={this.onSelectChange}
            placeholder="Select Diagram"
            options={diagramSelectOptions}
          />
          <Button onClick={this.onAdd} disabled={this.state.name === ""}>
            Add
          </Button>
        </div>
        <DiagramContext.Provider
          value={{
            qtyApplicable: false,
            selectOptions: diagramSelectOptions
          }}
        >
          {this.state.diagrams.map((name, index) => {
            return (
              <Item
                key={index}
                index={index}
                qty={1}
                name={name}
                onPlusClick={console.log}
                onMinusClick={console.log}
                onDeleteClick={() => {
                  const clone = _.cloneDeep(this.state);
                  _.remove(clone.diagrams, (elm: string) => elm === name);
                  this.setState(clone);
                }}
                onChangeComponent={(index, val) => {
                  const clone = _.cloneDeep(this.state);
                  clone.diagrams[index] = val;
                  this.setState(clone);
                }}
              />
            );
          })}
        </DiagramContext.Provider>
      </PanelWrapper>
    );
  }
}

export default DiagramPanel;
