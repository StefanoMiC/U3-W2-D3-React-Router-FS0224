// questa modalità di import potrebbe essere più leggera, importando il singolo pacchetto
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink, useLocation } from "react-router-dom";

// con questo approccio stiamo caricando l'intera libreria per poi usare singole parti di essa, il peso caricato risulta maggiore
// il vantaggio è la sintassi concisa
// import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap"

const MyNavbar = props => {
  // chiamare useLocation() ci ritorna un oggetto, che salviamo nella variabile
  // const location = useLocation();
  // console.log("location", location);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid="xl">
        <Navbar.Brand href="#home">{props.brandName}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* il componente Link di react-router-dom ci permetterà di fare un cambio pagina senza ricaricarla
          si aspetta una prop "to" che funge da href */}
            {/*
            <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>Home</Link>
            <Link
              to="/prenota-tavolo"
              className={`nav-link ${location.pathname === "/prenota-tavolo" ? "active" : ""}`}
            >
              Prenota
            </Link>
            <Link to="/prenotazioni" className={`nav-link ${location.pathname === "/prenotazioni" ? "active" : ""}`}>
              Lista Tavoli
            </Link> */}

            {/* questo nuovo approccio è equivalente (ma più conciso) a quello precedente e sfrutta un componente NavLink di react-router-dom già configurato 
            per applicare la classe active quando siamo sulla stessa pagina relativamente al suo link */}
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/menu" className="nav-link">
              Menu
            </NavLink>
            <NavLink to="/prenota-tavolo" className="nav-link">
              Prenota
            </NavLink>
            <NavLink to="/prenotazioni" className="nav-link">
              Lista Tavoli
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
