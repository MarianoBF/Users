import {useState} from "react";
import BlogService from "../services/blog.service";
import {Form, Input, Col, Button, Alert} from "antd";

function EditPostFromMenu() {
  const [form] = Form.useForm();
  const [showSaved, setShowSaved] = useState(false);

  const onFinish = values => {
    console.log(values);
    const data = {name: values.email, job: values.body, userId: values.userId};
    BlogService.updateById(selectedPost, data)
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

  const [post, setPost] = useState();
  const [selectedPost, setSelectedPost] = useState(0);
  const [disabled, setDisabled] = useState(true);

  const handleSelect = e => {
    setSelectedPost(e.target.value);
    BlogService.getById(e.target.value)
      .then(res => {
        form.setFieldsValue(res.data.data);
        setDisabled(false);
      })
      .catch(error => {
        console.log(error);
        setDisabled(true);
        setPost();
      });
  };

  console.log(post);

  return (
    <main>
      <Col span={12} offset={6}>
        <h1 className="centeredTitle">Editar post</h1>
        <p>
          En esta opción podés elegir el post a editar, para editar directamente
          desde un post, hacé click sobre la opción "editar" al pie del mismo
        </p>

        <Form
          {...formLayout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          initialValues={{...post}}>
          <Form.Item label="Id del post a editar">
            <Input
              type="number"
              name="Id"
              min="1"
              max="100"
              onChange={handleSelect}
              disabled={!disabled}
              value={selectedPost}
            />
          </Form.Item>

          <Form.Item label="Título del post" name="email">
            <Input type="text" disabled={disabled} />
          </Form.Item>

          <Form.Item label="Id del usuario" name="userId">
            <Input type="number" disabled={disabled} />
          </Form.Item>

          <Form.Item label="Cuerpo del post" name="body">
            <Input.TextArea
              showCount
              maxLength={500}
              autoSize={{minRows: 2, maxRows: 10}}
              disabled={disabled}
            />
          </Form.Item>

          <Button
            className="rightAlignedButtons"
            type="primary"
            htmlType="submit">
            Enviar
          </Button>
        </Form>
        {showSaved && <Alert message="Post editado con éxito" type="info" />}
      </Col>
    </main>
  );
}

export default EditPostFromMenu;
