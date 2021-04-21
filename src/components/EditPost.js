import {useState} from "react";
import BlogService from "../services/blog.service";

function Home(props) {
  const initialValue = {
    title: "",
    body: "",
    usetId: 0,
  };
  const [post, setPost] = useState(props.post || initialValue);

  const savePost = e => {
    e.preventDefault();
    const data = {title: post.title, body: post.body, userId: post.userId};
    BlogService.updateById(post.id, data)
      .then(res => console.log(res))
      .catch(error => console.log(error));
  };

  const handleInput = e => {
    const {name, value} = e.target;
    setPost({...post, [name]: value});
  };

  return (
    <main>
      <h1>Editar post</h1>
      <form onSubmit={savePost}>
        Título del Post
        <input
          type="text"
          name="title"
          onChange={handleInput}
          value={post.title}
        />
        Cuerpo del post:
        <input
          type="textarea"
          name="body"
          onChange={handleInput}
          value={post.body}
        />
        Id del usuario:
        <input
          type="number"
          name="userId"
          onChange={handleInput}
          value={post.userId}
        />
        <button type="submit">Enviar</button>
      </form>
    </main>
  );
}

export default Home;
