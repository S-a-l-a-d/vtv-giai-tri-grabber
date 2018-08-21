// @flow

import React from "react";
import styled from "styled-components";
import {
  compose,
  withState,
  withHandlers,
  shouldUpdate,
  onlyUpdateForKeys
} from "recompose";
import NProgress from "nprogress";

import InputUrl from "./InputUrl";

import { grabTitleData } from "../common/helpers";
import { TITLE_URL_PATTERN } from "../common/constants";

const Div = styled.div`
  margin-bottom: 1rem;

  text-align: center;
`;
const Button = shouldUpdate(() => false)(styled.button`
  font-size: 2rem;
`);

const enhance = compose(
  withState("value", "updateValue", ""),
  withHandlers({
    handleChange: props => (event: SyntheticInputEvent<HTMLInputElement>) => {
      props.updateValue(event.target.value);
    },
    handleSubmit: props => async (event: Event) => {
      event.preventDefault();

      if (!TITLE_URL_PATTERN.test(props.value)) return;

      NProgress.start();

      try {
        props.bindData(await grabTitleData(props.value));
      } catch (ex) {}

      NProgress.done();
    }
  }),
  onlyUpdateForKeys(["value"])
);

type Props = {
  bindData: (data: {}) => void,
  value: string,
  handleChange: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  handleFocus: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  handleSubmit: (event: Event) => Promise<void>
};

export default enhance(
  ({ value, handleChange, handleFocus, handleSubmit }: Props) => (
    <Div>
      <form onSubmit={handleSubmit}>
        <InputUrl value={value} handleChange={handleChange} />
        <Button type="submit">Triển</Button>
      </form>
    </Div>
  )
);
