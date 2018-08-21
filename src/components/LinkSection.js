// @flow

import React from "react";

import LinkBox from "./LinkBox";

type OutgoingProps = {
  titleName: string,
  episodes: { name: string, cover: string, url: string }[]
};

export default ({ titleName, episodes }: OutgoingProps) => (
  <div>
    <LinkBox
      heading="Danh sách liên kết"
      content={episodes
        .map(episode => episode.url)
        .reduce((prev, curr) => `${prev}\r\n${curr}`)}
      filename={`${titleName}.txt`}
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
      filename={`${titleName}.cmd`}
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
      filename={`${titleName}.sh`}
    />
  </div>
);
