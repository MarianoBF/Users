import {useState, useEffect, useRef} from "react";
import UsersDataService from "../services/users.service";
import Details from "./Details";
import {Button, Col, Row, Alert} from "antd";
import {Link} from "react-router-dom"

function Home(props) {
  const [userList, setUserList] = useState([]);
  const isMounted = useRef(true);
  const timer = useRef(true);

  useEffect(() => {
    UsersDataService.getAllUsers()
      .then(res => {
        if (isMounted.current) {
          let local = localStorage.getItem("users");
          if (local) {
            local = Array.from(JSON.parse(local));
          } else {
            local = [];
          }
          const auxData = [...local, ...res.data.data];
          setUserList(auxData);
        }
      })
      .catch(error => console.log(error));
    return () => {
      isMounted.current = false;
      setShowDeleted(false);
      clearTimeout(timer.current);
    };
  }, [props]);

  const [editMode, setEditMode] = useState(false);
  const handleEdit = user => {
    setEditMode(true);
    setDetailsMode(false);
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
        if (isMounted.current) {
          setShowDeleted(true);
          timer.current = setTimeout(() => setShowDeleted(false), 3000);
        }
      })
      .catch(error => console.log(error));
  };

  const userListDisplay = userList.slice(0, 5).map(item => (
    <div className="userContainer" key={item.id}>
      <h2>Nombre: {item.first_name}</h2>
      <Row justify="space-around">
        <Button type="primary" onClick={() => handleDetails(item)}>
          Ver detalle de Usuario
        </Button>{" "}
        <Link to={"/edit/"+item.id}><Button onClick={() => handleEdit(item)}>Editar Usuario</Button>{" "}</Link>
        <Button danger onClick={() => handleDelete(item.id)}>
          Borrar Usuario
        </Button>
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
      {/* {editMode && (
        <EditUserFromButton handleCancel={handleCancel} user={userToEdit} />
      )} */}
    </div>
  );
}

export default Home;
