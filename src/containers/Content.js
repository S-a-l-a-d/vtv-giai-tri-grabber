// @flow

import React from "react";
import styled from "styled-components";
import { compose, withState, withHandlers, shouldUpdate } from "recompose";

import TitleInput from "../components/TitleInput";

const Main = styled.main`
  margin: 3rem 10%;
`;

const enhance = compose(
  withState("data", "updateData", {}),
  withHandlers({
    bindData: props => data => {
      props.updateData(data);
    }
  }),
  shouldUpdate(
    (props, nextProps) =>
      (Object.keys(props.data).length === 0 &&
        Object.keys(nextProps.data).length > 0) ||
      props.data.key !== nextProps.data.key ||
      (props.data.key === nextProps.data.key &&
        props.data.episodes.length !== nextProps.data.episodes.length)
  )
);

type Props = {
  data: {},
  bindData: (data: {}) => void
};

export default enhance(({ bindData }: Props) => (
  <React.Fragment>
    <Main>
      <TitleInput bindData={bindData} />
    </Main>
  </React.Fragment>
));
