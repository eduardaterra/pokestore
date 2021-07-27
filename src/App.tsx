import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import SearchResult from "./pages/SearchResult";

import { CartProvider } from "./contexts/CartContext";
import { PokemonInfoModalProvider } from "./contexts/PokemonInfoModalContext";
import { FiltersModalProvider } from "./contexts/FiltersModalContext";

import Header from "./components/Header";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <FiltersModalProvider>
        <CartProvider>
          <PokemonInfoModalProvider>
            <Header />
            <Gap />
            <Switch>
              <Route
                path="/"
                exact
                component={() => <Home key={window.location.search} />}
              />
              <Route
                path="/search/:pokemon"
                exact
                component={() => (
                  <SearchResult
                    key={window.location.search || window.location.pathname}
                  />
                )}
              />
              <Route path="/checkout/cart" exact component={Checkout} />
              <Route component={NotFound} />
            </Switch>
          </PokemonInfoModalProvider>
        </CartProvider>
      </FiltersModalProvider>
    </BrowserRouter>
  );
}
const Gap = styled.div`
  width: 100%;
  height: 6.4rem;
`;

export default App;
