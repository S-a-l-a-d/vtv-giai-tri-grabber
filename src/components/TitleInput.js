// @flow

import React from "react";
import styled from "styled-components";
import { compose, withState, withHandlers, shouldUpdate } from "recompose";
import NProgress from "nprogress";

import { grabTitleData } from "../common/helpers";
import { TITLE_URL_PATTERN } from "../common/constants";

const Div = styled.div`
  text-align: center;
`;
const Input = styled.input`
  width: 70%;

  margin-right: 0.5rem;
  padding-bottom: 0.15rem;

  border-left: 0;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #000;

  outline: 0;

  font-size: 2rem;
`;
const Button = shouldUpdate(() => false)(styled.button`
  font-size: 2rem;
`);

const enhance = compose(
  withState("value", "updateValue", ""),
  withHandlers({
    handleChange: props => (event: SyntheticInputEvent<EventTarget>) => {
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
  })
);

type Props = {
  bindData: (data: {}) => void,
  value: string,
  handleChange: (event: SyntheticInputEvent<EventTarget>) => void,
  handleSubmit: (event: Event) => Promise<void>
};

export default enhance(({ value, handleChange, handleSubmit }: Props) => (
  <Div>
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="https://www.vtvgiaitri.vn/title/quynh-bup-be"
        value={value}
        onChange={handleChange}
      />
      <Button type="submit">Grab</Button>
    </form>
  </Div>
));
