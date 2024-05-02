import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NotFound = props => {
  const navigate = useNavigate();
  // dentro navigate troviamo una FUNZIONE!

  // l'hook useNavigate, una volta chiamato, produce una funzione. che sarà poi quella che possiamo effettivamente andare ad utilizzare
  return (
    <div className="text-center mt-5">
      <h1 className="display-3 text-primary">404 — Risorsa non trovata!</h1>
      <p className="lead">
        L'informazione che stavi cercando non è disponibile. <Link to="/">Torna alla home</Link>
      </p>

      <Button
        onClick={() => {
          navigate("/prenotazioni");
        }}
      >
        Vai alle prenotazioni
      </Button>

      <Link to="/" className="btn btn-primary">
        Torna alla home
      </Link>
    </div>
  );
};

export default NotFound;
