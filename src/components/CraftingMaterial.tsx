import React, { useState } from "react";
import _ from "lodash";
import styled from "styled-components";
import numeral from "numeral";
import data from "data/craftingComponentData";
import { RequiredItem, CraftableItem } from "data/typeData";

const CraftingMaterialWrapper = styled.div`
  display: flex;
  background: #232017;
  color: #fff;
  .fa {
    font-size: 0.7em;
    width: 2em;
  }
  &.root {
    padding: 20px;
    padding-top: 30px;
  }
  .name-container {
    display: flex;
    flex: 0 0 160px;
    flex-wrap: nowrap;
    > div {
      flex: 0 0 160px;
    }
    .name-text {
      display: flex;
      padding-right: 10px;
      cursor: pointer;
      > div:first-child {
        margin-right: 10px;
      }
    } 
  }
  main {
    flex: 0 1 160px;
    text-transform: uppercase;
    text-align: center;
    padding-right: 20px;
  }
  aside {
    &.root-aside {
      overflow-x: auto;
    }
    flex: 1;
    padding-left: 10px;
    border-left: 1px solid #555;
    .total-qty {
      flex: 0 0 30px;
    }
  }
  .or {
    display: flex;
    text-align: center;
    align-items: center;
    &::before,
    &::after {
      content: "";
      margin: 10px;
      flex: 1;
      display: block;
      height: 1px;
      background: #555;
    }
  }
  .bold {
    font-weight: bold;
  }
  .monospace {
    font-family: monospace;
    margin-right: 5px;
  }
  .active {
    opacity: 0.5;
  }
`;

type CompProps = {
  name: string;
  isRoot: boolean;
  qty: number;
  style?: any;
  qtyNotApplicable?: boolean;
};

export const util = {
  titleCase: (str: string) => {
    return str
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\S/g, m => {
        return m.toUpperCase();
      });
  }
};

interface CompState {
  activeIndex: number[];
}

const CraftingMaterial = (props: CompProps) => {
  const materialsData: CraftableItem[] = _.filter(data, {
    name: props.name
  });
  const initState: CompState = {
    activeIndex: []
  };
  const [state, setState] = useState(initState);
  console.log(materialsData);
  if (!materialsData.length) return null;
  return (
    <CraftingMaterialWrapper
      style={props.style}
      className={`${props.isRoot ? "root" : ""}`}
    >
      {props.isRoot && (
        <main>
          <div className="img-wrapper">
            <img src={materialsData[0].img} alt={props.name} />
          </div>
          <div className="name">{util.titleCase(props.name)}</div>
          {!props.qtyNotApplicable && (
            <div className="qty">&times; {numeral(props.qty).format("00")}</div>
          )}
        </main>
      )}
      <aside className={`${props.isRoot ? "root-aside" : ""}`}>
        {materialsData.map((materialData, mIndex) => {
          return (
            <React.Fragment key={mIndex}>
              {mIndex > 0 && <div className="or"> or </div>}
              {materialData.req.map((obj: RequiredItem, i: number) => {
                const currIndex = mIndex * 10 + i;
                const indexIsActive =
                  _.findIndex(
                    state.activeIndex,
                    (e: number) => e === currIndex
                  ) !== -1;
                const totalQty = obj.qty * props.qty;
                const objectCraftable = !!_.find(data, { name: obj.name });
                return (
                  <div key={currIndex}>
                    <div className="img-wrapper">
                      {/* <img src={obj.img} alt={obj.name} /> */}
                    </div>
                    <div className="name-container">
                      <div
                        className={`name-text ${
                          objectCraftable && !indexIsActive
                            ? "bold"
                            : objectCraftable
                            ? "active"
                            : ""
                        }`}
                        onClick={() => {
                          const clone: CompState = _.cloneDeep(state);
                          if (indexIsActive) {
                            _.remove(
                              clone.activeIndex,
                              (el: number) => el === currIndex
                            );
                          } else {
                            clone.activeIndex.push(currIndex);
                          }
                          setState(clone);
                        }}
                      >
                        <div className="total-qty">
                          &times;&nbsp;{numeral(totalQty).format("00")}
                        </div>
                        <div>
                          {objectCraftable ? (
                            indexIsActive ? (
                              <i className="fa fa-fw fa-minus-square" />
                            ) : (
                              <i className="fa fa-fw fa-plus-square" />
                            )
                          ) : (
                            <i className="fa fa-fw fa-check-square" />
                          )}
                        </div>
                        <div>{util.titleCase(obj.name)}</div>
                      </div>
                      {objectCraftable && indexIsActive && (
                        <CraftingMaterial
                          isRoot={false}
                          name={obj.name}
                          qty={totalQty}
                          style={{ flex: "1" }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
      </aside>
    </CraftingMaterialWrapper>
  );
};

export default CraftingMaterial;
