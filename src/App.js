import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import NotFound from './components/NotFound/NotFound';
import Contact from './components/Contact/Contact';
import ProductDetails from './components/ProductDetails/ProductDetails';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Header></Header>

      <Switch>
        <Route exact path="/">
          <Shop/>
        </Route>
        <Route path="/shop">
          <Shop/>
        </Route>
        <Route path="/review">
          <Review/>
        </Route>
        <Route path="/contact">
          <Contact/>
        </Route>
        <Route path="/product/:productKey">
          <ProductDetails/>
        </Route>
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
