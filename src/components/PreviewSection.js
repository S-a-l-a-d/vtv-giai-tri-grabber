// @flow

import React from "react";
import styled from "styled-components";

import PreviewBox from "./PreviewBox";

const Div = styled.div`
  text-align: initial;
`;

type Props = {
  episodes: { id: number, name: string, cover: string, url: string }[]
};

export default ({ episodes }: Props) => (
  <div>
    <h2>Không nhớ coi tới đâu rồi hả? Xuống dưới bấm coi thử nhé.</h2>
    <Div>
      {episodes.map(({ id, name, cover, url }) => (
        <PreviewBox key={id} name={name} cover={cover} url={url} />
      ))}
    </Div>
  </div>
);
