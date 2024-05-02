import { Alert, Badge, ListGroup } from "react-bootstrap";

const DishComments = ({ selectedPasta, className, style }) => (
  <div className={className} style={style}>
    {/* il blocco sottostante prevede un'espressione ternaria che ci permette di gestire l'interfaccia nel visualizzare 
                un messaggio alternativo quando lo stato fosse ancora falsy (per esempio al primo avvio del componente) */}
    {selectedPasta ? (
      <h4>Recensioni per {selectedPasta.name}: </h4>
    ) : (
      <Alert variant="info">Quando il carosello si attiverà vedrai le recensioni</Alert>
    )}

    <ListGroup>
      {/* Quando abbiamo a che fare con valori di stato è buona prassi controllare la loro esistenza
                        specialmente per il primo render iniziale, nel quale lo stato potrebbe non essere ancora presente
                        
                        Grazie a questo ternario, nel caso in cui lo stato sia vuoto inizialmente non si genererà un errore,
                        ma ci sarà il fallback sul caso else del ternario stesso, generando un elemento alternativo ed
                        evitando così errori che potrebbero nascere dalla lettura di null.comments ad esempio
                        */}
      {/* corto circuito (short circuit) è un espressione che serve a prevenire errori al primo avvio di un componente quando il dato manca */}
      {/* questo previene la lettura della linea successiva, che però verrà sbloccata nel momento in cui lo stato cambierà da valore falsy a oggetto effettivo */}
      {selectedPasta &&
        selectedPasta.comments.map((review, i) => {
          return (
            <ListGroup.Item key={`comment-${review.id}`} className="d-flex justify-content-between align-items-center">
              <span>
                {review.author} — {review.comment}
              </span>
              <Badge bg={review.rating > 3 ? "success" : "danger"} pill>
                {review.rating}
              </Badge>
            </ListGroup.Item>
          );
        })}
    </ListGroup>
  </div>
);

export default DishComments;
