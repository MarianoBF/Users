import {Modal, Button} from "antd";
import {Space, Alert, Divider} from "antd";

function Details(props) {
  return (
    <div>
      <Modal
        title="Detalles del post:"
        centered
        closable={false}
        visible={props.visible}
        cancelButtonProps={{style: {display: "none"}}}
        okText={"Cerrar"}
        onOk={props.handleClose}>
        <h2 className="postTitle">Title: {props.post.title}</h2>
        <p className="postUser">User id: {props.post.userId} </p>{" "}
        <p className="postUser">Texto: {props.post.body} </p>{" "}
        <Space>
          <Button onClick={() => props.handleEdit(props.post)}>
            Editar Post
          </Button>
          <Button danger onClick={() => props.handleDelete(props.post.id)}>
            Borrar Post
          </Button>
        </Space>
        <Divider />
        {props.success && (
          <Alert message="Post borrado con éxito" type="info" />
        )}
      </Modal>
    </div>
  );
}

export default Details;
