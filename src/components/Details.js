import {Modal, Button} from "antd";
import {Space, Alert, Divider} from "antd";
import {Link} from "react-router-dom";

function Details(props) {
  return (
    <div>
      <Modal
        title="Detalles del Usuario:"
        centered
        closable={false}
        visible={props.visible}
        cancelButtonProps={{style: {display: "none"}}}
        okText={"Cerrar"}
        onOk={props.handleClose}>
        <p>Nombre: {props.user.first_name}</p>
        <p>Apellido: {props.user.last_name} </p>{" "}
        <p>Email: {props.user.email} </p>{" "}
        <Space>
          <Link to={"/edit/" + props.user.id}>
            <Button>Editar Usuario</Button>
          </Link>
          <Button danger onClick={() => props.handleDelete(props.user.id)}>
            Borrar Usuario
          </Button>
        </Space>
        <Divider />
        {props.success && (
          <Alert message="Usuario borrado con éxito" type="info" />
        )}
      </Modal>
    </div>
  );
}

export default Details;
