import {useState, useEffect} from "react";
import BlogService from "../services/blog.service";
import AddPost from "./AddPost";
import EditPostFromButton from "./EditPostFromButton";
import EditPostFromMenu from "./EditPostFromMenu";
import Details from "./Details";
import {Button, Col, Row, Space, Alert} from "antd";

function Home(props) {
  const [selection, setSelection] = useState();

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    setSelection(props.selection);
    BlogService.getAllPosts()
      .then(res => setPostList(res.data))
      .catch(error => console.log(error));
  }, [props]);

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
    setVisible(true);
  };

  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
    setDetailsMode(false);
  };

  const [showDeleted, setShowDeleted] = useState(false);

  const handleDelete = id => {
    BlogService.deleteById(id)
      .then(res => {
        console.log(res);
        setShowDeleted(true);
        setTimeout(() => setShowDeleted(false), 3000);
      })
      .catch(error => console.log(error));
  };

  const handleCancel = () => {
    setEditMode(false);
    setSelection("home");
  };

  const postListDisplay = postList.slice(0, 5).map(item => (
    <div className="postContainer" key={item.id}>
      <h2 className="postTitle">Title: {item.title}</h2>
      <Row justify="center">
        {" "}
        <Space>
          <Button type="primary" onClick={() => handleDetails(item)}>
            Ver detalle de Post
          </Button>{" "}
          <Button onClick={() => handleEdit(item)}>Editar Post</Button>{" "}
          <Button danger onClick={() => handleDelete(item.id)}>
            Borrar Post
          </Button>
        </Space>
      </Row>
    </div>
  ));

  return (
    <main>
      {selection === "home" && !editMode && (
        <Col span={18} offset={3}>
          <h1>Listado de posts</h1>
          {showDeleted && !detailsMode && (
              <Alert message="Post borrado con éxito" type="info" />
          )}
          {postListDisplay}
        </Col>
      )}
      {detailsMode && (
        <Details
          success={detailsMode&&showDeleted}
          post={postToShow}
          visible={visible}
          handleClose={handleClose}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
      {!editMode && selection === "edit" && (
        <EditPostFromMenu handleCancel={handleCancel} />
      )}
      {editMode && (
        <EditPostFromButton handleCancel={handleCancel} post={postToEdit} />
      )}
      {!editMode && selection === "add" && (
        <AddPost handleCancel={handleCancel} />
      )}
    </main>
  );
}

export default Home;
