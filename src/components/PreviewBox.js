// @flow

import React from "react";
import styled from "styled-components";
import { onlyUpdateForKeys } from "recompose";

import { VTV_GIAI_TRI_URL } from "../common/constants";

const Img = styled.img`
  width: 14rem;

  margin: 0 0.5rem 0.5rem 0;
`;

const enhance = onlyUpdateForKeys(["id"]);

type Props = {
  id: number,
  name: string,
  cover: string,
  watch: string
};

export default enhance(({ name, cover, watch }: Props) => (
  <a title={name} href={VTV_GIAI_TRI_URL + watch} target="_blank">
    <Img alt={name} src={cover} />
  </a>
));
