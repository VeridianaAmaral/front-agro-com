import React, { Fragment, useEffect, useRef } from "react";
import { useField } from "@unform/core";
import { styled } from "@stitches/react";
import { Color } from "../../Utils/styles";

const Small = styled("small", {
  margin: "10px 0 20px",
  color: Color.colorError,
  fontSize: 13,
  lineHeight: 1.5,
  width: "100%",
  display: "block",
});

const InputCheckBox = styled("input", {
  aall: "unset",
  marginRight: "10px",
  cursor: "pointer",
  //content: '\e83f',
  width: "22px",
  height: "22px",
  display: "inline-block",
  border: "2px solid rgb(#e9eaec)",
  borderRadius: 4,
  fontSize: 15,
  fontFamily: "feather",
  fontWeight: 100,
  lineHeight: "19px",
  verticalAlign: "bottom",
  textAlign: "center",
  color: "transparent",
  transition: "all 0.2s ease-in-out",
  "&:focus": {
    boxShadow: `0 0 0 0.25rem rgb(13 110 253 / 25%)`,
    border: "1px solid #86b7fe",
  },
});

const LabelCheckBox = styled("label", {
  color: "grey",
  display: "inline-flex",
  marginRight: "5rem",
  "&:hover": { color: "#212529" },
  "&:focus": {
    color: "#212529",
    boxShadow: `0 0 0 0.25rem rgb(13 110 253 / 25%)`,
  },
});

const FieldSet = styled("fieldset", {
  marginBottom: "20px",
  // display: "inline-flex",
  marginRight: "1rem",
});

export default function Checkbox({ name, value, label, ...rest }) {
  const inputRef = useRef();
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const defaultChecked = defaultValue === value;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.checked;
      },
      clearValue: (ref) => {
        ref.current.checked = defaultChecked;
      },
      setValue: (ref, value) => {
        ref.current.checked = value;
      },
    });
  }, [defaultValue, fieldName, registerField, defaultChecked]);

  return (
    <FieldSet>
      <InputCheckBox
        defaultChecked={defaultChecked}
        ref={inputRef}
        value={value}
        type="checkbox"
        id={fieldName}
        {...rest}
      />
      <LabelCheckBox htmlFor={fieldName} key={fieldName}>
        {label}
      </LabelCheckBox>
      {error && <Small>{error}</Small>}
    </FieldSet>
  );
}
