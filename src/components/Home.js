import {useState, useEffect} from "react";
import BlogService from "../services/blog.service";
import AddPost from "./AddPost";
import EditPost from "./EditPost";
import Details from "./Details";
import {Button} from "antd";

function Home(props) {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    BlogService.getAllPosts()
      .then(res => setPostList(res.data))
      .catch(error => console.log(error));
  }, []);

  const [editMode, setEditMode] = useState(false);
  const [postToEdit, setPostToEdit] = useState();
  const handleEdit = post => {
    setEditMode(true);
    setDetailsMode(false);
    setPostToEdit(post);
  };

  const [detailsMode, setDetailsMode] = useState(false);
  const [postToShow, setPostToShow] = useState();
  const handleDetails = item => {
    setDetailsMode(true);
    setPostToShow(item);
  };

  const handleDelete = id => {
    BlogService.deleteById(id)
      .then(res => console.log(res))
      .catch(error => console.log(error));
  };

  const postListDisplay = postList.slice(0, 5).map(item => (
    <div className="postContainer" key={item.id}>
      <h2 className="postTitle">Title: {item.title}</h2>
      <p className="postUser">User id: {item.userId} </p>{" "}
      <Button onClick={() => handleDetails(item)}>Ver detalle de Post</Button>
      <Button onClick={() => handleEdit(item)}>Editar Post</Button>
      <Button onClick={() => handleDelete(item.id)}>Borrar Post</Button>
    </div>
  ));

  return (
    <main>
      <h1>Listado de posts</h1>
      {props.selection === "home" && !editMode && postListDisplay}
      {detailsMode && (
        <Details
          post={postToShow}
          visible={true}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
      {(props.selection === "edit" || editMode) && (
        <EditPost post={postToEdit} />
      )}
      {props.selection === "add" && <AddPost />}
    </main>
  );
}

export default Home;
