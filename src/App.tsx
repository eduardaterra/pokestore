import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import { CartProvider } from "./contexts/CartContext";
import { PokemonInfoModalProvider } from "./contexts/PokemonInfoModalContext";
import Checkout from "./pages/Checkout";

import Header from "./components/Header";
import styled from "styled-components";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <CartProvider>
          <PokemonInfoModalProvider>
            <Header />
            <Gap />
            <Route path="/" exact component={Home} />
            <Route path="/checkout/cart" component={Checkout} />
          </PokemonInfoModalProvider>
        </CartProvider>
      </Switch>
    </BrowserRouter>
  );
}
const Gap = styled.div`
  width: 100%;
  height: 8rem;
`;

export default App;
