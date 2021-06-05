import {useState, useEffect, useRef} from "react";
import UsersDataService from "../services/users.service";
import {Col, Alert} from "antd";
import useMounted from "../hooks/useMounted";
import {useHistory} from "react-router-dom";
import UserForm from "./UserForm/UserForm";

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
        console.log(res.data);
        const newUser = [res.data]
        localStorage.setItem('users', JSON.stringify(newUser))
        if (isMounted.current) {
          setShowSaved(true);
          timer.current = setTimeout(() => setShowSaved(false), 3000);
        }
      })
      .catch(error => console.log(error));
  };



  return (
    <div>
      <Col span={12} offset={6}>
        <h1>Agregar Usuario</h1>
        <p>Desde aquí podés agregar un nuevo usuario </p>
        {showSaved && <Alert message="Usuario creado con éxito" type="info" />}
        <UserForm onFinish={onFinish} />
      </Col>
    </div>
  );
}

export default AddUser;
