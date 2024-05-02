import { useEffect, useState } from "react";
import { Badge, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import menu from "../data/menu.json";
import DishComments from "./DishComments";

const PastaDetails = () => {
  const [pasta, setPasta] = useState(null);
  // useParams quando chiamato ci ritorna un oggetto con tutti i parametri, specificati sulle rotte in App.jsx,
  // che ritroviamo come chiavi/valore di questo oggetto
  const params = useParams();
  const navigate = useNavigate();
  console.log("ID dinamico", params.dynamicId);

  useEffect(() => {
    const pastaObj = menu.find(dish => dish.id.toString() === params.dynamicId);

    if (pastaObj) {
      setTimeout(() => {
        setPasta(pastaObj);
      }, 1000);
      console.log(pastaObj);
    } else {
      setTimeout(() => navigate("/not-found"), 500);
    }
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={10}>
          {pasta ? (
            <>
              <Image src={pasta.image} fluid />
              <h1>{pasta.name}</h1>
              <p>
                description Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente necessitatibus sit aperiam
                perferendis deleniti est similique minima nisi voluptates, laboriosam architecto commodi rem dolore
                consequuntur veniam. Eveniet quam nihil inventore?
              </p>
              <Badge bg="primary">27€</Badge>

              <DishComments className="mt-5" selectedPasta={pasta} />
            </>
          ) : (
            <Spinner variant="primary" animation="border" role="status" aria-hidden="true">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PastaDetails;
