import React, { useState } from "react";
import styles from "./PostWriting.module.css";

const PostWriting = () => {
  const [title, setTitle] = useState(""); // 제목을 위한 상태 변수
  const [content, setContent] = useState(""); // 내용을 위한 상태 변수

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 게시글 작성 로직
    console.log("제목: ", title);
    console.log("내용: ", content);
    // 게시글 작성 후 초기화
    setTitle("");
    setContent("");
  };

  return (
    <div className={styles.postWritingContainer}>
      <h1>게시글 작성</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목을 입력하세요."
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="내용을 입력하세요."
          value={content}
          onChange={handleContentChange}
        ></textarea>
        <button type="submit">작성</button>
      </form>
    </div>
  );
};

export default PostWriting;
