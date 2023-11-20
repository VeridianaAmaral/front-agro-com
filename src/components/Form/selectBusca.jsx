import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { useField } from "@unform/core";
import { styled } from "@stitches/react";
import { Color } from "../../Utils/styles";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: '30px', 
    height: '30px',
    maxHeight: '30px',
  }),
};

const Small = styled("small", {
  margin: "10px 0 20px",
  color: Color.colorError,
  fontSize: 13,
  lineHeight: 1.5,
});

export default function SelectBusca({
  name,
  valueDefault,
  options,
  disabled,
  ...rest
}) {
  const inputRef = useRef(null);
  const selectRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [value, setValue] = useState(() => {
    return defaultValue || "";
  });
  const [values, setValues] = useState(defaultValue || "Selecione...");
  let newOptions = options;
  useEffect(() => {
    try {
      if (options != undefined) {
        newOptions.unshift({
          value: "-987654321",
          label: "Selecione uma opção",
        });
        newOptions = newOptions.map((item, index) => {
          const regex = /^\d+\s*-\s*(.+)/;
          const match =
            item.label != undefined ? item.label.match(regex) : item.label;
          if (match) {
            return { value: item.value, label: match[1] };
          } else {
            return { value: item.value, label: item.label };
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [options]);

  const handleChange = (x) => {
    const optionsFiltro = newOptions.filter((option, index) => {
      if (option.value == x) {
        setValues(option.label);
        setValue(option.value);
      } else {
        return false;
      }
    });
  };

  const onChangeSelect = (option) => {
    setValues(option.label);
    setValue(option.value);
  };

  useEffect(() => {
    if (value !== "") {
      handleChange(value);
    }
    registerField({
      //value: valueData,
      name: fieldName,
      ref: inputRef,
      refS: selectRef,
      disabled: disabled,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [fieldName, registerField, value]);

  return (
    <div className="App" style={{ marginBottom: "20px", maxHeight: "30px", borderRadius:"30px"}}>
      <input
        disabled={disabled}
        ref={inputRef}
        value={value}
        id={fieldName}
        {...rest}
        type="hidden"
        styles={{ height: "30px", borderRadius:"30px" }}
      />

      <Select
        styles={customStyles}
        id={fieldName}
        ref={selectRef}
        //classNamePrefix="react-select"
        options={newOptions}
        onChange={onChangeSelect}
        placeholder={values}
        isDisabled={disabled}
        {...rest}
      ></Select>
      {error && <Small>{error}</Small>}
    </div>
  );
}
