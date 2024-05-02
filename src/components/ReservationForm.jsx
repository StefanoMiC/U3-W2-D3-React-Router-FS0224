import { Component, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

// proprietà che il server si aspetta di ricevere per ogni prenotazione inviata:

// name <-- string
// phone <-- string
// numberOfPeople <-- string/number
// smoking <-- boolean
// dateTime <-- date/string
// specialRequests <-- string

const ReservationForm = () => {
  // i nostri metodi custom andrebbero creati con arrow function per beneficiare del comportamento automatico di reperire il this dal contesto esterno
  // quindi in questo modo non avremo problemi a riferirci a this anche dentro ai nostri metodi.
  // l'alternativa è quella di fare il bind nel costruttore, cosa non più necessaria!

  // state = {
  // reservation: {
  //   name: "",
  //   phone: "",
  //   numberOfPeople: "1",
  //   smoking: false,
  //   dateTime: "",
  //   specialRequests: ""
  // },
  //   alert: false,
  //   alertMsg: "",
  //   errorMsg: ""
  // };

  const [reservation, setReservation] = useState({
    name: "",
    phone: "",
    numberOfPeople: "1",
    smoking: false,
    dateTime: "",
    specialRequests: ""
  });
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async e => {
    // in React è ancora più importante evitare il refresh della pagina!
    e.preventDefault();
    console.log("INVIO DEL FORM EFFETTUATO");

    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/reservation", {
        method: "POST",
        body: JSON.stringify(reservation),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        setReservation({
          name: "",
          phone: "",
          numberOfPeople: "1",
          smoking: false,
          dateTime: "",
          specialRequests: ""
        });
        setAlert(true);
        setAlertMsg("Prenotazione effettuata!");

        setTimeout(() => {
          setAlert(false);
          setAlertMsg("");
        }, 3000);
      } else {
        throw new Error("Problemi nell'invio dei dati");
      }
    } catch (error) {
      console.log(error);
      setAlert(true);
      setErrorMsg(error.message);
    }
  };

  const handleFieldChange = (propertyName, propertyValue) => {
    setReservation({ ...reservation, [propertyName]: propertyValue });
  };

  return (
    <Container>
      <h2 className="display-5 text-center mt-4">Prenota un tavolo da noi</h2>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Alert
            variant={errorMsg ? "danger" : alertMsg ? "success" : "info"}
            show={alert}
            onClose={() => setAlert(false)}
            dismissible
          >
            {/* {errorMsg ? errorMsg : alertMsg ? alertMsg : "Avviso"} */}
            {/* {errorMsg && errorMsg}
              {alertMsg && alertMsg} */}

            {errorMsg || alertMsg}
          </Alert>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="FormName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci nome prenotazioni"
                value={reservation.name}
                onChange={
                  // e => this.setState({ reservation: { ...reservation, name: e.target.value } })
                  e => handleFieldChange("name", e.target.value)
                }
                required
              />
              {reservation.name && reservation.name.toLocaleLowerCase().includes("astolfo") && (
                <Form.Text className="text-danger">Ma che brutto nome! Metti quello di un tuo amico...</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="FormPhone">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                placeholder="+393*****"
                value={reservation.phone}
                onChange={e => handleFieldChange("phone", e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="FormNumOfPeople">
              <Form.Label>Numero di coperti</Form.Label>
              <Form.Select
                aria-label="Number of seats"
                value={reservation.numberOfPeople}
                onChange={e => handleFieldChange("numberOfPeople", e.target.value)}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="FormDate">
              <Form.Label>Data e ora</Form.Label>
              <Form.Control
                type="datetime-local"
                onChange={e => handleFieldChange("dateTime", e.target.value)}
                value={reservation.dateTime}
                min={new Date().toISOString().split(".")[0].slice(0, -3)}
                max="2024-08-13T19:59"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="FormSpecialReq">
              <Form.Label>Richieste particolari</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Facci sapere se hai esigenze particolari"
                onChange={e => handleFieldChange("specialRequests", e.target.value)}
                value={reservation.specialRequests}
              />
            </Form.Group>
            <Form.Group controlId="FormSmoking">
              <Form.Check
                type="checkbox"
                label="Fumatori"
                onChange={e => handleFieldChange("smoking", e.target.checked)}
                checked={reservation.smoking}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="d-block mx-auto mt-4">
              Invia Prenotazione
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ReservationForm;
