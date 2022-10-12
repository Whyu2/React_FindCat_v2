
import { Image,Row,Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar,faCat} from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal';
// import cat1 from "../../assets/images/1.jpg";
import Moment from 'moment';
function ModalPop(props) {
  return (
    <div className="modalpop">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
        animation={false}
      >
        <Modal.Header className=' p-2 px-3' closeButton>
          <div className='profile_pop'>
        <Image  src={`http://localhost:2000/${props.userfoto}`}  />
          </div>
          <Modal.Title id="example-modal-sizes-title-lg"><span className='p-2 text_list'>{props.username}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='nopadding' >
      <Row>
      <Col  md={6}>
        <div>
      <Image  src={`http://localhost:2000/${props.foto}`}  className="w-100" />
        </div>
      </Col>
      <Col className='px-4'  md={6}>
      <div className='mt-2' ><h4><b>{props.judul_postingan}</b></h4></div>
      <Row className='mt-2'>
        <Col className='text_list' ><FontAwesomeIcon icon={faCalendar}/> {Moment(props.createdat).format('MMM Do YY')}</Col>
        <Col className='text_list' ><FontAwesomeIcon icon={faCat}/> {props.jenis}</Col>
      </Row>
      <div className='mt-2 text_list'> <p>{props.postingan}</p></div>
      </Col>

          </Row>
 
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalPop;
