import {useState, useEffect} from "react";
import BlogService from "../services/blog.service";

function Home() {
  const [postList, setPostList] = useState();

  useEffect(() => {
    BlogService.getAllPosts()
      .then(res => setPostList(res.data)&&console.log(res.data))
      .catch(error => console.log(error));
  }, []);

  const postListDisplay = postList.map((item)=><div key={item.id}><h2>Title: {item.title}</h2><p>User id: {item.userId} </p> </div>);

  return <main>
  <h1>Listado de posts</h1>
  {postListDisplay}</main>;
}

export default Home;
