import styled from "styled-components";

const Tab = styled.div`
  padding: 5px 15px;
  border-radius: 5px 5px 0 0;
  display: inline-block;
  border: 1px solid #777;
  border-bottom: none;
  position: relative;
  z-index: 1;
  top: 1px;
  cursor: pointer;
  &.active {
    border-bottom: 1px solid #000;
  }
`;

export default Tab;
