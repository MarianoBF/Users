import {useState, useEffect, useRef} from "react";
import UsersDataService from "../services/users.service";
import {Col, Button, Alert} from "antd";
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

  const onFinish = values => {
    const data = {name: values.email, job: values.body, userId: values.userId};
    UsersDataService.updateById(values.userId, data)
      .then(res => {
        console.log(res);
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

  return (
    <main>
      <Col span={12} offset={6}>
        <h1 className="centeredTitle">Editar Usuario</h1>
        <p>
          En esta opción podés elegir el usuario a editar. Si en todo caso
          querés editar directamente desde un usuario, hacé click sobre la
          opción "editar" al pie del mismo.
        </p>
        <UserForm onFinish={onFinish} editing={true} user_id={user_id} />

        {/* <Form
          {...formLayout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}>
          <Form.Item label="Id del usuario a editar">
            <Input
              type="number"
              name="Id"
              min="1"
              max="12"
              onChange={handleSelect}
              disabled={!disabled}
              value={user_id || selectedUser}
            />
          </Form.Item>

          <Form.Item
            label="Nombre"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Campo requerido",
              },
            ]}>
            <Input type="text" disabled={disabled} />
          </Form.Item>

          <Form.Item
            label="Apellido"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Campo requerido",
              },
            ]}>
            <Input type="text" disabled={disabled} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Campo requerido",
              },
            ]}>
            <Input type="email" disabled={disabled} />
          </Form.Item>

          <Button
            className="rightAlignedButtons"
            type="primary"
            htmlType="submit">
            Enviar
          </Button>

          {"  "}
        </Form> */}

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
