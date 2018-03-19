import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Nav = styled.ul`
  display: flex;
  height: 35px;
  align-items: center;
  list-style: none;
  background-color: gray;
`;

export const StyleLink = styled(Link)`
  flex: 1;
  padding-right: 30px;
  padding-left: 30px;
  color: white;
  font-size: 16px;
  text-decoration: none;
`;