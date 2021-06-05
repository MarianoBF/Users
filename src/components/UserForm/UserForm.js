import {Form, Input, Button} from "antd";

export default function UserForm({
  onFinish,
  editing,
  handleSelect,
  disabled,
  user_id,
  selectedUser,
  userData
}) {
  const [form] = Form.useForm();

  const formLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
  };

  if (userData) {
    form.setFieldsValue(userData);
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
