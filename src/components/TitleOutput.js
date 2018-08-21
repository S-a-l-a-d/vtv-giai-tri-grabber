// @flow

import React from "react";
import styled from "styled-components";
import { mapProps } from "recompose";

import Box from "./Box";

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
  ({ titleName, episodes }: OutgoingProps) =>
    episodes.length ? (
      <Div>
        <Box
          heading="Danh sách liên kết"
          content={episodes
            .map(episode => episode.url)
            .reduce((prev, curr) => `${prev}\n${curr}`)}
          filename={`${titleName}.txt`}
        />
        <Box
          heading="Không biết làm gì với đống đó hả? Thôi cho cái này nè."
          content={episodes
            .map(
              episode =>
                `ffmpeg -i "${episode.url}" -vcodec "copy" -acodec "copy" "${
                  episode.name
                }.mp4"`
            )
            .reduce((prev, curr) => `${prev}\r\n${curr}`, "@echo off\r\n")}
          filename={`${titleName}.cmd`}
        />
        <Box
          heading="Ủa xài Linux à? Vậy thôi lấy cái này đi."
          content={episodes
            .map(
              episode =>
                `ffmpeg -i '${episode.url}' -vcodec 'copy' -acodec 'copy' '${
                  episode.name
                }.mp4'`
            )
            .reduce((prev, curr) => `${prev}\n${curr}`, "#!/bin/bash\n")}
          filename={`${titleName}.sh`}
        />
      </Div>
    ) : null
);
