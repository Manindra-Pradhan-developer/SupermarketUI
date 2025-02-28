import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 20px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2025 Inventory Management System</p>
    </FooterContainer>
  );
};

export {Footer};