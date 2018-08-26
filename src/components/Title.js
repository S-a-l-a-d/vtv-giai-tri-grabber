// @flow

import React from "react";
import styled from "styled-components";

const Div = styled.div`
  display: inline-block;

  width: 14rem;

  margin: 0 0.5rem 0.5rem 0;
`;
const Img = styled.img`
  width: 14rem;
`;
const SubDiv = styled.div`
  text-align: center;
`;

type Props = {
  name: string,
  cover: string
};

export default ({ name, cover }: Props) => (
  <Div>
    <Img alt={name} src={cover} />
    <SubDiv>{name}</SubDiv>
  </Div>
);
