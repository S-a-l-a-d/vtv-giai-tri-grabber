// @flow

import React from "react";
import styled from "styled-components";

import { VTV_GIAI_TRI_URL } from "../common/constants";

const Img = styled.img`
  width: 14rem;

  margin: 0 0.5rem 0.5rem 0;
`;

type Props = {
  name: string,
  cover: string,
  url: string,
  watch: string
};

export default ({ name, cover, url, watch }: Props) => (
  <a title={name} href={VTV_GIAI_TRI_URL + watch} target="_blank">
    <Img alt={name} src={cover} />
  </a>
);
