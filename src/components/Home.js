import {useState, useEffect, useRef} from "react";
import UsersDataService from "../services/users.service";
import Details from "./Details";
import {Button, Col, Row, Alert, Divider, Typography} from "antd";
import {Link} from "react-router-dom";

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
            setUserList(local);
          } else if (!local) {
            setUserList(res.data.data.slice(0, 5));
            localStorage.setItem(
              "users",
              JSON.stringify(res.data.data.slice(0, 5))
            );
          }
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
        const users = JSON.parse(localStorage.getItem("users"));
        const position = users.findIndex(item => +item.id === +id);
        users.splice(position, 1);
        localStorage.setItem("users", JSON.stringify(users));
        if (isMounted.current) {
          setShowDeleted(true);
          timer.current = setTimeout(() => {
            setShowDeleted(false);
            window.location.reload();
          }, 3000);
        }
      })
      .catch(error => console.log(error));
  };

  const restoreData = () => {
    localStorage.removeItem("users");
    window.location.reload();
  };

  const userListDisplay = userList.slice(0, 5).map(item => (
    <div className="userContainer" key={item.id + item.first_name}>
      <h2>Nombre: {item.first_name}</h2>
      <Row justify="space-around">
        <Button type="primary" onClick={() => handleDetails(item)}>
          Ver detalle de Usuario
        </Button>{" "}
        <Link to={"/edit/" + item.id}>
          <Button onClick={() => handleEdit(item)}>Editar Usuario</Button>{" "}
        </Link>
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
          {userListDisplay}
          {showDeleted && !detailsMode && (
            <Alert message="Usuario borrado con éxito" type="info" />
          )}
        </Col>
      )}
      {detailsMode && (
        <Details
          success={detailsMode && showDeleted}
          user={userToShow}
          visible={visible}
          handleClose={handleClose}
          handleDelete={handleDelete}
        />
      )}

      <Divider dashed />
      <Col xs={{span: 24}} lg={{span: 12, offset: 6}}>
        <Row justify="space-around">
          <Typography type="secondary" style={{textAlign: "justify"}}>
            Desde el menú y los botones se puede modificar los datos, que
            quedarán guardados en una copia local (la API no persiste las
            modificaciones). En caso de querer restaurarlos desde la API
            clickear el siguiente botón.
          </Typography>
          <Divider dashed />
          <Button onClick={restoreData} type="secondary">
            Restaurar datos desde la API
          </Button>
        </Row>
      </Col>
    </div>
  );
}

export default Home;
