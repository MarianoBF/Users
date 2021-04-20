import {useState, useEffect} from "react";
import BlogService from "../services/blog.service";
import AddPost from "./AddPost"
import EditPost from "./EditPost"
import Details from "./Details"


function Home() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    BlogService.getAllPosts()
      .then(res => setPostList(res.data))
      .catch(error => console.log(error));
  }, []);

  const [editMode, setEditMode] = useState(false);
  const [postToEdit, setPostToEdit] = useState();
  const handleEdit = (post) => {
      setEditMode(true)
      setPostToEdit(post)
  } 

  const [addMode, setAddMode] = useState(false);
  const handleAdd = () => {
      setAddMode(true);
  }


  const [detailsMode, setDetailsMode] = useState(false);
  const [postToShow, setPostToShow] = useState();
  const handleDetails = (item) => {
    setDetailsMode(true);
    setPostToShow(item)
  }

  const handleDelete = (id) => {
    BlogService.deleteById(id)
      .then(res => console.log(res))
      .catch(error => console.log(error));
  }

  const postListDisplay = postList.slice(0, 5).map(item => (
    <div className="postContainer" key={item.id}>
      <h2 className="postTitle">Title: {item.title}</h2>
      <p className="postUser">User id: {item.userId} </p>{" "}
      <button onClick={()=>handleDetails(item)}>Ver detalle de Post</button>
      <button onClick={()=>handleEdit(item)}>Editar Post</button>
      <button onClick={()=>handleDelete(item.id)}>Borrar Post</button>

    </div>
  ));

  return (
    <main>
      <h1>Listado de posts</h1>
      <button onClick={handleAdd}>Agregar post</button>
      {postListDisplay}
      {detailsMode && <Details post={postToShow}/>} 
      {editMode && <EditPost post={postToEdit}/>} 
      {addMode && <AddPost />}
    </main>
  );
}

export default Home;
