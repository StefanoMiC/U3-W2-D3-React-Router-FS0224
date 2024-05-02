import { useEffect, useState } from "react";
import { Alert, Badge, Button, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";

const ReservationList = () => {
  // state = {
  //   // questa porzione di stato la useremo per raccogliere e salvare i dati in arrivo dal server (dopo la fetch)
  //   reservations: [],
  //   isLoading: false,
  //   isError: false
  // };

  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // i metodi custom DEVONO usare SEMPRE ARROW FUNCTIONS (per ereditare il this dell'istanza del nostro componente a classe)
  const fetchReservations = async () => {
    try {
      setIsLoading(true);

      console.log("fetch in corso...");
      const response = await fetch("https://striveschool-api.herokuapp.com/api/reservation");
      if (response.ok) {
        console.log("fetch conclusa");
        const reservations = await response.json();
        console.log(reservations);

        // questo è il momento in cui l'array si salva nello stato e scatterà immediatamente dopo un'altra chiamata di render()
        // che a questo punto nel suo JSX potrà mappare e generare nuovi elementi a partire dai nuovi dati trovati nello stato
        setReservations(reservations);
      } else {
        throw new Error("Errore nella richiesta delle prenotazioni al server");
      }
      // qui abbiamo ricevuto i dati sotto forma di array, ci basterà sostituire lo stato con array vuoto con questo nuovo array
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteReservation = async resId => {
    try {
      const resp = await fetch("https://striveschool-api.herokuapp.com/api/reservation/" + resId, { method: "DELETE" });

      if (resp.ok) {
        // chiameremo di nuovo la funzione che chiederà al server l'array aggiornato, salvandolo di conseguenza come nuovo state.reservations
        fetchReservations();
        const deletedObj = await resp.json();
        alert("eliminato con successo l'appuntamento di: " + deletedObj.name);
      } else {
        throw new Error("Errore nell'eliminazione");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // chiamiamo il fetch dei dati solamente all'avvio del componente
  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <Container>
      <div className="text-center">
        <h2 className="display-5 d-inline-block text-center mt-4">Queste le prenotazioni per oggi</h2>
        {/* in questi casi ci basta il cortocircuito && perché non ci serve di visualizzare qualcos'altro al suo posto,
                semplicemente non deve renderizzarsi nella pagina quando lo state isLoading o isErrore sono false */}
        {isLoading && <Spinner animation="border" variant="primary" />}
      </div>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          {isError && <Alert variant="danger">Si è verificato un errore</Alert>}

          {/* questo controllo si preoccupa di visualizzare l'alert nell'unico caso che è quando 
             la fetch HA FINITO (spinner spento e nessun errore) e ha finito senza trovare dati nel server (array che rimane vuoto) */}
          {/*              true                 &&       (!false => true)  &&   (!true => false)*/}

          {reservations.length === 0 && !isLoading && !isError && <Alert variant="info">Nessuna prenotazione</Alert>}

          {/* questo si visualizza quando non siamo in caricamento, non si sono verificati errori, e abbiamo ricevuto almeno un dato nell'array */}
          {reservations.length > 0 && !isLoading && !isError && (
            <ListGroup>
              {reservations.map(reserv => {
                return (
                  <ListGroup.Item key={reserv._id} className="d-flex gap-2">
                    <span>{reserv.name}</span> per: <strong>{reserv.numberOfPeople}</strong>
                    {reserv.smoking && <span>🚬</span>}
                    <Badge bg="light" className="ms-auto text-dark">
                      {new Date(reserv.dateTime).toLocaleTimeString()}
                    </Badge>
                    <Button
                      variant="danger"
                      size="sm"
                      className="px-1 py-0"
                      onClick={() => deleteReservation(reserv._id)}
                    >
                      <i className="bi bi-trash3"></i>
                    </Button>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ReservationList;
