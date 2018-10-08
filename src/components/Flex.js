import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;

  ${props => props.fillHeight ? 'height: 100%;' : ''}
  ${props => props.fillWidth ? 'width: 100%;' : ''}
`;

export const Row = styled(Flex)`
  flex-direction: row;
`;

export const RowJustifiedCenter = styled(Row)`
  justify-content: center;
`;

export const RowAlignedCenter = styled(Row)`
  align-items: center;
`;

export const Column = styled(Flex)`
  flex-direction: column;
`;

export const Centered = styled(Flex)`
  justify-content: center;
  align-items: center;
`;
