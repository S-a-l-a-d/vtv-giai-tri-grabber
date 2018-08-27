// @flow

import React from "react";
import styled from "styled-components";

const Div = styled.div`
  margin: 1rem 1rem 0 1rem;
`;

export default () => (
  <Div>
    <h2>Cái này xài sao?</h2>
    <ol>
      <li>Chọn phim.</li>
      <li>
        Nếu muốn tải video:
        <ul>
          <li>
            Tải ffmpeg cho{" "}
            <a
              href="https://ffmpeg.zeranoe.com/builds/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Windows
            </a>{" "}
            hoặc{" "}
            <a
              href="https://www.ostechnix.com/install-ffmpeg-linux/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Linux
            </a>
            .
          </li>
          <li>
            Thêm đường dẫn ffmpeg vào Environment Variables nếu đang xài Windows
            và muốn tiện lợi theo{" "}
            <a
              href="https://www.computerhope.com/issues/ch000549.htm"
              target="_blank"
              rel="noopener noreferrer"
            >
              hướng dẫn
            </a>
            .
          </li>
        </ul>
      </li>
      <li>Thôi tới đây biết xài rồi nhé.</li>
    </ol>
  </Div>
);
