import { Row,Image} from 'react-bootstrap';
import {  Col } from "react-bootstrap";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

function ModalEditPost(props) {

  const [id,] = useState (props.id);
  const [judul_postingan,setJudul_postingan] = useState (props.judul_postingan);
  const [jenis,setJenis] = useState (props.jenis);
  const [postingan,setPostingan] = useState (props.postingan);
  const [foto,setFoto] = useState (`http://localhost:2000/${props.foto}`);
  const [savefoto,setSavefoto] = useState (`http://localhost:2000/${props.foto}`);
  const [msg,setMsg] = useState ('');


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
  data.append('judul_postingan', judul_postingan);
  data.append('jenis', jenis);
  data.append('postingan', postingan);
  data.append('foto', savefoto);
const response = await axios.put(`http://localhost:2000/posts/${id}`,data,{
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
         <b>Edit Post</b>
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
          <label className='' >Judul Postingan </label>
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
      <b>Simpan Post</b>
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
  export default ModalEditPost;