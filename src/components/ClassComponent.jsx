import { Component } from "react";
import withRouter from "../helpers/withRouter";
import { Button } from "react-bootstrap";

class ClassComponent extends Component {
  render() {
    console.log("PROPS", this.props);
    return (
      <div>
        <p>Sono un componente a classe, il valore dinamico è {this.props.params.classParam}</p>
        <Button onClick={() => this.props.navigate("/menu")}>Vai al menu</Button>
      </div>
    );
  }
}

export default withRouter(ClassComponent);
