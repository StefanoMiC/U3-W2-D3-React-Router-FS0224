import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import menu from "../data/menu.json";
import { Link } from "react-router-dom";

const Menu = () => (
  <Container>
    {menu.map(dish => (
      <Row className="justify-content-center mb-2" key={`dish-${dish.id}`}>
        <Col xs={12} md={8} lg={4}>
          <Card>
            <Card.Img variant="top" src={dish.image} />
            <Card.Body>
              <Card.Title>{dish.name}</Card.Title>
              <Card.Text>
                <p>{dish.description}</p>
                <Badge bg="info">{dish.price}</Badge>
              </Card.Text>
              <Link to={`/menu/dettagli/${dish.id}`} className="btn btn-dark d-block w-100">
                Vai al dettaglio
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    ))}
    ;
  </Container>
);

export default Menu;
