import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import { CartProvider } from "./contexts/CartContext";
import { PokemonInfoModalProvider } from "./contexts/PokemonInfoModalContext";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <CartProvider>
          <PokemonInfoModalProvider>
            <Route path="/" component={Home} />
          </PokemonInfoModalProvider>
        </CartProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
