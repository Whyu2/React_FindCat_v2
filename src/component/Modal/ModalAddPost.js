import { Row,Image} from 'react-bootstrap';
import {  Col } from "react-bootstrap";
import { useState,useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
function ModalAddPost(props) {

  const [id,setId] = useState ('');
  const [judul_postingan,setJudul_postingan] = useState ('');
  const [jenis,setJenis] = useState ('');
  const [postingan,setPostingan] = useState ('');
  const [foto,setFoto] = useState ('http://fakeimg.pl/350x300/');
  const [savefoto,setSavefoto] = useState ('');
  const [msg,setMsg] = useState ('');
  const history = useNavigate();


  useEffect(()=>{refreshToken();});
  const refreshToken = async ()=>{
    try {
      const responeT = await axios.get('http://localhost:2000/token',{
        withCredentials: true,
      });
 
      const decode = jwt_decode(responeT.data.accessToken);
      setId(decode.userId);

    } catch (error) {
          history('/');
    }
  }

  const upload = async (e) =>{
    console.log(e.target.files[0]);
    let uploaded = e.target.files[0];
    setFoto(URL.createObjectURL(uploaded));
    setSavefoto(uploaded);
  }

  const save_post = async(e) => {
 try {
  e.preventDefault();
  const data = new FormData();
  data.append('user_id', id);
  data.append('judul_postingan', judul_postingan);
  data.append('jenis', jenis);
  data.append('postingan', postingan);
  data.append('foto', savefoto);
const response = await axios.post('http://localhost:2000/posts',data,{
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
      
        >
         <Modal.Header className='header_login ' closeButton>
         <b>Tambah Post</b>
</Modal.Header>


<form onSubmit={save_post}>
  <Col className=' body_login  p-3'>
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
          <input type="text" placeholder="Judul Post " value={judul_postingan} onChange={(e)=>setJudul_postingan(e.target.value)} />
          <label className='' >Judul Postingan</label>
  </div>
  <div className="flex-rev ">
          <input type="text" placeholder="Jenis Kucing" value={jenis} onChange={(e)=>setJenis(e.target.value)} />
          <label className='' >Jenis Kucing</label>
  </div>
  <div className="flex-rev ">
          <input type="text" placeholder="Isi Post"  value={postingan} onChange={(e)=>setPostingan(e.target.value)} />
          <label className='' >Isi Post</label>
  </div>


<div className="d-grid mt-3 gap-2">
<button  type='sumbit' className="btn btn-primary-outline" >
      <b>Tambah Post</b>
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
  export default ModalAddPost;