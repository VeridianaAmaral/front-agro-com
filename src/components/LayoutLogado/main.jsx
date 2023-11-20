import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link as RouterLink } from "react-router-dom";
import CadastroUsuario from "../../pages/CadastroUsuario/main";

const LayoutLogado = ({ children }) => {
  const [showModalCadastro, setShowModalCadastro] = useState(false);

  const handleCloseCadastro = () => {
    console.log(showModalCadastro);
    setShowModalCadastro(false);
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <RouterLink className="nav-brand" to="/">
            Home
          </RouterLink>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Button
                className="nav-link"
                onClick={() => {
                  console.log(showModalCadastro);
                  setShowModalCadastro(true);
                }}
              >
                Cadastrar na plataforma
              </Button>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div
        className="container py-4"
        style={{ backgroundColor: "#B8B8B8B8", height: "100%", width: "100%" }}
      >
        {showModalCadastro && (
          <CadastroUsuario handleCloseCadastro={handleCloseCadastro} />
        )}

        <div className="m-2 container-fluid py-2" style={{ fontSize: "10px" }}>
          {children}
        </div>
      </div>

      <footer
        className="page-footer font-small blue pt-4 fixed-bottom"
        style={{ backgroundColor: "#94A653" }}
      >
        <div className="container-fluid text-center mb-2 text-white">
          <div className="row">
            <div className="col-md-3 d-flex flex-row justify-content-center">
              <p className="fixed-left align-self-center">Agrocon</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0" />

            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase">Links</h5>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase">Links</h5>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LayoutLogado;
