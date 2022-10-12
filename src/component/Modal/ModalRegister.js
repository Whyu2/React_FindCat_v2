
import {  Col } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import {useState} from "react";
import axios from "axios";
// import { useNavigate } from 'react-router-dom';

function ModalRegister(props) {

  const [nama,setNama] = useState ('');
  const [email,setEmail] = useState ('');
  const [password,setPassword] = useState ('');
  const [cnfrmpassword,setCnfrmpassword] = useState ('');
  const [msg,setMsg] = useState ('');
  // const history = useNavigate();

  const register = async (e) =>{
    try {
      e.preventDefault();
      const data = new FormData();
      data.append('nama', nama);
      data.append('email', email);
      data.append('password', password);
      data.append('cnfrmpassword', cnfrmpassword);
     const response = await axios.post('http://localhost:2000/users/register',data,{
      headers:{
        withCredentials: true
      }
    });
    setMsg(response.data.msg);
    } catch (err) {
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

        >
         <Modal.Header className='header_login ' closeButton>

</Modal.Header>
<form onSubmit={register}>
<Col className='body_login  p-3'>
<div className='text_login text-center '>Register</div>
<hr></hr>
    <div className="flex-rev mt-3">
          <input type="text" placeholder="Masukkan Email" value={email} onChange= {(e) => setEmail(e.target.value) }/>
          <label className='' >Email</label>
  </div>
  <div className="flex-rev ">
          <input type="text" placeholder="Masukkan Password" value={nama} onChange= {(e) => setNama(e.target.value) }/>
          <label className='' >Nama</label>
  </div>
  <div className="flex-rev ">
          <input type="text" placeholder="Masukkan Password" value={password} onChange= {(e) => setPassword(e.target.value) }/>
          <label className='' >Password</label>
  </div>
  <div className="flex-rev ">
          <input type="text" placeholder="Masukkan Password" value={cnfrmpassword} onChange= {(e) => setCnfrmpassword(e.target.value) }/>
          <label className='' >Confirm Password</label>
  </div>
  <span><b>{msg}</b></span>
<div className="d-grid mt-3 gap-2">

<button  type='sumbit' className="btn btn-primary-outline" >
      Register
      </button>
  
    </div>
          </Col>
          </form>
        </Modal>
      </div>
    );
  }
  export default ModalRegister;