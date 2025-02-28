import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  padding: 20px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0;
`;

const Header = ({ children }) => {
  return (
    <HeaderContainer>
      <Title>Inventory Management System</Title>
      {children}
    </HeaderContainer>
  );
};

export default Header;