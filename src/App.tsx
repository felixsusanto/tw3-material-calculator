import * as React from "react";
import "index.css";
import styled from "styled-components";
import Tab from "components/tab";
import CraftingComponentPanel from "features/CraftingComponentsPanel";
import DiagramPanel from "features/DiagramPanel";

const AppWrapper = styled.div`
  color: #fff;
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .tabs,
  .form {
    * + * {
      margin-left: 5px;
    }
  }
  .tabs {
    margin-bottom: 10px;
    border-bottom: 1px solid #777;
  }
`;
type MyState = {
  tabActive: string;
};

enum TabVariant {
  DIAGRAM,
  CRAFTING_COMPONENTS
}

const Tabs: (keyof typeof TabVariant)[] = ["DIAGRAM", "CRAFTING_COMPONENTS"];

class App extends React.Component {
  state: MyState = {
    tabActive: Tabs[0]
  };

  render() {
    const { tabActive } = this.state;
    return (
      <div className="App">
        <AppWrapper>
          <div className="container">
            <div className="tabs">
              {Tabs.map((e, i) => {
                return (
                  <Tab
                    key={i}
                    className={`${this.state.tabActive === e ? "active" : ""}`}
                    onClick={() => this.setState({ tabActive: e })}
                    data-testid={Tabs[i]}
                  >
                    {e.replace(/_/g, " ")}
                  </Tab>
                );
              })}
            </div>
            {tabActive === Tabs[TabVariant.DIAGRAM] && <DiagramPanel />}
            {tabActive === Tabs[TabVariant.CRAFTING_COMPONENTS] && (
              <CraftingComponentPanel />
            )}
          </div>
        </AppWrapper>
      </div>
    );
  }
}

export default App;
