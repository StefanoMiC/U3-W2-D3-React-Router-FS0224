// QUESTO E' FONDAMENTALE altrimenti ogni componente react-bootstrap utilizzato non si visualizzerà correttamente!
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNavbar from "./components/MyNavbar";
import Home from "./components/Home";
import ReservationForm from "./components/ReservationForm";
import ReservationList from "./components/ReservationList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import Menu from "./components/Menu";
import PastaDetails from "./components/PastaDetails";
import ClassComponent from "./components/ClassComponent";

// ROUTING IN REACT
// per fare in modo di poter avere un cambio di pagina in una SPA (Single Page Application) mi dovrò avvalere di un sistema che mi renderizzi
// in maniera condizionale a partire da un indirizzo URL

// per questo motivo abbiamo implementato il pacchetto react-router-dom che ci aiuterà a gestire le dinamiche di un cambio pagina "virtuale"
// a partire dai segmenti presenti nella URL

// a questo punto avremo importato i 3 componenti fondamentali di questo pacchetto BrowserRouter, Routes, Route.

// BrowserRouter permette agli altri due di funzionare: lo inseriamo come cornice di TUTTO il contenuto di App.jsx
// Routes serve a contenere le singole Route. Routes può esistere solamente DENTRO alla sua cornice BrowserRouter
// con Routes delimiteremo solamente il contenuto che vogliamo rendere DINAMICO (visibile condizionalmente), quello che cambierà a seconda dell'indirizzo URL
// Route è un componente che può esistere solo dentro un componente Routes. Un blocco Routes DEVE contenere SOLO delle Route.

// Un componente React è una funzione che ritorna del JSX, deve ritornare un singolo elemento.
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* MyNavbar non ha bisogno di essere renderizzato in base ad uno specifico path, MA internamente si collega alla location del router,
      quindi dovrà stare necessariamente all'interno del componente BrowserRouter, per permettere al hook di collegarsi ad esso. */}
        <MyNavbar brandName="EpicStaurant" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prenotazioni" element={<ReservationList />} />
          <Route path="/prenota-tavolo" element={<ReservationForm />} />
          <Route path="/menu" element={<Menu />} />
          {/* nel caso di questa rotta i : servono ad indicare che per attivare il componente PastaDetails ci dovrà essere un indirizzo composto da 3 elementi
            1) /menu
            2) /dettagli esattamente scritti così
            3) un valore dinamico che può essere un qualsiasi valore, purché ci sia!

          */}
          <Route path="/menu/dettagli/:dynamicId" element={<PastaDetails />} />
          <Route path="/class-component/:classParam" element={<ClassComponent className="border border-danger" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// e dovrà necessariamente essere esportato per essere visibile e utilizzato all'esterno (vedi index.js)
export default App;
