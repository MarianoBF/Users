import {useState} from "react";
import BlogService from "../services/blog.service";
import {Form, Input, Col, Button, Alert} from "antd";

function AddPost(props) {
  const initialValue = {
    title: "",
    body: "",
    usetId: 0,
  };

  const [showSaved, setShowSaved] = useState(false);
  const [post, setPost] = useState(initialValue);

  const savePost = e => {
    e.preventDefault();
    const data = {title: post.title, body: post.body, userId: post.userId};
    BlogService.createPost(data)
      .then(res => {
        console.log(res.data);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 3000);
      })
      .catch(error => console.log(error));
  };

  const handleInput = e => {
    const {name, value} = e.target;
    setPost({...post, [name]: value});
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
        <Form {...formLayout} onSubmit={savePost}>
          <Form.Item label="Título del post">
            <Input
              type="text"
              name="title"
              onChange={handleInput}
              value={post.title}
            />
          </Form.Item>

          <Form.Item label="Cuerpo del post">
            <Input
              type="textarea"
              name="body"
              onChange={handleInput}
              value={post.body}
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
