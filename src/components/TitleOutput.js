// @flow

import React from "react";
import styled from "styled-components";
import { mapProps } from "recompose";

import LinkSection from "./LinkSection";

import { transliterate } from "../common/helpers";

type IncomingProps = {
  data: {
    encryptionKey: string,
    episodes: {
      name: string,
      files: {
        url: string
      }[],
      coverMedium: string
    }[]
  },
  resolution: string
};

const Div = styled.div`
  text-align: center;
`;

const enhance = mapProps(({ data, resolution }: IncomingProps) => ({
  titleName: Object.keys(data).length
    ? `${transliterate(
        data.episodes[0].name.substring(
          0,
          data.episodes[0].name.indexOf("-") - 1
        )
      )}`
    : "",
  episodes: Object.keys(data).length
    ? data.episodes.map(episode => ({
        name: transliterate(episode.name),
        cover: episode.coverMedium,
        url: episode.files[0].url.replace(
          "playlist.m3u8",
          `chunklist_${resolution}_sleng_${data.encryptionKey}.m3u8`
        )
      }))
    : []
}));

type OutgoingProps = {
  titleName: string,
  episodes: { name: string, cover: string, url: string }[]
};

export default enhance(
  (props: OutgoingProps) =>
    props.episodes.length ? (
      <Div>
        <LinkSection {...props} />
      </Div>
    ) : null
);
