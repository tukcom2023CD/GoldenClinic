// import { useState } from "react";
// import axios from "axios";

// function RecordPost() {
//   const [title, setTitle] = useState();
//   const [content, setContent] = useState();
//   const [image, setImage] = useState(null);

//   const handleTitleChange = (event) => {
//     setTitle(event.target.value);
//   };

//   const handleContentChange = (event) => {
//     setContent(event.target.value);
//   };

//   const handleImageChange = (event) => {
//     setImage(event.target.files[0]);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", content);
//     formData.append("image", image);

//     axios.post("http://localhost:8080/gps/save", formData),
//       {
//         headers: {
//           "Contest-Type": "multipart/form-data", //파일 전송시 필요 없어도 무관.
//         },
//       }
//         .than((response) => {
//           console.log(response.data);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <h1>Travel Record</h1>
//         <label htmlFor="title">Title</label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={handleTitleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="content">Content</label>
//         <textarea id="content" value={content} onChange={handleContentChange} />
//       </div>
//       <div>
//         <label htmlFor="image">Image</label>
//         <input
//           type="file"
//           id="image"
//           accept="image/*"
//           onChange={handleImageChange}
//         />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
// export default RecordPost;
