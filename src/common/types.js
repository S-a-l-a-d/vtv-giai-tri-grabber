// @flow

export type ServerEpisode = {
  id: number,
  name: string,
  files: {
    url: string
  }[],
  coverMedium: string,
  watchLinkV2: string
};

export type ClientEpisode = {
  id: number,
  name: string,
  cover: string,
  url: string,
  watch: string
};

export type ServerTitle = {
  id: number,
  seasonId: number,
  title: string,
  description: string,
  backgroundImage: string
};
