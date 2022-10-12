import {Navbar, Container, Nav, Image,NavDropdown } from "react-bootstrap";

import ModalAddPost from "./Modal/ModalAddPost";
import { useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faRightFromBracket ,faRectangleList, faPlus} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
const NavigationBar = () => {

    const [model2, setModel2] = useState (false);
    const [foto, setFoto] = useState (false);
    const history = useNavigate();


    const refreshToken = async ()=>{
        try {
          const responeT = await axios.get('http://localhost:2000/token',{
            withCredentials: true,
          });
     
          const decode = jwt_decode(responeT.data.accessToken);
        
          setFoto(decode.foto);
        } catch (error) {
              history('/');
        }
      }
      useEffect(()=>{
        refreshToken();
      });
 const logout = async ()=>{
    try {
        await axios.delete('http://localhost:2000/users/logout',{
            withCredentials: true
        });
        history("/");
    } catch (error) {
        
    }
 }

return(
    <div className="navigation">
        <Navbar>
            <Container>
                <Navbar.Brand href="/index" className="logo ">FindCat</Navbar.Brand>
                <Nav>
                    <Nav.Link></Nav.Link>
                
                    <NavDropdown id="collasible-nav-dropdown"> 
                        <NavDropdown.Item href="/dasboard"><FontAwesomeIcon icon={faAddressCard}/> Dashboard</NavDropdown.Item>
                      
                        <NavDropdown.Item href="/listpost"><FontAwesomeIcon icon={faRectangleList}/> List Post</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => setModel2(true)}><FontAwesomeIcon icon={faPlus}/>Add Post</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}><FontAwesomeIcon  icon={faRightFromBracket}/> Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                    <div className='profile_nav'><Image   src={`http://localhost:2000/${foto}`} /></div>
                </Nav>
            </Container>
        </Navbar>
   
              <ModalAddPost
              show={model2}
              onHide={() => setModel2(false)}
            />
    </div>
)
}

export default NavigationBar;