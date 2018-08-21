// @flow

import React from "react";
import styled from "styled-components";

type Props = {
  episodes: { id: number, name: string, cover: string, url: string }[]
};

export default ({ episodes }: Props) => (
  <div>
    <h2>Không nhớ coi tới đâu rồi hả? Xuống dưới bấm coi thử nhé.</h2>
    {episodes.map(episode => (
      <img key={episode.id} alt={episode.name} src={episode.cover} />
    ))}
  </div>
);
