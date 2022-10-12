import {Image,Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import ModalRegister from './Modal/ModalRegister';
import { useNavigate } from 'react-router-dom';
import login_image from "../assets/images/login.jpg";
import axios from "axios";
const Login = () => {
  const [email,setEmail] = useState ('');
  const [password,setPassword] = useState ('');
  const [model, setModel] = useState (false);
  const [msg,setMsg] = useState ('');
  const history = useNavigate();

  const login = async (e) =>{
    try {
      e.preventDefault();
      await axios.post('http://localhost:2000/users/login',{
        email : email,
        password : password,
    },{
      withCredentials: true,
    });
    history('/index');
    }
    catch (err) {
      if (err.response){
        setMsg(err.response.data.msg);
      }
    }
}

  
    return(
        <div className="login">
        <Container className=" ">
          <Row className="justify-content-md-center">
          <Col md={4}>
            <div className="login_image mx-auto text-center">
            
           <Image  src={login_image} />
             
            </div>
          </Col>
          <Col md={4}>
          <div className=" p-5 border_dashboard ">
            <div className="logo text-center mb-3">
              <h3>
              FindCat
               </h3>
              </div>
   
        <form onSubmit={ login }>
          <div><p className="text-danger text-center"><b>{msg}</b></p></div>
              <div className="flex-rev mt-3">
                    <input type="text" placeholder="Masukkan Email"  value={email} onChange= {(e) => setEmail(e.target.value) }/>
              
            </div>
            <div className="flex-rev ">
                    <input type="text" placeholder="Masukkan Password" value={password} onChange= {(e) => setPassword(e.target.value) }/>
            
            </div>
         
       
    <div className="d-grid mt-3 gap-2">
      <button  type='sumbit' className="btn btn-primary-outline" >
      Masuk
      </button>
  
    </div>
    </form>
    <div onClick={() => setModel(true)}  className="mt-3 "><label> Belum punya akun ? <span className='text-primary'>Register</span></label></div>


            </div>
          
            </Col>
          </Row>
          <Row>
         <Col>
         </Col>
          </Row>
        </Container>
        <ModalRegister
              show={model}
              onHide={() => setModel(false)}
        />
      </div>

    )}

    export default Login;