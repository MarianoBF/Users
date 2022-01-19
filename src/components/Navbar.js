import { HomeOutlined, EditOutlined, FileAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {Menu} from "antd";


export default function Navbar() {

    const location = useLocation();

    const [selected, setSelected] = useState(location.pathname);
  
    const handleClick = (e) => {
      setSelected(e.key);
    };
  
    useEffect(() => {
      const entries = ["/edit", "/add", "/"];
  
      setSelected(
        entries.find((item) => location.pathname.includes(item))
      );
    }, [location]);


    return(
        <Menu onClick={handleClick} selectedKeys={selected} mode="horizontal">
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link to={"/"}>Principal</Link>
        </Menu.Item>
        <Menu.Item key="/edit" icon={<EditOutlined />}>
          <Link to={"/edit"}>Editar Usuario</Link>
        </Menu.Item>
        <Menu.Item key="/add" icon={<FileAddOutlined />}>
          <Link to={"/add"}>Sumar Usuario</Link>
        </Menu.Item>
      </Menu>
    )
}