import {Form, Input, Button} from "antd";
import {useState} from "react";
import UsersDataService from "../../services/users.service";

export default function UserForm({onFinish, editing, user_id}) {
  console.log("render")
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
    UsersDataService.getById(user_id || selectedUser)
      .then(res => {
        form.setFieldsValue(res.data.data);
        setDisabled(false);
      })
      .catch(error => {
        console.log(error);
        setDisabled(true);
      });
  }


  return (
    <Form {...formLayout} form={form} name="control-hooks" onFinish={onFinish}>
      {editing && (
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
