import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Nav from './Nav';
import useAppData from '../hooks/useAppData';

type Props = {
  children?: React.ReactNode;
};

const AppShell = ({ children }: Props) => {
  const { applicationId } = useAppData();
  return (
    <>
      <Header applicationId={applicationId} />
      <Container>
        <Nav />
        <Content>{children}</Content>
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

export default React.memo(AppShell);
