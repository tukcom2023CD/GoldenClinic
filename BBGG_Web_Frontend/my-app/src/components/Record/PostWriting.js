import axios from "axios";
import React, { useState } from "react";
import classes from "./PostWriting.module.css";

const PostWriting = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    GpsSave();
  };

  //위도 경도 이름 아이디 DB로 전송
  const GpsSave = () => {
    axios.post("http://localhost:8080/gps/save", {
      latitude: localStorage.getItem('lat'),
      longitude: localStorage.getItem('lon'),
      text: content,
      title: title,
      userId: localStorage.getItem('userId')
    }).then(function () {
      alert("현재 위치가 기록되었습니다.");
      window.location.replace('/ColoringMap');
    }).catch(function (error) {
      console.log(error);
    });
  }
  //이 페이지를 벗어나면 위도 경도 값 지워져야 함
  window.onbeforeunload = function () {
    localStorage.removeItem("lat");
    localStorage.removeItem("lon");
  };

  return (
    <div className={classes.postWritingContainer}>
      <h1>게시글 등록하기</h1>
      <form onSubmit={handleSubmit}>
        <input className={classes.input}
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea className={classes.textarea}
          placeholder="내용을 입력하세요"
          value={content}
          onChange={handleContentChange}
        ></textarea>
        <button className={classes.button} type="submit">게시글과 위치 등록하기</button>
      </form>
    </div>
  );
};

export default PostWriting;
