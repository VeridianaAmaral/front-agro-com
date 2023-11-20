import React from "react";
import "./Bolinha.css"; // Este é o arquivo CSS que você precisa criar para estilizar os componentes
import { Color } from "../../Utils/styles";

const Circle = ({ number, page }) => (
  <div
    className={"circle"}
    style={{
      backgroundColor:
        page == number ? Color.colorGreenButton : Color.colorDisabled,
    }}
  >
    {number}
  </div>
);

const Line = () => <div className="line"></div>;

const Bolinhas = (props) => (
  <div className="container">
    <Circle number={1} page={props.page} />
    <Line />
    <Circle number={2} page={props.page} />
    <Line />
    <Circle number={3} page={props.page} />
  </div>
);

export default Bolinhas;
