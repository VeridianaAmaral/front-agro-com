import FormGroup from "react-bootstrap/esm/FormGroup";
import FormLabel from "react-bootstrap/esm/FormLabel";
import Row from "react-bootstrap/esm/Row";
import Input from "../../components/Form/input";
import Col from "react-bootstrap/esm/Col";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page2(props) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    props.formRef.current.setData(props.dados)
  }, [])

  return (
    <>
      <Row>
        <FormGroup as={Col} xs={6} md={6} sm={6}>
          <FormLabel>Data de Nascimento</FormLabel>
          <Input name="data_nascimento" type="date" />
        </FormGroup>
        <FormGroup as={Col} xs={6} md={6} sm={6}>
          <FormLabel>CEP</FormLabel>
          <Input
            maxLength={8}
            isLoading={isLoading}
            name="cep"
            onChange={() => {
              props.formRef.current.setErrors({});
            }}
            onBlur={async (e) => {
              if (e.target.value.length == 8) {
                try {
                  setIsLoading(true);
                  const response = await axios.get(
                    `https://viacep.com.br/ws/${e.target.value}/json`
                  );

                  if (response.data.erro) {
                    props.formRef.current.setFieldError(
                      "cep",
                      "CEP não encontrado"
                    );
                  }
                  props.formRef?.current.setFieldValue("uf", response.data.uf);
                  props.formRef?.current.setFieldValue(
                    "bairro",
                    response.data.bairro
                  );
                  props.formRef?.current.setFieldValue(
                    "cidade",
                    response.data.localidade
                  );
                  props.formRef?.current.setFieldValue(
                    "logradouro",
                    response.data.logradouro
                  );
                  setIsLoading(false);
                } catch (err) {
                  setIsLoading(false);
                  console.log(err);
                  props.formRef.current.setFieldError("cep", "Erro ao buscar CEP");
                }
              }
            }}
          />
        </FormGroup>
      </Row>

      <Row>
        <FormGroup as={Col} xs={6} md={6} sm={6}>
          <FormLabel>Estado</FormLabel>
          <Input name="uf" />
        </FormGroup>
        <FormGroup as={Col} xs={6} md={6} sm={6}>
          <FormLabel>Número</FormLabel>
          <Input name="numero" />
        </FormGroup>
      </Row>
      <Row>
        <FormGroup as={Col} xs={12} md={12} sm={12}>
          <FormLabel>Cidade</FormLabel>
          <Input name="cidade" />
        </FormGroup>
      </Row>
      <Row>
        <FormGroup as={Col} xs={12} md={12} sm={12}>
          <FormLabel>Bairro</FormLabel>
          <Input name="bairro" />
        </FormGroup>
      </Row>
      <Row>
        <FormGroup as={Col} xs={12} md={12} sm={12}>
          <FormLabel>Logradouro</FormLabel>
          <Input name="logradouro" />
        </FormGroup>
      </Row>
    </>
  );
}
