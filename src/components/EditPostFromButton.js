import {useState} from "react";
import BlogService from "../services/blog.service";
import {Form, Input, Col, Button} from "antd";

function EditPostFromButton(props) {
  const initialValue = {
    title: "",
    body: "",
    userId: 0,
  };
  const [post, setPost] = useState(props.post || initialValue);

  const savePost = e => {
    e.preventDefault();
    const data = {title: post.title, body: post.body, userId: post.userId};
    BlogService.updateById(post.id, data)
      .then(res => console.log(res))
      .catch(error => console.log(error));
  };

  const handleInput = e => {
    const {name, value} = e.target;
    setPost({...post, [name]: value});
  };

  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <div>
      <Col span={12} offset={6}>
        <h1 className="centeredTitle">Editar post</h1>
        <p>Desde aquí podés editar el post con id {post.id} </p>
        <Form {...formLayout} onSubmit={savePost} size="lg">
          <Form.Item label="Título del post">
            <Input
              type="text"
              name="title"
              onChange={handleInput}
              value={post.title}
            />
          </Form.Item>
                 
          <Form.Item label="Id del usuario">
            <Input
              type="number"
              name="userId"
              onChange={handleInput}
              value={post.userId}
            />
          </Form.Item>

          <Form.Item label="Cuerpo del post">
            <Input.TextArea
              showCount
              maxLength={500}
              autoSize={{ minRows: 2, maxRows: 10 }}
              name="body"
              onChange={handleInput}
              value={post.body}
            />
          </Form.Item>

          <Button className="rightAlignedButtons" onClick={props.handleCancel} danger>Cancelar Edicion</Button>{"  "}
          <Button className="rightAlignedButtons" type="primary" htmlType="submit">Enviar</Button>

        </Form>
      </Col>
    </div>
  );
}

export default EditPostFromButton;
