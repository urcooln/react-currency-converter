import React from 'react';
import { Link } from 'react-router-dom';
import { json, checkStatus } from './utils';
import BaseCurrencyDropDownMenu from './components/BaseCurrency';
import AmountInput from './components/InputAmount';
import ExchangeRateTable from './components/RateTable';



class CurrencyRates extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            amount: '',
            selectedCurrency: '',

        };
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    }
    handleAmountChange = (value) => {
        this.setState({ amount: value });
    };

    handleCurrencyChange = (currency) => {
        this.setState({ selectedCurrency: currency });
    };

    render() {

        const{ amount, selectedCurrency } = this.state;

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='card-title text-center'><h1>Current Currency Rates</h1></div>
                                <div className='row align-items-baseline'>
                                    <div className='card-text col-md-2'>Choose Base Currency:</div>

                                    <div className='col-4'><BaseCurrencyDropDownMenu value={selectedCurrency} onChange={this.handleCurrencyChange}/></div>
                                
                                    <div className='col-6'><AmountInput value={amount} onChange={this.handleAmountChange}/></div>
                                </div>
                                <div><ExchangeRateTable amount={amount} selectedCurrency={selectedCurrency}/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )




    }
}

export default CurrencyRates;