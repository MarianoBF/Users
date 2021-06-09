import {useState, useEffect, useRef} from "react";
import UsersDataService from "../services/users.service";
import {Col, Button, Alert, Select} from "antd";
import useMounted from "../hooks/useMounted";
import {useHistory, useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import UserForm from "./UserForm/UserForm";

function EditUser() {
  const history = useHistory();

  const [showSaved, setShowSaved] = useState(false);
  const isMounted = useMounted();
  const timer = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      setShowSaved(false);
      clearTimeout(timer.current);
    };
  }, [isMounted]);

  const onFinish = (values, id) => {
    UsersDataService.updateById(id, values)
      .then(res => {
        console.log(res);
        const users = JSON.parse(localStorage.getItem("users"));
        const position = users.findIndex(item => +item.id === +id);
        users[position] = {id:  +id, ...values};
        localStorage.setItem("users", JSON.stringify(users));
        if (isMounted.current) {
          setShowSaved(true);
          timer.current = setTimeout(() => {
            setShowSaved(false);
            history.push("/");
          }, 3000);
        }
      })
      .catch(error => console.log(error));
  };

  const {user_id} = useParams();

  let existingIDs;

  if (user_id === undefined) {
    let local = localStorage.getItem("users");
    if (local) {
      local = Array.from(JSON.parse(local));
      existingIDs = local.map(item => {
        return <Select.Option key={item.id}>{item.id}</Select.Option>;
      });
    } else if (!local) {
      console.log("error");
    }
  }

  return (
    <main>
      <Col span={12} offset={6}>
        <h1 className="centeredTitle">Editar Usuario</h1>
        <p>
          En esta opción podés elegir el usuario a editar. Si en todo caso
          querés editar directamente desde un usuario, hacé click sobre la
          opción "editar" al pie del mismo.
        </p>
        <UserForm
          onFinish={onFinish}
          editing={true}
          user_id={user_id}
          existingIDs={existingIDs}
        />

        <Link to="/">
          <Button className="rightAlignedButtons" danger>
            Cancelar Edicion
          </Button>
        </Link>
        {showSaved && <Alert message="Usuario editado con éxito" type="info" />}
      </Col>
    </main>
  );
}

export default EditUser;
