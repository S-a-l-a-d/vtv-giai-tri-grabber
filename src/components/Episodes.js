// @flow

import React from "react";
import { compose, withState, withHandlers, lifecycle } from "recompose";
import NProgress from "nprogress";

import Episode from "./Episode";

import type {
  ServerEpisode,
  ClientEpisode,
  ServerTitle
} from "../common/types";
import { API_PATH } from "../common/constants";

const enhance = compose(
  withState("title", "updateTitle", {}),
  withState("episodes", "updateEpisodes", {}),
  withHandlers({
    bindTitle: props => title => {
      props.updateTitle(title);
    },
    bindEpisodes: props => episodes => {
      props.updateEpisodes(episodes);
    }
  }),
  lifecycle({
    async componentDidMount() {
      NProgress.start();

      const {
        id,
        seasonId,
        title,
        backgroundImage
      }: ServerTitle = await (await fetch(
        `${API_PATH}/titles/${this.props.match.params.id}?genre=${
          this.props.genre
        }`
      )).json();

      this.props.bindTitle({ id, seasonId, title, backgroundImage });

      const {
        encryptionKey,
        episodes
      }: {
        encryptionKey: string,
        episodes: ServerEpisode[]
      } = await (await fetch(
        `${API_PATH}/titles/${id}/seasons/${seasonId}`
      )).json();

      this.props.bindEpisodes(
        episodes.map(episode => ({
          id: episode.id,
          name: episode.name || title,
          cover: episode.coverMedium || backgroundImage,
          url: episode.files[0].url.replace(
            "playlist.m3u8",
            `chunklist_${this.props.resolution}_sleng_${encryptionKey}.m3u8`
          ),
          watch: episode.watchLinkV2
        }))
      );

      NProgress.done();
    }
  })
);

type Props = {
  episodes: ClientEpisode[]
};

export default enhance(
  ({ episodes }: Props) =>
    episodes.length ? (
      <div>
        {episodes.map(episode => (
          <Episode key={episode.id} {...episode} />
        ))}
      </div>
    ) : null
);
