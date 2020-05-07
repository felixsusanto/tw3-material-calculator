import React, { createContext } from "react";
import SelectComponents from "components/SelectComponents";
import { bwArmorSelect } from "data/diagramData";
import { Button } from "./CraftingComponentsPanel";
import _ from "lodash";
import styled from "styled-components";
import Item from "components/Item";
import { selectOptions } from "features/selectOptions";
import Empty from "components/Empty";
import * as gtag from 'analytics/analytics';

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
  ["Blood and Wine", bwArmorSelect]
];
type CompState = {
  name: string;
  diagrams: string[];
}
class DiagramPanel extends React.Component {
  state: CompState = {
    name: "",
    diagrams: []
  };

  onSelectChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    this.setState({ name: e.currentTarget.value });
    gtag.gaSendChange(true, 'diagram', e.currentTarget.value);
  };
  onAdd = () => {
    const clone = _.cloneDeep(this.state.diagrams);
    clone.push(this.state.name);
    gtag.gaSendAdd(this.state.name, 1);
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
            data-testid="select"
          />
          <Button 
            onClick={this.onAdd} 
            disabled={this.state.name === ""}
            data-testid="button"
          >
            Add
          </Button>
        </div>
        <DiagramContext.Provider
          value={{
            qtyApplicable: false,
            selectOptions: diagramSelectOptions
          }}
        >
          {!this.state.diagrams.length && <Empty placeholder="Diagram" />}
          {this.state.diagrams.map((name, index) => {
            return (
              <Item
                key={index}
                index={index}
                qty={1}
                name={name}
                onDeleteClick={() => {
                  const clone = _.cloneDeep(this.state);
                  _.remove(clone.diagrams, (elm: string) => elm === name);
                  gtag.gaSendRemove(name);
                  this.setState(clone);
                }}
                onChangeComponent={(index, val) => {
                  const clone = _.cloneDeep(this.state);
                  clone.diagrams[index] = val;
                  gtag.gaSendChange(false, 'diagram', val);
                  this.setState(clone);
                }}
                data-testid="item"
              />
            );
          })}
        </DiagramContext.Provider>
      </PanelWrapper>
    );
  }
}

export default DiagramPanel;
