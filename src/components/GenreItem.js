// @flow

import React from "react";
import type { Node } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Li = styled.li`
  display: inline;
  margin-right: 0.5rem;
`;
const StyledNavLink = styled(NavLink)`
  color: #babebd;

  text-decoration: none;
  text-transform: uppercase;

  padding-bottom: 2px;

  border-bottom: 5px solid #babebd;

  &.active,
  &:hover {
    color: #606866;

    border-bottom: 5px solid #606866;
  }
`;

type Props = {
  to: string,
  children?: Node
};

export default ({ to, children }: Props) => (
  <Li>
    <StyledNavLink to={to}>{children}</StyledNavLink>
  </Li>
);
