import "./App.css";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />

      <Switch>
        <Route exact path="/edit/:user_id" component={EditUser} />
        <Route exact path="/edit" component={EditUser} />
        <Route exact path="/add" component={AddUser} />
        <Route path="/" render={() => <Home />} />
      </Switch>
    </div>
  );
}

export default App;
