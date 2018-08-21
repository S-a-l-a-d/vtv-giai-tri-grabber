// @flow

import React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 14rem;

  margin: 0 0.5rem 0.5rem 0;
`;

type Props = {
  name: string,
  cover: string,
  url: string
};

export default ({ name, cover, url }: Props) => <Img alt={name} src={cover} />;
