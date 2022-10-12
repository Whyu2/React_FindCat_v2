
import {  Col } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";

import axios from "axios";


function ModalUpdatePassword(props) {
  const [id,] = useState (props.id);
  const [passwordlama,setPasswordlama] = useState ('');
  const [passwordbaru,setPasswordbaru] = useState ('');
  const [cnfrmpasswordbaru,setCnfrmpasswordbaru] = useState ('');
  const [msg,setMsg] = useState ('');

  const save_post = async(e) => {
    try {
     e.preventDefault();
     const data = new FormData();
     data.append('passwordlama', passwordlama);
     data.append('passwordbaru', passwordbaru);
     data.append('cnfrmpasswordbaru', cnfrmpasswordbaru);
   const response = await axios.put(`http://localhost:2000/users/password/${id}`,data,{
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
          size="sm"
          aria-labelledby="example-modal-sizes-title-lg"
          animation={false}
        >
         <Modal.Header className='header_login ' closeButton>

</Modal.Header>
<form onSubmit={save_post}>
<Col className=' body_login  p-3'>

    <div className="flex-rev mt-3">
          <input type="password" placeholder="Password Lama"  value={passwordlama} onChange= {(e) => setPasswordlama(e.target.value) }/>
          <label className='' >Password Lama</label>
  </div>
  <div className="flex-rev ">
          <input type="password" placeholder="Password Baru"  value={passwordbaru} onChange= {(e) => setPasswordbaru(e.target.value) }/>
          <label className='' >Password Baru</label>
  </div>
  <div className="flex-rev ">
          <input type="password" placeholder="Konfirm Password Baru" value={cnfrmpasswordbaru} onChange= {(e) => setCnfrmpasswordbaru(e.target.value) }/>
          <label className='' >Konfirm Password Baru</label>
  </div>


<div className="d-grid mt-3 gap-2">

<button  type='sumbit' className="btn btn-danger" >
      <b>Simpan</b>
      </button>
  
    </div>
    <span className='text-success'>{msg}</span>
          </Col>
          </form>
        </Modal>
      </div>
    );
  }
  export default ModalUpdatePassword;