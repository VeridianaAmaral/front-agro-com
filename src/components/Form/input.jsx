import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import { styled } from "@stitches/react";
import Spinner from "react-bootstrap/Spinner";
import { Color } from "../../Utils/styles";

const Small = styled("small", {
  margin: "10px 0 20px",
  color: Color.colorError,
  fontSize: 13,
  lineHeight: 1.5,
});

const InputText = styled("input", {
  aall: "unset",
  color: `grey`,
  width: "100%",
  flex: "1",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 30,
  padding: "10px 20px",
  fontSize: 15,
  lineHeight: 1,
  boxShadow: `0 0 0 1px grey / 25%`,
  height: "30px",
  border: `1px solid grey`,
  fontSize: "14px",
  //backgroundColor:'#f4f7fa',

  "&:focus": {
    color: "#212529",
    boxShadow: `0 0 0 0.25rem rgb(13 110 253 / 25%)`,
    border: "1px solid #86b7fe",
  },
});

const FieldSet = styled("fieldset", {
  marginBottom: "10px",
});

export default function Input({ name, type, onChange, onBlur, ...rest }) {
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const { isLoading } = { ...rest };
  const inputRef = useRef(null);

  function onChangeForm(e){
    if(typeof onChange === "function"){
        onChange(e);
    }
  }
  function onBlurForm(e){
    if(typeof onBlur === "function"){
        onBlur(e);
    }
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  if (type != "hidden")
    return (
      <FieldSet>
        <InputText
        onChange={(e) => onChangeForm(e)}
        onBlur={(e) => onBlurForm(e)}

          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
          id={fieldName}
          type={type || "text"}
        />
        {isLoading && (
          <Spinner animation="grow" size="sm" role="status">
            <span className="visually-hidden"></span>
          </Spinner>
        )}
        {error && <Small>{error}</Small>}
      </FieldSet>
    );
  else {
    return (
      <>
        <input
          type={type}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
          id={fieldName}
        />
        {error && <Small>{error}</Small>}
      </>
    );
  }
}
