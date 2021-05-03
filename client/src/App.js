import { useState } from "react";
import logo from "./logo.png";
import "./App.css";
// third party libraries
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
// custom components
import Character from "./components/Character";
import Characters from "./components/Characters";
import Locations from "./components/Locations";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});

function App() {

  const [tab, setTab] = useState('characters')

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <img src={logo} alt='Rick and Morty Logo' className="logo" />
          <button className="btn btn-link" onClick={()=> setTab('characters')}>Karakterler</button>
          <button className="btn btn-link" onClick={()=> setTab('locations')}>Konumlar</button>
          {
            tab === 'characters' ?
              <Route exact path ='/' component={Characters} /> :
              <Route exact path ='/' component={Locations} />
          }
          <Route exact path ='/character/:id' component={Character} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
