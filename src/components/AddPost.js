import {useState} from "react";
import BlogService from "../services/blog.service";
import {Form, Input, Col, Button, Alert} from "antd";

function AddPost() {
  const [form] = Form.useForm();

  const [showSaved, setShowSaved] = useState(false);

  const onFinish = (values) => {
    console.log(values)
    const data = {title: values.title, body: values.body, userId: values.userId};
    BlogService.createPost(data)
      .then(res => {
        console.log(res.data);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 3000);
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
        <h1>Agregar post</h1>
        <p>Desde aquí podés agregar un nuevo post </p>
        <Form
          {...formLayout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}>
          <Form.Item label="Título del post" name="title">
            <Input
              type="text"
              rules={[{required: true, message: "Ingrese un título"}]}
            />
          </Form.Item>

          <Form.Item label="Cuerpo del post" name="body">
            <Input type="textarea" />
          </Form.Item>

          <Form.Item label="Id del usuario" name="userId">
            <Input type="number" />
          </Form.Item>

          <Button
            className="rightAlignedButtons"
            type="primary"
            htmlType="submit">
            Enviar
          </Button>

          {"  "}
        </Form>
        {showSaved && <Alert message="Post enviado con éxito" type="info" />}
      </Col>
    </div>
  );
}

export default AddPost;
