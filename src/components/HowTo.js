// @flow

import React from "react";
import styled from "styled-components";

const Div = styled.div`
  margin: 1rem 0 0 1rem;
`;

export default () => (
  <Div>
    <h2>Cái này xài sao?</h2>
    <ol>
      <li>Nhập liên kết phim theo định dạng cho sẵn.</li>
      <li>Nhấn nút.</li>
      <li>Bây giờ đã biết cần làm gì rồi nên qua bước tiếp theo đi.</li>
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
        Thêm đường dẫn ffmpeg vào Environment Variables nếu đang xài Windows và
        muốn tiện lợi theo{" "}
        <a
          href="https://www.computerhope.com/issues/ch000549.htm"
          target="_blank"
          rel="noopener noreferrer"
        >
          hướng dẫn
        </a>
        .
      </li>
      <li>Thôi tự mò tiếp nhé.</li>
    </ol>
  </Div>
);
