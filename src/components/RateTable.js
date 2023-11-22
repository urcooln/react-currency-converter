import React from 'react';
import { checkStatus,json } from '../utils';

class ExchangeRateTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            exchangeRates: {},
            amount: '',
            selectedCurrency: '',
        }
    }

    componentDidUpdate(prevProps) {
        // Check if props have changed (amount or selectedCurrency)
        if (this.props.amount !== prevProps.amount || this.props.selectedCurrency !== prevProps.selectedCurrency) {
          this.componentDidMount();
        }
      }

    componentDidMount(){
        this.handleFetch();
    }

    handleFetch() {
        const { amount, selectedCurrency} = this.props;

        if(!amount || !selectedCurrency){
            console.warn('Input values are empty. Skipping fetch request.');
            return;
        }
        this.fetchData();
    }

    fetchData(){
        const { amount, selectedCurrency} = this.props;

        fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${selectedCurrency}`)
            .then(checkStatus)
            .then(json)
            .then((data) => {
                console.log('API Response:', data); // Log the API response for debugging
                if (data && data.rates) {
                    this.setState({ exchangeRates: data.rates });
                } else {
                    console.error('Invalid API response:', data);
                }
            })
            .catch((error) => {
                console.error('Error fetching data from API:', error);
            });
    }
    

    render() {
        const { exchangeRates } = this.state;
  return (
<div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Currency</th>
              <th>Exchange Rate</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(exchangeRates).map((currency) => (
              <tr key={currency}>
                <td>{currency}</td>
                <td>{exchangeRates[currency]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>  
        );
}
}


export default ExchangeRateTable;
