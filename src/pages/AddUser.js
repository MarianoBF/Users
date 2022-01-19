import {useState, useEffect, useRef} from "react";
import UsersDataService from "../services/users.service";
import {Col, Alert} from "antd";
import useMounted from "../hooks/useMounted";
import {useHistory} from "react-router-dom";
import UserForm from "../components/UserForm";

function AddUser() {
  const history = useHistory();

  const [showSaved, setShowSaved] = useState(false);
  const timer = useRef(true);

  useEffect(() => {
    return () => {
      setShowSaved(false);
      clearTimeout(timer.current);
    };
  }, []);

  const isMounted = useMounted();

  const onFinish = values => {
    const data = {
      last_name: values.last_name,
      first_name: values.first_name,
      email: values.email,
    };
    UsersDataService.createUser(data)
      .then(res => {
        // console.log(res)
        const newUser = res.data;
        const users = JSON.parse(localStorage.getItem("users"))
        users.unshift(newUser)
        localStorage.setItem("users", JSON.stringify(users));
        if (isMounted.current) {
          setShowSaved(true);
          timer.current = setTimeout(() => {
            setShowSaved(false);
            history.push("/");
          }, 3000);
        }
      })
      .catch(error => console.log(error));
  };



  return (
    <div>
      <Col span={12} offset={6}>
        <h1>Agregar Usuario</h1>
        <p>Desde aquí podés agregar un nuevo usuario </p>
        <UserForm onFinish={onFinish} />
        {showSaved && <Alert message="Usuario creado con éxito" type="info" />}
      </Col>
    </div>
  );
}

export default AddUser;
