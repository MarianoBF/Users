import {useState, useEffect} from "react";
import UsersDataService from "../services/users.service";
import EditUserFromButton from "./EditUserFromButton";
import Details from "./Details";
import {Button, Col, Row, Alert} from "antd";

function Home(props) {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    UsersDataService.getAllUsers()
      .then(res => setUserList(res.data.data))
      .catch(error => console.log(error));
  }, [props]);

  const [editMode, setEditMode] = useState(false);
  const [userToEdit, setUserToEdit] = useState();
  const handleEdit = user => {
    setEditMode(true);
    setDetailsMode(false);
    setUserToEdit(user);
  };

  const [detailsMode, setDetailsMode] = useState(false);
  const [userToShow, setUserToShow] = useState();
  const handleDetails = item => {
    setDetailsMode(true);
    setUserToShow(item);
    setVisible(true);
  };

  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
    setDetailsMode(false);
  };

  const [showDeleted, setShowDeleted] = useState(false);

  const handleDelete = id => {
    UsersDataService.deleteById(id)
      .then(res => {
        console.log(res);
        setShowDeleted(true);
        setTimeout(() => setShowDeleted(false), 3000);
      })
      .catch(error => console.log(error));
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const userListDisplay = userList.slice(0, 5).map(item => (
    <div className="userContainer" key={item.id}>
      <h2>Nombre: {item.first_name}</h2>
      <Row justify="space-around">
        <Col xs={{span: 24}} sm={{span: 18, push: 3}}>
          <Button type="primary" onClick={() => handleDetails(item)}>
            Ver detalle de Usuario
          </Button>{" "}
          <Button onClick={() => handleEdit(item)}>Editar Usuario</Button>{" "}
          <Button danger onClick={() => handleDelete(item.id)}>
            Borrar Usuario
          </Button>
        </Col>
      </Row>
    </div>
  ));

  return (
    <div>
      {!editMode && (
        <Col xs={{span: 24}} lg={{span: 12, offset: 6}}>
          <h1>Listado de Usuarios</h1>
          {showDeleted && !detailsMode && (
            <Alert message="Usuario borrado con éxito" type="info" />
          )}
          {userListDisplay}
        </Col>
      )}
      {detailsMode && (
        <Details
          success={detailsMode && showDeleted}
          user={userToShow}
          visible={visible}
          handleClose={handleClose}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
      {editMode && (
        <EditUserFromButton handleCancel={handleCancel} user={userToEdit} />
      )}
    </div>
  );
}

export default Home;
