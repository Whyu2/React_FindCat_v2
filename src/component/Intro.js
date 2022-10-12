import { Container, Row, Col, NavLink } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons'


const Intro = () => {
    return(
        <div className="intro">
          <Container className="d-flex justify-content-center align-items-center ">
            <Row>
            <Col>
            <div className="slogan_intro text-white text-center">KUCING</div><br/>
            <div className="text-center text-white ">Apa pengertian dari kucing?
Kucing merupakan hewan dari kelas mamalia. Berdasarkan makannya kucing termasuk binatang karnivora karena pemakan daging. Ciri karnivora terlihat dari struktur gigi kucing yang tajam dan bertaring. Kucing Felis catus merupakan kucing piaraan atau rumahan yang sering kita lihat berkeliara</div>
<div className='icon p-3 text-center '><NavLink href="#listimage" className="text-white"><FontAwesomeIcon icon={faArrowCircleDown} /></NavLink> </div>
            </Col>
            </Row>
        
          </Container>
        </div>
    )
    }
    
    export default Intro;