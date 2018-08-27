// @flow

import React from "react";
import { compose, pure, mapProps } from "recompose";

import LinkBox from "./LinkBox";

import { transliterate } from "../common/helpers";

const enhance = compose(
  pure,
  mapProps(({ data, resolution }: any) => ({
    episodes: Object.keys(data).length
      ? data.episodes.map(episode => ({
          id: episode.id,
          name: episode.name
            ? transliterate(episode.name)
            : transliterate(data.title),
          url: episode.files[0].url.replace(
            "playlist.m3u8",
            `chunklist_${resolution}_sleng_${data.encryptionKey}.m3u8`
          )
        }))
      : []
  }))
);

type OutgoingProps = {
  episodes: { id: number, name: string, url: string }[]
};

export default enhance(
  ({ episodes }: OutgoingProps) =>
    episodes.length ? (
      <div>
        <LinkBox
          content={episodes
            .map(episode => episode.url)
            .reduce((prev, curr) => `${prev}\r\n${curr}`)}
          filename={"links.txt"}
        />
        <LinkBox
          content={episodes
            .map(
              episode =>
                `ffmpeg -i "${episode.url}" -vcodec "copy" -acodec "copy" "${
                  episode.name
                }.mkv"`
            )
            .reduce((prev, curr) => `${prev}\r\n${curr}`, "@echo off\r\n")}
          filename={"script.cmd"}
        />
        <LinkBox
          content={episodes
            .map(
              episode =>
                `ffmpeg -i '${episode.url}' -vcodec 'copy' -acodec 'copy' '${
                  episode.name
                }.mkv'`
            )
            .reduce((prev, curr) => `${prev}\n${curr}`, "#!/bin/bash\n")}
          filename={"script.sh"}
        />
      </div>
    ) : (
      <div>
        <LinkBox content={""} filename={"links.txt"} />
        <LinkBox content={""} filename={"script.cmd"} />
        <LinkBox content={""} filename={"script.sh"} />
      </div>
    )
);
