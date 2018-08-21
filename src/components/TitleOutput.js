// @flow

import React from "react";
import styled from "styled-components";
import { mapProps } from "recompose";

import LinkSection from "./LinkSection";
import PreviewSection from "./PreviewSection";

import { transliterate } from "../common/helpers";
import type { ServerEpisode, ClientEpisode } from "../common/types";

type IncomingProps = {
  data: {
    encryptionKey: string,
    episodes: ServerEpisode[]
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
        id: episode.id,
        name: transliterate(episode.name),
        cover: episode.coverMedium,
        url: episode.files[0].url.replace(
          "playlist.m3u8",
          `chunklist_${resolution}_sleng_${data.encryptionKey}.m3u8`
        ),
        watch: episode.watchLinkV2
      }))
    : []
}));

type OutgoingProps = {
  titleName: string,
  episodes: ClientEpisode[]
};

export default enhance(
  (props: OutgoingProps) =>
    props.episodes.length ? (
      <Div>
        <LinkSection {...props} />
        <PreviewSection episodes={props.episodes} />
      </Div>
    ) : null
);
