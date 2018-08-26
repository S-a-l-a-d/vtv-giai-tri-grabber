// @flow

import React from "react";
import styled from "styled-components";
import { onlyUpdateForKeys } from "recompose";

import { VTV_GIAI_TRI_URL } from "../common/constants";

const A = styled.a`
  color: #000;

  text-decoration: none;

  &:hover {
    color: #00f;
  }
`;
const Div = styled.div`
  display: inline-block;
  width: 14rem;

  margin: 0 0.5rem 0.5rem 0;
`;
const Img = styled.img`
  width: 14rem;
`;

const enhance = onlyUpdateForKeys(["id"]);

type Props = {
  name: string,
  cover: string,
  watch: string
};

export default enhance(({ name, cover, watch }: Props) => (
  <A href={VTV_GIAI_TRI_URL + watch} target="_blank">
    <Div>
      <Img alt={name} src={cover} />
      <div>{name}</div>
    </Div>
  </A>
));
