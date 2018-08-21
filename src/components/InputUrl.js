// @flow

import React from "react";
import styled from "styled-components";
import { compose, withHandlers, lifecycle } from "recompose";

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

const enhance = compose(
  withHandlers(() => {
    let input: HTMLInputElement;

    return {
      getRef: () => ref => (input = ref),
      focusOnLoad: () => () => input.focus(),
      handleFocus: props => (event: SyntheticInputEvent<HTMLInputElement>) => {
        event.target.select();
      }
    };
  }),
  lifecycle({
    componentDidMount() {
      this.props.focusOnLoad();
    }
  })
);

type Props = {
  getRef: (ref: HTMLInputElement) => void,
  value: string,
  handleChange: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  handleFocus: (event: SyntheticInputEvent<HTMLInputElement>) => void
};

export default enhance(
  ({ getRef, value, handleChange, handleFocus }: Props) => (
    <Input
      type="text"
      placeholder="https://www.vtvgiaitri.vn/title/quynh-bup-be"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      innerRef={getRef}
    />
  )
);
