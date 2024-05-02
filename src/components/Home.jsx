import { useState } from "react";
import { Alert, Badge, Carousel, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import menu from "../data/menu.json";
import DishComments from "./DishComments";

const Home = props => {
  // state = {
  //   stefano: true,
  //   selectedPasta: menu[0]
  // };

  const [selectedPasta, setSelectedPasta] = useState(menu[0]);

  return (
    <Container className={props.className}>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8} lg={6}>
          {/* onSlide è un metodo regalatoci da react-bootstrap, 
            il suo funzionamento è particolare e prevede di passarci l'indice della nuova slide appena cambiata come parametro della nostra funzione
            possiamo quindi mettere insieme l'indice della posizione della slide visualizzata con la posizione nell'array menu, 
            trovando quindi l'oggetto del nuovo elemento visualizzato a schermo. 

            A quel punto lo possiamo salvare nello State andando ad attivare l'aggiornamento della porzione di interfaccia collegata allo State!*/}
          <Carousel onSlide={slideIndex => setSelectedPasta(menu[slideIndex])}>
            {/* per usare il map all'interno del JSX abbiamo bisogno di creare un'area di contenuto dinamico per 
            andare a risolvere l'espressione direttamente sul posto, quindi risolvere il map, 
            che si lascerà dietro di sé un array di elementi React che verranno renderizzati nella pagina.
            
            Per un corretto uso del map, avremo bisogno di applicare SEMPRE una prop key sul primo elemento ritornato dal map,
            per evitare che React ricrei l'intera lista nel caso in cui uno degli elementi debba cambiare nel tempo.
            */}
            {menu.map(dish => {
              return (
                <Carousel.Item
                  key={`dish-${dish.id}`}
                  // onClick={e => {
                  //   console.log("CLICK AVVENUTO");
                  //  setSelectedPasta(dish);
                  // }}
                >
                  <Image src={dish.image} className="w-100" />
                  <Carousel.Caption>
                    <h3>{dish.name}</h3>
                    <p>
                      {dish.description} <Badge bg="dark">{dish.price}€</Badge>
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={8} lg={6}>
          <DishComments selectedPasta={selectedPasta} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
