// @flow

import React from "react";
import styled from "styled-components";
import { compose, withState, withHandlers, shouldUpdate } from "recompose";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";

import HowTo from "../components/HowTo";
import Resolution from "../components/Resolution";
import Genre from "../components/Genre";
import Titles from "../components/Titles";
import Episodes from "../components/Episodes";
import RouteNotFound from "../components/RouteNotFound";

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
    <HashRouter>
      <React.Fragment>
        <HowTo />
        <Main>
          <Resolution resolution={resolution} bindResolution={bindResolution} />
          <Genre />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/phim" />} />
            <Route
              key="phim"
              exact
              path="/phim"
              render={props => <Titles {...props} genre="phim" />}
            />
            <Route
              key="tv-show"
              exact
              path="/tv-show"
              render={props => <Titles {...props} genre="tv-show" />}
            />
            <Route
              key="phimWithId"
              exact
              path="/phim/:id"
              render={props => (
                <Episodes {...props} genre="phim" resolution={resolution} />
              )}
            />
            <Route
              key="tvShowWithId"
              exact
              path="/tv-show/:id"
              render={props => (
                <Episodes {...props} genre="tv-show" resolution={resolution} />
              )}
            />
            <Route component={RouteNotFound} />
          </Switch>
        </Main>
      </React.Fragment>
    </HashRouter>
  )
);
