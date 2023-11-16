import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import CurrencyRates from './currencyrates';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import CurrencyCalculator from './currencycalculator';
import "bootstrap-icons/font/bootstrap-icons.css";




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
          <Router basename="/react-currency-converter">

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
           <Link className="navbar-brand ps-3 fs-3" to="/"><i class="bi bi-currency-exchange"></i> Currency Converter App</Link>
           <Link className="btn btn-outline-success me-2" to="/currency-calculator">Currency Calculator</Link>
          </nav>
          <br></br>

          <Switch>
            <Route path='/' exact component={CurrencyRates}/>
            <Route path='/currency-calculator' exact component={CurrencyCalculator}/>
          </Switch>

          </Router> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
