import { useState, useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import axios from "axios";
import ModalPop from "./Modal/ModalPop";


const ListImages = () => {
    const [model, setModel] = useState (false);
    const [Lists,setList] = useState([]);
    const [tempData, setTempdata] = useState([]);
 
    useEffect(()=>{
        get_data();
      }, []);

    const get_data = async()=>{
        try {
            const respone = await axios.get('http://localhost:2000/posts',{
                withCredentials: true,
              });
            setList(respone.data);
        } catch (error) {
            
        }
    }


    const get_modal = (id,judul_postingan,foto,jenis,postingan,createdat, nama,userfoto)=>{
        let tempData = [id,judul_postingan,foto,jenis,postingan,createdat,nama,userfoto];
        setTempdata(item =>[1,...tempData]);
        return setModel(true);
    }
    return(
        <div className="listimages" id="listimage">
            <Container>
                <div className="tittle_list" >Post</div>
                <div className="test" >

                <Row>
                    {Lists.map((list,index)=>(
                    <Col key={list.id}  xs={6} md={3} className="test justify-content-center align-items-center" >
                    <Image  onClick={() => get_modal(list.id,list.judul_postingan,list.foto,list.jenis,list.postingan,list.createdat,list.user.nama,list.user.foto)} 
                    src={`http://localhost:2000/${list.foto}`} 
                    className="w-100 justify-content-center align-items-center shadow-1-strong foto_list"
                    >
                    </Image>
                    </Col>
                    ))}
                </Row>
                </div>
            </Container>
                        {
                            model === true ? <ModalPop  id={tempData[1]} judul_postingan ={tempData[2]} foto ={tempData[3]} jenis={tempData[4]} postingan={tempData[5]}   createdat={tempData[6]} username={tempData[7]} userfoto={tempData[8]}
                            show={model}    
                            onHide={() => setModel(false)} 
                            /> : ''
                        }


            {/* <ModalPop
              show={model}
              onHide={() => setModel(false)}
            /> */}
        </div>
    )
    }
export default ListImages;