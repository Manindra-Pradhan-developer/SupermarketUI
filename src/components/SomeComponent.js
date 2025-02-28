import styled from 'styled-components';

const SomeComponent = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`;

export default SomeComponent;