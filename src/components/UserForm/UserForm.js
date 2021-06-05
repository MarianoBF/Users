import {Form, Input, Button} from "antd";

export default function UserForm({onFinish}) {
  const [form] = Form.useForm();

  const formLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
  };
  return (
    <Form {...formLayout} form={form} name="control-hooks" onFinish={onFinish}>
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
