import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/esm/Card";

const CardAnuncio = (props) => {
  return (
    <Card>
      <Card.Img variant="top" src="holder.js/100px160" />
      <Card.Body>
        <Card.Title style={{ textAlign: "center" }}>
          {props.item.produtonome}
        </Card.Title>
        <Card.Text>
          <Row>
            <Col xs={12} md={12} sm={12} style={{ textAlign: "center" }}>
              {props.item.produtornome}
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} sm={12} style={{ textAlign: "center" }}>
              {props.item.cidade} - {props.item.uf}
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={6} sm={6} style={{ textAlign: "left" }}>
              {props.item.qtt}/{props.item.unidade}
            </Col>
            <Col xs={6} md={6} sm={6} style={{ textAlign: "right" }}>
              {props.item.valor}
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default CardAnuncio;
