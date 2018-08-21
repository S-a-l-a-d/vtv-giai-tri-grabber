// @flow

import React from "react";

import LinkBox from "./LinkBox";

import type { ClientEpisode } from "../common/types";

type OutgoingProps = {
  episodes: ClientEpisode[]
};

export default ({ episodes }: OutgoingProps) => (
  <div>
    <LinkBox
      heading="Danh sách liên kết"
      content={episodes
        .map(episode => episode.url)
        .reduce((prev, curr) => `${prev}\r\n${curr}`)}
      filename={"links.txt"}
    />
    <LinkBox
      heading="Không biết làm gì với đống đó hả? Thôi cho cái này nè."
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
      heading="Ủa xài Linux à? Vậy thôi lấy cái này đi."
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
);
