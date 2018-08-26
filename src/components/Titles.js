// @flow

import React from "react";
import styled from "styled-components";
import { compose, withState, withHandlers, lifecycle } from "recompose";
import { Link } from "react-router-dom";
import NProgress from "nprogress";

import Title from "./Title";

import type { ServerTitle } from "../common/types";

const StyledLink = styled(Link)`
  color: #000000;

  &:hover {
    color: #0000ff;
  }
`;

const enhance = compose(
  withState("titles", "updateTitles", {}),
  withHandlers({
    loadTitles: props => titles => {
      props.updateTitles(titles);
    }
  }),
  lifecycle({
    async componentDidMount() {
      NProgress.start();

      const titles = await (await fetch(
        `/api/titles?genre=${this.props.genre}`
      )).json();

      this.props.loadTitles(titles);

      NProgress.done();
    }
  })
);

type Props = {
  match: { path: string },
  genre: string,
  titles: ServerTitle[]
};

export default enhance(
  ({ match, titles }: Props) =>
    titles.length ? (
      <div>
        {titles.map(title => (
          <StyledLink key={title.id} to={`${match.path}/${title.id}`}>
            <Title name={title.title} cover={title.backgroundImage} />
          </StyledLink>
        ))}
      </div>
    ) : null
);
