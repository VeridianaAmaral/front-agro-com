import { Form } from "@unform/web";
import { useRef, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Modal from "react-bootstrap/esm/Modal";
import ModalFooter from "react-bootstrap/esm/ModalFooter";
import Bolinhas from "../../components/Diversos/Bolinha";
import Page1 from "./1";
import Page2 from "./2";
import * as Yup from "yup";
import Page3 from "./3";
import api from "../../services/api";
import { BsPersonCircle } from "react-icons/bs";
import { Color } from "../../Utils/styles";
import Alert from "react-bootstrap/esm/Alert";
import { validacaoYup } from "../../Utils/functions";

const CadastroUsuario = (props) => {
  const formRef = useRef(null);
  const [page, setPager] = useState(1);
  const [consumidor, setConsumidor] = useState(true);
  const [page1, setPage1] = useState({});
  const [page2, setPage2] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setShowAlertMessage] = useState("");

  async function validar(page, data) {
    let schema = Yup.object().shape({});
    if (page == 1) {
      schema = Yup.object().shape({
        nome: Yup.string()
          .min(3, "No mímino 3 caracteres")
          .required("Nome é obrigatório"),
        email: Yup.string().required("Email é obrigatório"),
        senha: Yup.string().required("Senha é obrigatório"),
      });
    }
    if (page == 2) {
      schema = Yup.object().shape({
        data_nascimento: Yup.string().required(
          "Data de nascimento é obrigatório"
        ),
        cep: Yup.string().required("CEP é obrigatório"),
        uf: Yup.string().required("Estado é obrigatório"),
        cidade: Yup.string().required("Cidade é obrigatório"),
        bairro: Yup.string().required("Bairro é obrigatório"),
        logradouro: Yup.string().required("Logradouro é obrigatório"),
        numero: Yup.string().required("Número é obrigatório"),
      });
    }
    await schema.validate(data, {
      abortEarly: false,
    });
    page == 1 ? setPage1(data) : setPage2(data);
  }

  const handleSubmit = async () => {
    try {
      let data = {
        ...page1,
        ...page2,
        consumidor,
      };

      console.log("ENVIANDO O JSON =>\n");
      console.log(data);
      const result = await api.post("/usuario/cadastro", data);
      if (result?.data?.data) {
        props.handleCloseCadastro();
      }
    } catch (error) {
        console.log(error);
      setShowAlertMessage(error.response.data.error);
      setShowAlert(true);
      
    }
  };
  return (
    <>
      <Modal
        show={true}
        onClose={props.handleCloseCadastro}
        className="p-2"
        size="md"
        style={{ borderRadius: "20px" }}
      >
        <Modal.Header
          style={{ textAlign: "center", backgroundColor: Color.colorGreen }}
        >
          <Row style={{ backgroundColor: Color.colorGreen }}>
            <Bolinhas page={page} />
          </Row>
          <Row>
            <Modal.Title>
              {page == 1
                ? "Informações Básicas"
                : page == 2
                ? "Complemetando seus Dados"
                : "Confira suas informações"}
            </Modal.Title>
          </Row>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: Color.colorGreen }}>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div>
              {page == 1 ? (
                <>
                  <Row>
                    <Col className="d-flex flex-row align-items-center justify-content-center">
                      <Col md={2} sm={2} lg={2} className="text-center">
                        <BsPersonCircle
                          size="42px"
                          title="Produtor"
                          color={
                            !consumidor
                              ? Color.colorDisabled
                              : Color.colorGray_200
                          }
                          onClick={() => setConsumidor(false)}
                        />
                        <p className="text-start" style={{ color: "black" }}>
                          Produtor
                        </p>
                      </Col>
                      <Col md={2} sm={2} lg={2} className="text-center">
                        <BsPersonCircle
                          size="42px"
                          color={
                            !consumidor
                              ? Color.colorGray_200
                              : Color.colorDisabled
                          }
                          onClick={() => setConsumidor(true)}
                        />
                        <p style={{ color: "black" }} className="text-start">
                          Consumidor
                        </p>
                      </Col>
                    </Col>
                  </Row>

                  <Page1 formRef={formRef} dados={{...page1}}/>
                </>
              ) : page == 2 ? (
                <Page2 formRef={formRef} dados={{...page2}} />
              ) : (
                <Page3 dados={{ ...page1, ...page2 }} />
              )}
              {showAlert && (
                <Alert variant="danger">{alertMessage}</Alert>
              )}
            </div>
            <ModalFooter className="d-flex flex-row justify-content-center">
              <Row className="d-flex flex-row justify-content-center">
                <Col xs={6} md={6} sm={6}>
                  <Button
                    style={{
                      backgroundColor: Color.colorGreenButton,
                      borderColor: Color.colorGreenButton,
                    }}
                    onClick={() => {
                      if (page == 1) {
                        props.handleCloseCadastro();
                        return;
                      }
                      setPager(page - 1);
                    }}
                  >
                    {page != 1 ? "Voltar" : "Fechar"}
                  </Button>
                </Col>
                <Col xs={6} md={6} sm={6}>
                  <Button
                    style={{
                      backgroundColor: Color.colorGreenButton,
                      borderColor: Color.colorGreenButton,
                    }}
                    onClick={async (e) => {
                      const data = formRef.current.getData();
                      if (page != 3) {
                        e.preventDefault();
                        try {
                          await validar(page, data);
                          setPager(page + 1);
                        } catch (err) {
                          let errorMessages = validacaoYup(err);
                          formRef.current.setErrors(errorMessages);
                        }
                      } else {
                        handleSubmit();
                      }
                    }}
                  >
                    {page != 3 ? "Avançar" : "Concluir"}
                  </Button>
                </Col>
              </Row>
            </ModalFooter>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CadastroUsuario;
