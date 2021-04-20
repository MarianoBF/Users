import {useState, useEffect} from "react";
import BlogService from "../services/blog.service";
import AddPost from "./AddPost"

function Home() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    BlogService.getAllPosts()
      .then(res => setPostList(res.data))
      .catch(error => console.log(error));
  }, []);

  console.log(postList);

  const postListDisplay = postList.slice(0, 5).map(item => (
    <div className="postContainer" key={item.id}>
      <h2 className="postTitle">Title: {item.title}</h2>
      <p className="postContents"> Content:{item.body}</p>{" "}
      <p className="postUser">User id: {item.userId} </p>{" "}

    </div>
  ));

  return (
    <main>
      <h1>Listado de posts</h1>
      {/* {postListDisplay} */}
      <AddPost />
    </main>
  );
}

export default Home;
