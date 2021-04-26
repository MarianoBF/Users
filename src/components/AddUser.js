import {useState, useEffect, useRef} from "react";
import UsersDataService from "../services/users.service";
import {Form, Input, Col, Button, Alert} from "antd";

function AddUser() {
  const [form] = Form.useForm();

  const [showSaved, setShowSaved] = useState(false);

  const isMounted = useRef(true);
  const timer = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      setShowSaved(false);
      clearTimeout(timer.current);
    };
  }, []);

  const onFinish = values => {
    const data = {
      last_name: values.last_name,
      first_name: values.first_name,
      email: values.email,
    };
    UsersDataService.createUser(data)
      .then(res => {
        console.log(res.data);
        if (isMounted.current) {
          setShowSaved(true);
          timer.current = setTimeout(() => setShowSaved(false), 3000);
        }
      })
      .catch(error => console.log(error));
  };

  const formLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
  };

  return (
    <div>
      <Col span={12} offset={6}>
        <h1>Agregar Usuario</h1>
        <p>Desde aquí podés agregar un nuevo usuario </p>
        <Form
          {...formLayout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}>
          <Form.Item
            label="Nombre"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Campo requerido",
              },
            ]}>
            <Input type="text" />
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
            <Input type="text" />
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
            <Input type="email" />
          </Form.Item>

          <Button
            className="rightAlignedButtons"
            type="primary"
            htmlType="submit">
            Enviar
          </Button>

          {"  "}
        </Form>
        {showSaved && <Alert message="Usuario creado con éxito" type="info" />}
      </Col>
    </div>
  );
}

export default AddUser;