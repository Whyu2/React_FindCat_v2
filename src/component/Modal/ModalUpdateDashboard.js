import { Row,Image} from 'react-bootstrap';
import {  Col } from "react-bootstrap";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";


function ModalUpdateDashboard(props) {
  const [id,] = useState (props.id);
  const [savefoto,setSavefoto] = useState (`http://localhost:2000/${props.foto}`);
  const [foto,setFoto] = useState (`http://localhost:2000/${props.foto}`);
  const [nama,setNama] = useState (props.nama);
  const [email,setEmail] = useState (props.email);
  const [msg,setMsg] = useState ('');

  const upload = async (e) =>{
    
    let uploaded = e.target.files[0];
    setFoto(URL.createObjectURL(uploaded));
    setSavefoto(uploaded);
  }

  const save_post = async(e) => {
    try {
     e.preventDefault();
     const data = new FormData();
     data.append('nama', nama);
     data.append('email', email);
     data.append('foto', savefoto);
   const response = await axios.put(`http://localhost:2000/users/${id}`,data,{
       headers:{
         withCredentials: true
       }
     });
   
     setMsg(response.data.msg);
   
    }  catch (err) {
         if (err.response){
           setMsg(err.response.data.msg);
         }
     }
     }

    return (
      <div  className="modallogin">
        <Modal
          {...props}
          size="lg"
          aria-labelledby="example-modal-sizes-title-lg"
          animation={false}
        >
         <Modal.Header className='header_login ' closeButton>
Update Dashboard 
</Modal.Header>
<form onSubmit={save_post}>
<Col className='body_login  p-3'>
<Row>
<Col md={4}>

            <div className='foto_dashboard mx-auto'><Image  src={foto} /></div>
            <div className="col-12 p-2 mx-auto ">
                <input className="form-control"
                         type="file"  
                         id="foto" 
                         accept="image/*"
                         onChange={upload}
                        />
                        </div>    
     
</Col>
<Col  md={8}>
<div className="flex-rev mt-3">
          <input type="text" placeholder="Masukkan Username" value={nama} onChange= {(e) => setNama(e.target.value) }/>
          <label className='' >Nama</label>
  </div>
  <div className="flex-rev ">
          <input type="text" placeholder="Masukkan Email" value={email} onChange= {(e) => setEmail(e.target.value) }/>
          <label className='' >Email</label>
  </div>



<div className="d-grid mt-3 gap-2">
<button  type='sumbit' className="btn btn-primary-outline" >
      <b>Simpan</b>
      </button>
  
    </div>
    <span className='text-success'>{msg}</span>
</Col>

</Row>

   
          </Col>
          </form>
        </Modal>
      </div>
    );
  }
  export default ModalUpdateDashboard;