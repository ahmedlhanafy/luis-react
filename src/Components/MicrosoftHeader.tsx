import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type Props = {
  username: string;
};

const MicrosoftHeader = (props: Props) => (
  <Container>
    <Item to="/">Language Understanding</Item>
    <Item to="/">My Apps</Item>
    <Item to="#">Docs</Item>
    <Item to="#">Pricing</Item>
    <Item to="#">Support</Item>
    <Item to="#">About</Item>
    <Spacer />
    <Item to="#">{props.username}</Item>
  </Container>
);

const Item = styled(Link)`
  height: 100%;
  align-items: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  transition: background-color 0.2s;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: #393939;
  }
`;

const Spacer = styled.span`
  flex: 1;
`;

const Container = styled.header`
  margin: 0;
  background: #2b2b2b;
  flex-shrink: 0;
  height: 48px;
  align-items: center;
  display: flex;
`;

export default MicrosoftHeader;
