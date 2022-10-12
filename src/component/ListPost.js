
import {Image,Button,Container, Row, Col } from "react-bootstrap";
import {useState,useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar,faTrash, faPenToSquare,faCat } from '@fortawesome/free-solid-svg-icons'
import Moment from 'moment';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import ModalEditPost from "./Modal/ModalEditPost";
const ListPost =()=>{
  const [model, setModel] = useState (false);

  const [tempData, setTempdata] = useState([]);
  const [list,setList] = useState([]);
  const history = useNavigate();

  useEffect(()=>{
    get_data()
  });

  const get_data = async ()=>{
    try {
      //validasi api token
      const responeT = await axios.get('http://localhost:2000/token',{
        withCredentials: true,
      });
      const decode = jwt_decode(responeT.data.accessToken);

      const respone = await axios.get(`http://localhost:2000/posts/user-post/${decode.userId}`,{
        headers: {
        withCredentials: true,
        }
      });

      setList(respone.data);

    } catch (error) {
          history('/');
    }
  }

  const get_modal = (judul_postingan,jenis,foto,postingan,id)=>{
    let tempData = [judul_postingan,jenis,foto,postingan,id];
    setTempdata(item =>[1,...tempData]);
    return setModel(true);
}
    return(
        <div className="dashboard">
        <Container className="justify-content-center  ">
          <Row>
          <div className="tittle_dashboard">List Post</div>
          {list.map((list,index)=>(
          <Col md={12}  className="mt-1">
   
          <div className=" p-1  border_dashboard ">
    
              <Row>
       
              <Col sm={4} className=" text-center">
                    <Image   src={`http://localhost:2000/${list.foto}`} 
                    className="list_image_dashboard "></Image>
              </Col>
                <Col className="p-2" sm={8}>
                <div className='mt-2' ><h4><b>{list.judul_postingan}</b></h4></div>
                
                    <div><FontAwesomeIcon icon={faCalendar}/> {Moment(list.createdat).format('MMM Do YY')}</div>
                    <Col className='text_list' ><FontAwesomeIcon icon={faCat}/> {list.jenis}</Col>
                    <div><p>{list.postingan}</p></div>
                    <Row xs="auto">
                      <Col><Button onClick={() => get_modal(list.judul_postingan,list.jenis,list.foto,list.postingan, list.id)} variant="outline-success" href="#"><FontAwesomeIcon icon={faPenToSquare}/></Button></Col>
                      <Col><Button variant="outline-danger" href="#"><FontAwesomeIcon icon={faTrash}/></Button></Col>
                    </Row>
                    
                    </Col>
           
              </Row>
  
            </div>
 
          
            </Col>
                       ))}
        
         
            
          </Row>
          <Row>
         <Col>
         </Col>
          </Row>
        </Container>
        {
                            model === true ? <ModalEditPost  judul_postingan={tempData[1]} jenis ={tempData[2]} foto ={tempData[3]} postingan={tempData[4]} id={tempData[5]}
                            show={model}    
                            onHide={() => setModel(false)} 
                            /> : ''
                        }
      </div>

    )
}

export default ListPost;