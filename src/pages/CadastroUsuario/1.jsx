import FormGroup from "react-bootstrap/esm/FormGroup";
import FormLabel from "react-bootstrap/esm/FormLabel";
import Row from "react-bootstrap/esm/Row";
import Input from "../../components/Form/input";
import Col from "react-bootstrap/esm/Col";
import { useEffect, useState } from "react";

export default function Page1(props) {
  useEffect(() => {
    props.formRef.current.setData(props.dados);
  }, []);

  return (
    <>
      <Row>
        <FormGroup as={Col} xs={12} md={12} sm={12}>
          <FormLabel>Nome</FormLabel>
          <Input
            name="nome"
            type="text"
          />
        </FormGroup>
      </Row>
      <Row>
        <FormGroup as={Col} xs={12} md={12} sm={12}>
          <FormLabel>Email</FormLabel>
          <Input name="email" type="email" />
        </FormGroup>
      </Row>
      <Row>
        <FormGroup as={Col} xs={12} md={12} sm={12}>
          <FormLabel>Senha</FormLabel>
          <Input name="senha" type="password" />
        </FormGroup>
      </Row>
    </>
  );
}
