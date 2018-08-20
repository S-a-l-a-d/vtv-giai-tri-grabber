// @flow

import React from "react";
import styled from "styled-components";
import { compose, withHandlers, onlyUpdateForKeys } from "recompose";

import { RESOLUTION } from "../common/constants";

const Div = styled.div`
  margin-bottom: 1rem;

  text-align: center;
`;
const Select = styled.select`
  font-size: 2rem;
`;

const enhance = compose(
  withHandlers({
    handleChange: props => (event: SyntheticEvent<HTMLSelectElement>) => {
      if (event.target instanceof HTMLSelectElement)
        props.bindResolution(event.target.value);
    }
  }),
  onlyUpdateForKeys(["resolution"])
);

type Props = {
  resolution: string,
  handleChange: (event: SyntheticEvent<HTMLSelectElement>) => void
};

export default enhance(({ resolution, handleChange }: Props) => (
  <Div>
    <Select value={resolution} onChange={handleChange}>
      <option value={RESOLUTION.LOW}>360p</option>
      <option value={RESOLUTION.MEDIUM}>480p</option>
      <option value={RESOLUTION.HIGH}>720p</option>
    </Select>
  </Div>
));
