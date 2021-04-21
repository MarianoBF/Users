import {Modal, Button} from "antd";
import {useState} from "react";

function Details(props) {

  const [visible, setVisible] = useState(props.visible);

  return (
    <div>
      <Modal
        title="Detalles del post:"
        centered
        visible={visible}
        cancelText={"a"}
        okText={"Cerrar"}
        onOk={() => setVisible(false)}
        >
        <h2 className="postTitle">Title: {props.post.title}</h2>
        <p className="postUser">User id: {props.post.userId} </p>{" "}
        <p className="postUser">Texto: {props.post.body} </p>{" "}
        <Button onClick={() => props.handleEdit(props.post)}>
          Editar Post
        </Button>
        <Button danger onClick={() => props.handleDelete(props.post.id)}>
          Borrar Post
        </Button>
      </Modal>
    </div>
  );
}

export default Details;
