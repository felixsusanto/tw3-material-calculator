import React from 'react';
import styled from 'styled-components';
import icon from 'assets/tw2_icon_crafting.svg';

const EmptyWrapper = styled.div`
  padding-top: 50px;
  text-align: center;
  img {
    width: 80px;
  }
  b {
    text-transform: uppercase;
  }
`;

const Empty = (props: any) => {
  return <EmptyWrapper>
    <div>
      <img src={icon} alt="crafting icon" />
    </div>
    <p>
      Select a <b>{ props.placeholder || 'item' }</b> and press <b>Add</b> to get started. <br />
      Craftable components are expandable, just tap on the 'plus' sign.
    </p>
  </EmptyWrapper>
}

export default Empty;