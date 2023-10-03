"use client";
import styled from "@emotion/styled";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Blogs = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  gap: 15px;
  grid-auto-rows: 350px;
  grid-auto-flow: dense;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  .image-gallery:nth-of-type(5n - 4) {
    grid-column: span 2;
  }
  .image-gallery:nth-of-type(5n - 3) {
    grid-column: span 2;
    grid-row: span 2;
  }
  .image-gallery:nth-of-type(5n - 1) {
    grid-column: span 1;
  }

  @media (max-width: 768px) {
    gap: 15px 0;
    grid-template-columns: 1fr 1fr;

    .image-gallery:nth-of-type(5n - 4) {
      grid-column: span 1;
    }
    .image-gallery:nth-of-type(5n - 3) {
      grid-column: span 2;
      grid-row: span 2;
    }
    .image-gallery:nth-of-type(5n - 1) {
      grid-column: span 1;
    }
  }
`;

const WrapperBlogs: React.FC<Props> = ({ children }) => {
  return <Blogs>{children}</Blogs>;
};

export default WrapperBlogs;
