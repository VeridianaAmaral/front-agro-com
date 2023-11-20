import { useRef, useEffect, useState } from "react";
import { useField } from "@unform/core";
import { styled } from "@stitches/react";
import { Color } from "../../Utils/styles";

const Small = styled("small", {
  margin: "10px 0 20px",
  color: Color.colorError,
  fontSize: 13,
  lineHeight: 1.5,
});

const InputCurrencyData = styled("input", {
  aall: "unset",
  color: `grey`,
  width: "100%",
  flex: "1",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "10px 20px",
  fontSize: 15,
  lineHeight: 1,
  boxShadow: `0 0 0 1px grey/ 25%`,
  border: `1px solid grey`,
  marginBottom: "6px",
  marginTop: "1px",
  height: "30px",

  "&:focus": {
    color: "#212529",
    boxShadow: `0 0 0 0.25rem rgb(13 110 253 / 25%)`,
    border: "1px solid #86b7fe",
  },
});

const FieldSet = styled("fieldset", {
  marginBottom: "10px",
});

export default function InputCurrency({
  name,
  prefix,
  intlConfig,
  onBlur,
  onChange,
  ...rest
}) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [currency, setCurrency] = useState(defaultValue);
  const [localError, setLocalError] = useState();

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "props.value",
      clearValue: (ref) => {
        ref.value = "";
      },
      setValue: (ref, newValue) => {
        ref.value =
          typeof newValue == "undefined" ? prefix + " 0,00" : newValue;
      },
      getValue: (ref) => {
        return ref.value;
      },
    });
  }, [inputRef.current, fieldName]);

  function handleCurrency(e) {
    let commaValue = "";
    let { value } = e.target;
    value = value.replace("R$", "");
    value = value.replace(" ", "");
    value = value.replaceAll(".", "");
    commaValue = value.split(",");

    let negative = "";
    if (commaValue[0] == "-" || commaValue[0] < 0) {
      negative = "-";
      commaValue[0] = commaValue[0].replaceAll("-", "");
    }

    commaValue[0] =
      !/^\d+$/.test(commaValue[0].substring(-1)) &&
      typeof commaValue[1] == "undefined"
        ? commaValue[0].substring(0, commaValue[0].length - 1)
        : commaValue[0];
    let x = commaValue[0];
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1.$2");
    value = x;

    if (typeof commaValue[1] != "undefined") {
      if (/^\d+$/.test(commaValue[1].substring(-1)) || commaValue[1] == "")
        value = x + "," + commaValue[1].substring(0, 2);
      else
        value = x + "," + commaValue[1].substring(0, commaValue[1].length - 1);
    }

    if (value != "")
      value =
        prefix +
        " " +
        negative +
        value.toLocaleString(intlConfig.locale, {
          style: "currency",
          currency: intlConfig.currency,
          currencyDisplay: "symbol",
        });

    return setCurrency(value);
  }

  function addDecimal(e) {
    let value = e.target.value;
 
    if (!value.includes(",") && value != "") {
      value += ",00";
    }
    if (value.length > 25) {
      setLocalError("Valor ultrapassa o máximo permitido");
      return setCurrency("0,00");
    } else {
      setLocalError();
      if (typeof onBlur === "function") {
        onBlur(e);
      }

      return setCurrency(value);
    }
  }

  function handleOnChange(e) {
    handleCurrency(e);
    if (typeof onChange === "function") {
      onChange(e);
    }
  }

  function handleBlur(e) {
    addDecimal(e);
    if (typeof onBlur === "function") {
      onBlur(e);
    }
  }
  return (
    <>
      <InputCurrencyData
        name={fieldName}
        value={currency}
        onChange={(e) => handleOnChange(e)}
        onBlur={(e) => handleBlur(e)}
        ref={inputRef}
        {...rest}
      />
      {(error || localError) && (
        <Small className="text-danger">{error || localError}</Small>
      )}
    </>
  );
}
