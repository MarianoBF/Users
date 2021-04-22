import "./App.css";
import Home from "./components/Home";
import AddPost from "./components/AddPost";
import EditPostFromMenu from "./components/EditPostFromMenu"
import {useState} from "react";
import {Menu} from "antd";
import {HomeOutlined, EditOutlined, FileAddOutlined} from "@ant-design/icons";
import { Switch, Route, Link, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  const [selected, setSelected] = useState(location.pathname);

  const handleClick = e => {
    setSelected(e.key);
  }

  return (
    <div>
      {/* <Navbar menuSelect={selection => menuSelect(selection)} /> */}
      <Menu onClick={handleClick} selectedKeys={selected} mode="horizontal">
        <Menu.Item key="/" icon={<HomeOutlined />}><Link to={"/"}>
          Principal</Link>
        </Menu.Item>
        <Menu.Item key="/edit" icon={<EditOutlined />}><Link to={"/edit"}>
          Editar entradas</Link>
        </Menu.Item>
        <Menu.Item key="/add" icon={<FileAddOutlined />}><Link to={"/add"}>
          Sumar Entradas</Link>
        </Menu.Item>
      </Menu>

      <Switch>
        <Route exact path="/edit" component={EditPostFromMenu} />
        <Route exact path="/add" component={AddPost} />
        <Route path="/" render={()=> <Home selection={selected} />} />
      </Switch>

    </div>
  );
}

export default App;
