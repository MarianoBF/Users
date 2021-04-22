import {useState} from "react";
import BlogService from "../services/blog.service";
import {Form, Input, Col, Button} from "antd";

function EditPostFromMenu() {
  const initialValue = {
    title: "",
    body: "",
    userId: 0,
  };
  const [post, setPost] = useState(initialValue);

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
    labelCol: {span: 8},
    wrapperCol: {span: 16},
  };

  const [selectedPost, setSelectedPost] = useState(0);
  const [disabled, setDisabled] = useState(true);

  const handleSelect = e => {
    setSelectedPost(e.target.value);
    BlogService.getById(e.target.value)
      .then(res => {
        setPost(res.data);
        setDisabled(false);
      })
      .catch(error=> {
        console.log(error)
        setDisabled(true)
        setPost(initialValue)});
  };

  return (
    <main>
      <Col span={12} offset={6}>
        <h1 className="centeredTitle">Editar post</h1>
        <p>
          En esta opción podés elegir el post a editar, para editar directamente
          desde un post, hacé click sobre la opción "editar" al pie del mismo
        </p>

        <Form {...formLayout} onSubmit={savePost} size="large">
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

          <Form.Item label="Título del post">
            <Input
              type="text"
              name="title"
              onChange={handleInput}
              value={post.title}
              disabled={disabled}
            />
          </Form.Item>

          <Form.Item label="Id del usuario">
            <Input
              type="number"
              name="userId"
              onChange={handleInput}
              value={post.userId}
              disabled={disabled}
            />
          </Form.Item>

          <Form.Item label="Cuerpo del post">
            <Input.TextArea
              showCount
              maxLength={500}
              autoSize={{minRows: 2, maxRows: 10}}
              name="body"
              onChange={handleInput}
              value={post.body}
              disabled={disabled}
            />
          </Form.Item>

          <Button className="rightAlignedButtons" type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form>
      </Col>
    </main>
  );
}

export default EditPostFromMenu;
