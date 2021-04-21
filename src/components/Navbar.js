import {Menu} from "antd";
import {HomeOutlined, EditOutlined, FileAddOutlined} from "@ant-design/icons";
import {useState} from "react";

function Navbar(props) {
  const [selected, setSelected] = useState("home");

  const handleClick = e => {
    setSelected(e.key);
    props.menuSelect(e.key)
  };

  return (
    <Menu onClick={handleClick} selectedKeys={selected} mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        Principal
      </Menu.Item>
      <Menu.Item key="edit" icon={<EditOutlined />}>
        Editar entradas
      </Menu.Item>
      <Menu.Item key="add" icon={<FileAddOutlined />}>
        Sumar Entradas
      </Menu.Item>
    </Menu>
  );
}

export default Navbar;
