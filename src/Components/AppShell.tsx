import React from 'react';
import Header from './Header';
import styled from 'styled-components';
import Nav from './Nav';

type Props = {
  children?: React.ReactNode;
};

const AppShell = (props: Props) => {
  return (
    <>
      <Header username="" />
      <Container>
        <Nav />
        <Content>{props.children}</Content>
      </Container>
    </>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
`;

const Content = styled.div`
  padding-right: 24px;
  padding-left: 24px;
  flex: 1;
`;

export default AppShell;
