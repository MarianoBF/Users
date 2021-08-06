import "./App.css";
import Home from "./components/Home";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import { useState, useEffect } from "react";
import { Menu } from "antd";
import { HomeOutlined, EditOutlined, FileAddOutlined } from "@ant-design/icons";
import { Switch, Route, Link, useLocation } from "react-router-dom";

function App() {
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

  return (
    <div>
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

      <Switch>
        <Route exact path="/edit/:user_id" component={EditUser} />
        <Route exact path="/edit" component={EditUser} />
        <Route exact path="/add" component={AddUser} />
        <Route path="/" render={()=><Home /> } />
      </Switch>
    </div>
  );
}

export default App;
