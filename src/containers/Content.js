// @flow

import React from "react";
import styled from "styled-components";
import { compose, withState, withHandlers } from "recompose";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";

import HowTo from "../components/HowTo";
import LinkSection from "../components/LinkSection";
import Resolution from "../components/Resolution";
import Genre from "../components/Genre";
import Titles from "../components/Titles";
import Episodes from "../components/Episodes";
import RouteNotFound from "../components/RouteNotFound";
import GitHub from "../components/GitHub";

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
  })
);

type Props = {
  data: { encryptionKey: string, episodes: ServerEpisode[], title: string },
  resolution: string,
  bindData: (data: {}) => void,
  bindResolution: (resolution: string) => void
};

export default enhance(
  ({ data, resolution, bindData, bindResolution }: Props) => (
    <React.Fragment>
      <HowTo />
      <HashRouter>
        <Main>
          <LinkSection data={data} resolution={resolution} />
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
                <Episodes {...props} genre="phim" bindData={bindData} />
              )}
            />
            <Route
              key="tvShowWithId"
              exact
              path="/tv-show/:id"
              render={props => (
                <Episodes {...props} genre="tv-show" bindData={bindData} />
              )}
            />
            <Route component={RouteNotFound} />
          </Switch>
        </Main>
      </HashRouter>
      <GitHub />
    </React.Fragment>
  )
);
