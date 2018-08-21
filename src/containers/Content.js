// @flow

import React from "react";
import styled from "styled-components";
import { compose, withState, withHandlers, shouldUpdate } from "recompose";

import TitleInput from "../components/TitleInput";
import Resolution from "../components/Resolution";
import TitleOutput from "../components/TitleOutput";

import { RESOLUTION } from "../common/constants";
import type { ServerEpisode } from "../common/types";

const Main = styled.main`
  margin: 3rem 10%;
`;

const enhance = compose(
  withState("data", "updateData", {}),
  withState("resolution", "updateResolution", RESOLUTION.HIGH),
  withHandlers({
    bindData: props => data => {
      props.updateData(data);
    },
    bindResolution: props => resolution => {
      props.updateResolution(resolution);
    }
  }),
  shouldUpdate((props, nextProps) => {
    const initialDataRetrieved =
      Object.keys(props.data).length === 0 &&
      Object.keys(nextProps.data).length > 0;
    const titleChanged =
      props.data.encryptionKey !== nextProps.data.encryptionKey;
    const numTitleEpisodesChanged =
      props.data.encryptionKey === nextProps.data.encryptionKey &&
      props.data.episodes &&
      nextProps.data.episodes &&
      props.data.episodes.length !== nextProps.data.episodes.length;
    const resolutionChanged = props.resolution !== nextProps.resolution;

    return (
      initialDataRetrieved ||
      titleChanged ||
      numTitleEpisodesChanged ||
      resolutionChanged
    );
  })
);

type Props = {
  data: {
    encryptionKey: string,
    episodes: ServerEpisode[]
  },
  resolution: string,
  bindData: (data: {}) => void,
  bindResolution: (resolution: string) => void
};

export default enhance(
  ({ data, resolution, bindData, bindResolution }: Props) => (
    <React.Fragment>
      <Main>
        <TitleInput bindData={bindData} />
        <Resolution resolution={resolution} bindResolution={bindResolution} />
        <TitleOutput data={data} resolution={resolution} />
      </Main>
    </React.Fragment>
  )
);
