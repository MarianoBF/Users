import {Form, Input, Button} from "antd";
import {useState} from "react";

export default function UserForm({onFinish, editing, user_id}) {
  console.log("render");
  const [form] = Form.useForm();

  const formLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
  };

  const [selectedUser, setSelectedUser] = useState(0);
  const [disabled, setDisabled] = useState(true);

  if (user_id) {
    getUserToEdit(user_id);
  }

  const handleSelect = e => {
    setSelectedUser(e.target.value);
    getUserToEdit();
  };

  function getUserToEdit(user_id) {
    const users = JSON.parse(localStorage.getItem("users"));
    const position = users.findIndex(item => +item.id === +user_id);
    const user = users[position];
    const auxPromise = new Promise((resolve, reject) => {
      resolve(user);
    });
    auxPromise.then(res => {
      form.setFieldsValue(res);
      setDisabled(false);
    });
  }

  return (
    <Form {...formLayout} form={form} name="control-hooks" onFinish={(values)=>onFinish(values, user_id || selectedUser)}>
      {editing && (
        <Form.Item label="Id del usuario a editar">
          <Input
            type="number"
            name="Id"
            onChange={handleSelect}
            disabled={!disabled}
            value={user_id || selectedUser}
          />
        </Form.Item>
      )}
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

      <Button className="rightAlignedButtons" type="primary" htmlType="submit">
        Enviar
      </Button>

      {"  "}
    </Form>
  );
}
