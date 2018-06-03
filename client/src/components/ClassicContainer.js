import styled from 'styled-components';

const ClassicContainer = styled.div`
  display: block;
  width: 100%;
  max-width: ${props => props.theme.maxWidth}
  margin-left: auto;
  margin-right: auto;
  margin-top: 4em;
  padding: 1em;
  box-sizing: border-box;
`;

export default ClassicContainer;
