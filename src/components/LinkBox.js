// @flow

import React from "react";
import styled from "styled-components";
import { onlyUpdateForKeys } from "recompose";
import DownloadLink from "react-download-link";

const Div = styled.div`
  display: inline-block;

  width: 30%;

  margin: auto 1rem;

  text-align: initial;
`;
const TextArea = onlyUpdateForKeys(["value"])(styled.textarea`
  width: 100%;
  height: 20rem;

  white-space: pre;

  resize: vertical;
`);
const SubDiv = styled.div`
  text-align: right;
`;

type Props = {
  content: string,
  filename: string
};

export default ({ content, filename }: Props) => (
  <Div>
    <TextArea readOnly value={content} />
    <SubDiv>
      <DownloadLink
        tagName="button"
        label="Tải về"
        filename={filename}
        exportFile={() => content}
        style={{}}
      />
    </SubDiv>
  </Div>
);
