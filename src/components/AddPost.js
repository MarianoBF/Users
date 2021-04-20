import {useState} from "react";
import BlogService from "../services/blog.service";

function Home() {
  const [post, setPost] = useState();

  const savePost = e => {
    e.preventDefault();
    const data = {title: post.title, body: post.body, userId: post.userId};
    BlogService.createPost(data)
      .then(res => console.log(res))
      .catch(error => console.log(error));
  };

  const handleInput = e => {
    const {name, value} = e.target;
    setPost({...post, [name]: value});
  };

  return (
    <main>
      <h1>Agregar post</h1>
      <form onSubmit={savePost}>
        Título del Post
        <input type="text" name="title" onChange={handleInput} />
        Cuerpo del post:
        <input type="textarea" name="body" onChange={handleInput} />
        Id del usuario:
        <input type="number" name="userId" onChange={handleInput} />
        <button type="submit">Enviar</button>
      </form>
    </main>
  );
}

export default Home;
