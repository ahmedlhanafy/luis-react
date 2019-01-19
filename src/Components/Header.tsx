import React, { useState } from 'react';
import styled from 'styled-components';
import { DefaultButton } from 'office-ui-fabric-react';

type Props = {
  username: string;
};

const Header = (props: Props) => {
  const [selected, setSelected] = useState(1);
  return (
    <Container>
      <AppName>
        LUIS App <small>&nbsp;(0.1)</small>
      </AppName>
      <Spacer />
      <Item active={selected === 0} onClick={() => setSelected(0)}>
        Dashboard
      </Item>
      <Item active={selected === 1} onClick={() => setSelected(1)}>
        Build
      </Item>
      <Item active={selected === 2} onClick={() => setSelected(2)}>
        Manage
      </Item>
      <Button text="Train" />
      <Button text="Test" />
      <Button text="Publish" />
    </Container>
  );
};

type ItemProps = {
  active?: boolean;
};

const TrainingDot = styled.span`
  display: inline-block;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  margin-left: -5px;
  margin-right: 5px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.16);
  background-color: #6bb700;
`;

const Button = styled(DefaultButton)`
  margin: 0 12px;
  border-radius: 3px;
`;

const Item = styled.a`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  transition: background-color 0.2s;
  text-transform: uppercase;
  position: relative;
  cursor: pointer;
  background-color: ${(props: ItemProps) =>
    props.active && 'rgba(118,118,118,.3)'};
  &:hover {
    background-color: rgba(118, 118, 118, 0.3);
  }
  &::after {
    content: ' ';
    position: absolute;
    height: 5px;
    opacity: ${(props: ItemProps) => (props.active ? 1 : 0)};
    background-color: #0078d7;
    bottom: 0;
    left: 0;
    right: 0;
    transition: opacity 0.2s;
  }
`;

const AppName = styled.a`
  height: 100%;
  align-items: center;
  padding: 0 12px;
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  small {
    font-size: 80%;
  }
`;

const Spacer = styled.span`
  flex: 1;
`;

const Container = styled.header`
  margin: 0;
  background: #393939;
  height: 52px;
  align-items: center;
  display: flex;
`;

export default Header;
