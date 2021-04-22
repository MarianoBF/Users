import {useState} from "react";
import BlogService from "../services/blog.service";
import {Form, Input, Col, Button, Alert} from "antd";

function EditPostFromButton(props) {
  const [form] = Form.useForm();
  const [showSaved, setShowSaved] = useState(false);

  const onFinish = values => {
    console.log(values);
    const data = {name: values.title, job: values.body, userId: values.userId};
    BlogService.updateById(props.post.id, data)
      .then(res => {
        console.log(res);
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
        <h1 className="centeredTitle">Editar post</h1>
        <p>Desde aquí podés editar el post con id {"************"} </p>
        <Form
          {...formLayout}
          form={form}
          name="control-hooks"
          initialValues={{ title: props.post.email }}
          onFinish={onFinish}>
          <Form.Item label="Título del post" name="title">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Id del usuario" name="userId">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Cuerpo del post" name="body">
            <Input.TextArea
              showCount
              maxLength={500}
              autoSize={{minRows: 2, maxRows: 10}}
            />
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
        {showSaved && <Alert message="Post editado con éxito" type="info" />}

      </Col>
    </div>
  );
}

export default EditPostFromButton;
