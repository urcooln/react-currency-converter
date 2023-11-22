import React from 'react';
import { checkStatus, json } from '../utils';
import  CalculatorGraph from './calcChart'


class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calculated: {},
      amount: '',
      selectedCurrency: '',
      selectedCurrency2: '',
      fetchStatus: 'idle', // Possible values: 'idle', 'loading', 'success', 'error'
    };
  }



  componentDidUpdate(prevProps) {
    const { amount, selectedCurrency, selectedCurrency2 } = this.props;

    // Check if props have changed (amount or selectedCurrency)
    if (
      amount !== prevProps.amount ||
      selectedCurrency !== prevProps.selectedCurrency ||
      selectedCurrency2 !== prevProps.selectedCurrency2
    ) {
      this.componentDidMount();
    }
  }
  componentDidMount(){
    this.handleFetch();
  }

  handleFetch(){
    const { amount, selectedCurrency, selectedCurrency2 } = this.props;
    if(!amount || !selectedCurrency || !selectedCurrency2){
        console.warn('Input values are empty. Skipping fetch request');
        return;
    }
    this.fetchData();
  }

  fetchData() {
    const { amount, selectedCurrency, selectedCurrency2 } = this.props;
    const host = 'api.frankfurter.app';

    // Set fetchStatus to 'loading' when starting the fetch
    this.setState({ fetchStatus: 'loading' });

    fetch(`https://${host}/latest?amount=${amount}&from=${selectedCurrency}&to=${selectedCurrency2}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        console.log('API Response:', data);
        if (data && data.rates) {
          this.setState({ calculated: data.rates, fetchStatus: 'success' });
        } else {
          console.error('Invalid API response:', data);
          this.setState({ fetchStatus: 'error' });
        }
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error);
        this.setState({ fetchStatus: 'error' });
      });
  }

  render() {
    const { calculated, fetchStatus } = this.state;
    const { selectedCurrency, selectedCurrency2} = this.props;

    // Render content only if fetch is successful
    if (fetchStatus === 'success') {
      return (
        <div className="container mt-4">
          <div className="card">
            <div className="card-body text-center">
              <h2 className="card-title">Calculated Rates</h2>
              <p>
                Exchange Rates from {selectedCurrency} to {selectedCurrency2}:
              </p>
              <ul className="list-group">
                {Object.entries(calculated).map(([currency, rate]) => (
                  <li key={currency} className="list-group-item fs-1">
                    {currency}: {rate}
                  </li>
                ))}
                <li className='list-group-item'><CalculatorGraph selectedCurrency={selectedCurrency} selectedCurrency2={selectedCurrency2}/></li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // Render loading state while fetching
    if (fetchStatus === 'loading') {
      return null;
    }

    // Render error state if fetch fails
    if (fetchStatus === 'error') {
      return null;
    }

    // Default state when no fetch has been made
    return null;
  }
}

export default Calculator;
