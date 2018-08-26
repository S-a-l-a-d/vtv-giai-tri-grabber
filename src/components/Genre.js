// @flow

import React from "react";
import styled from "styled-components";

import GenreItem from "./GenreItem";

const Ul = styled.ul`
  list-style: none;
`;

export default () => (
  <Ul>
    <GenreItem to="/phim">Phim</GenreItem>
    <GenreItem to="/tv-show">TV Show</GenreItem>
  </Ul>
);
