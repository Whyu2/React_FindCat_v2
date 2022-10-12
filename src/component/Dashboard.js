import {Image,Button,Container, Row, Col } from "react-bootstrap";
import { useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ModalUpdatePassword from "./Modal/ModalUpdatePassword";
import ModalUpdateDashboard from "./Modal/ModalUpdateDashboard";

import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const [model, setModel] = useState (false);
  const [model2, setModel2] = useState (false);
  const [id,setId] = useState ('');
  const [nama,setNama] = useState ('');
  const [email,setEmail] = useState ('');
  const [foto,setFoto] = useState ('');
  const [tempData, setTempdata] = useState([]);
  const history = useNavigate();

  useEffect(()=>{
    refreshToken();
  }, []);
  const refreshToken = async ()=>{
    try {
      const responeT = await axios.get('http://localhost:2000/token',{
        withCredentials: true,
      });
 
      const decode = jwt_decode(responeT.data.accessToken);
      setId(decode.userId);
      setNama(decode.nama);
      setEmail(decode.email);
      setFoto(decode.foto);   
    } catch (error) {
          history('/');
    }
  }

  const get_modal = (nama,email,foto,id)=>{
    let tempData = [nama,email,foto,id];
    setTempdata(item =>[1,...tempData]);
    return setModel(true);
  }

  const get_modal2 = (id)=>{
    let tempData = [id];
    setTempdata(item =>[1,...tempData]);
    return setModel2(true);
  }
  
    return(
        <div className="dashboard">
        <Container className="justify-content-center  ">
          <Row>
          <div className="tittle_dashboard">Dashboard </div>
          <Col md={4}>
            <div className="border_dashboard d-flex justify-content-center align-items-center ">
            
              <div className='foto_dashboard'><Image  src={`http://localhost:2000/${foto}`} /></div>
             
            </div>
          </Col>
          <Col md={8}>
          <div className=" p-3 border_dashboard ">
            <div>
              <h3>Informasi User</h3>
          
              </div>
              <Row>
                <Col className="mt-1" md={6}><label><FontAwesomeIcon icon={faUser}/> Username</label></Col>
                <Col md={6}>{nama}</Col>
              </Row>
              <Row>
              <Col className="mt-1" md={6}><label><FontAwesomeIcon icon={faEnvelope}/> Email</label></Col>
                <Col md={6}>{email}</Col>
              </Row>
        
              <div className="mt-4">
              
                <Row xs={2} md={4} lg={6}>
                  <Col><Button onClick={() => get_modal(nama,email,foto,id)} variant="outline-success">Update</Button>{' '}</Col>
                  <Col  onClick={() => get_modal2(id)}><Button variant="outline-danger">Password</Button>{' '}</Col>
                </Row>
              </div>
            </div>
          
            </Col>
          </Row>
          <Row>
         <Col>
         </Col>
          </Row>
        </Container>
        {/* <ModalUpdateDashboard
              show={model}
              onHide={() => setModel(false)}
            /> */}

                {
                            model === true ? <ModalUpdateDashboard  nama={tempData[1]} email ={tempData[2]} foto ={tempData[3]}  id ={tempData[4]} 
                            show={model}    
                            onHide={() => setModel(false)} 
                            /> : ''
                        }
       {
                            model2 === true ? <ModalUpdatePassword  id={tempData[1]} 
                            show={model2}    
                            onHide={() => setModel2(false)} 
                            /> : ''
                        }
          
      </div>

    )}

    export default Dashboard;