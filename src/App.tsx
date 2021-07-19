import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import SearchResult from "./pages/SearchResult";

import { CartProvider } from "./contexts/CartContext";
import { PokemonInfoModalProvider } from "./contexts/PokemonInfoModalContext";

import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <CartProvider>
          <PokemonInfoModalProvider>
            <Header />
            <Gap />
            <Route path="/" exact component={Home} />
            <Route path="/checkout/cart" exact component={Checkout} />
            <Route
              path="/search/result/:pokemon"
              exact
              component={() => <SearchResult key={window.location.pathname} />}
            />
          </PokemonInfoModalProvider>
        </CartProvider>
      </Switch>
    </BrowserRouter>
  );
}
const Gap = styled.div`
  width: 100%;
  height: 6.4rem;
`;

export default App;
