import Row from "react-bootstrap/Row";
import api from "../../services/api";
import { useEffect, useState } from "react";
import CardAnuncio from "../../components/cards/anuncio";
import Col from "react-bootstrap/esm/Col";

function Main() {
  const [anuncio, setAnuncio] = useState([]);

  useEffect(() => {
    async function getAnuncio() {
      try {
        const response = await api.get("/anuncio/listagem");
        setAnuncio(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAnuncio();
  }, []);

  return (
    <Row xs={1} md={2} className="mb-2 p-2">
      {anuncio.map((item, i) => (
        <Col xs={4} md={4} sm={4} key={i}>
        <CardAnuncio item={item} indice={i}/>
        </Col>
      ))}
    </Row>
  );
}

export default Main;
