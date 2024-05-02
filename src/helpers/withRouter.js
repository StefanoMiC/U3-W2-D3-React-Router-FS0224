// withRouter è una funzione che prende in input un Componente React verosimilmente a Classe (altrimenti non staremmo usando questo metodo...).
// ritorna a sua volta un'altra funzione, che sarà chiamata in automatico da React stesso nel fare l'export del componente,
// dentro questa seconda funzione, abbiamo la possibilità (in quanto funzione) di estrarre dagli hooks i valori di location, navigate e params.
// le varibili create in questo modo potranno essere passate come props al componente a classe originario, arricchendolo di queste funzionalità.
// oltre a ciò riusciamo a mantenere qualsiasi prop precedentemente esistente sul componente grazie allo spread delle props che arrivano dal parametro
// quindi il componente si troverà tutte le sue props classiche (se presenti), più quelle aggiuntive del router!

import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = Component => {
  return props => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    // qui stiamo ritornando dal componente funzionale intermedio il nostro componente originario arricchito di props aggiuntive

    return <Component {...props} location={location} navigate={navigate} params={params} />;
  };
};

export default withRouter;
// withRouter è un HOC - Higher Order Component: un componente che aumenta le funzionalità di un componente figlio

// l'utilizzo sarà semplice: all'export del componente a classe si esporterà il componente facendolo passare prima in ingresso alla funzione withRouter
// quello che verrà effettivamente esportato sarà quindi non il componente semplice, ma il componente "arricchito" in precedenza delle props del router

// export default withRouter(Home) // export default <Component {...props} location={location} navigate={navigate} params={params} />
