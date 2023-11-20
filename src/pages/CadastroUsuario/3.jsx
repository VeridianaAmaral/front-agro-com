import Row from "react-bootstrap/esm/Row";



export default function Page3(props) {
  return (
    <>
      <Row>
        <p>Nome: {props.dados.nome}</p>
      </Row>
      <Row>
        <p>Email: {props.dados.email}</p>
      </Row>
      <Row>
        <p>CEP: {props.dados.cep}</p>
      </Row>
    </>
  );
}
