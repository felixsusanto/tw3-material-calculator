import React from "react";
import "index.css";
import logo from "assets/logo.png";
import styled from "styled-components";
import Tab from "components/tab";
import CraftingComponentPanel from "features/CraftingComponentsPanel";
import DiagramPanel from "features/DiagramPanel";
import * as gtag from 'analytics/analytics';

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
    padding: 10px;
  }
  .header {
    padding-top: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    img {
      width: 150px;
    }
    h1 {
      font-size: 18px;
      font-weight: normal;
      text-transform: uppercase;
      margin-top: 0;
    }
    @media(min-width: 768px) {
      flex-direction: row;
      h1 {
        margin-top: 12px;
        margin-left: 20px;
        font-size: 2em;
      }
    }
  }
  footer {
    text-align: center;
    padding: 10px;
  }
  .sml-mobile {
    @media(max-width: 767px) {
      font-size: 0.8rem;
    }
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
                const label = e.replace(/_/g, " ");
                return (
                  <Tab
                    key={i}
                    className={`${this.state.tabActive === e ? "active" : ""}`}
                    onClick={() => {
                      this.setState({ tabActive: e });
                      gtag.gaSendTab(label);
                    }}
                    data-testid={Tabs[i]}
                  >
                    {label}
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
        <footer className="sml-mobile">
          Created by{' '}
          <a 
            href="https://github.com/felixsusanto"
            rel="external no follow"
            onClick={(e) => {
              e.preventDefault();
              gtag.getOutboundLink("https://github.com/felixsusanto");
            }}
          >
            felixsusanto
          </a>.<br />
          Witcher 3, logo &amp; icons are the property of CD PROJEKT RED <br />
          Diagram List is incomplete, any contribution would be appreciated at {' '}
          <a href="https://github.com/felixsusanto/tw3-material-calculator"
            rel="external no follow"
            onClick={(e) => {
              e.preventDefault();
              gtag.getOutboundLink("https://github.com/felixsusanto/tw3-material-calculator");
            }}
          >
            GitHub
          </a>
        </footer>
      </AppWrapper>
    );
  }
}

export default App;
