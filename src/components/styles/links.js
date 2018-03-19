import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Nav = styled.ul`
  display: flex;
  height: 25px;
  align-items: center;
  list-style: none;
  background-color: blue;
`;

export const StyleLink = styled(Link)`
  flex: 1;
  padding-right: 30px;
  color: red;
  font-size: 16px;
  text-decoration: none;
`;