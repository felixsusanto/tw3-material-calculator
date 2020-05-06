import React from "react";
import "index.css";
import logo from "assets/logo.png";
import styled from "styled-components";
import Tab from "components/tab";
import CraftingComponentPanel from "features/CraftingComponentsPanel";
import DiagramPanel from "features/DiagramPanel";

const AppWrapper = styled.div`
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  a {
    color: #fff;
  }
  .App {
    flex: 1;
  }
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  .header {
    padding-top: 20px;
    display: flex;
    align-items: center;
    img {
      width: 150px;
    }
    h1 {
      margin-left: 20px;
      font-weight: normal;
      text-transform: uppercase;
    }
  }
  footer {
    text-align: center;
    padding: 10px;
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
      <AppWrapper>
        <div className="App">
          <div className="container">
            <div className="header">
              <div>
                <img src={logo} alt="Witcher 3 - the Wild Hunt" />
              </div>
              <h1>Material Calculator</h1>
            </div>
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
        </div>
        <footer>
          Created by{' '}
          <a 
            href="https://github.com/felixsusanto"
            rel="external no follow"
          >
            felixsusanto
          </a>.{' '}
          Witcher 3, logo &amp; icons are the property of CD PROJEKT RED <br />
          List is incomplete, any help would be appreciated at {' '}
          <a href="https://github.com/felixsusanto/tw3-material-calculator"
            rel="external no follow"
          >
            GitHub
          </a>
        </footer>
      </AppWrapper>
    );
  }
}

export default App;
