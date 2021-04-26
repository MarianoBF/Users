import {useState, useEffect, useRef} from "react";
import UsersDataService from "../services/users.service";
import {Form, Input, Col, Button, Alert} from "antd";

function EditUserFromButton(props) {
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
    const data = {name: values.title, job: values.body, userId: values.userId};
    UsersDataService.updateById(props.user.id, data)
      .then(res => {
        console.log(res);
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
        <h1 className="centeredTitle">Editar Usuario</h1>
        <p>Desde aquí podés editar el usuario con id {props.user.id} </p>
        <Form
          {...formLayout}
          form={form}
          name="control-hooks"
          initialValues={{
            email: props.user.email,
            first_name: props.user.first_name,
            last_name: props.user.last_name,
          }}
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
            onClick={props.handleCancel}
            danger>
            Cancelar Edicion
          </Button>
          {"  "}
          <Button
            className="rightAlignedButtons"
            type="primary"
            htmlType="submit">
            Enviar
          </Button>
        </Form>
        {showSaved && <Alert message="Usuario editado con éxito" type="info" />}
      </Col>
    </div>
  );
}

export default EditUserFromButton;
