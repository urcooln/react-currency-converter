import React from 'react';
import { Link } from 'react-router-dom';
import { json, checkStatus } from './utils';
import BaseCurrencyDropDownMenu from './components/BaseCurrency';
import AmountInput from './components/InputAmount';
import ExchangeRateTable from './components/RateTable';
import Calculator from './components/calculator';



class CurrencyCalculator extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            amount: '',
            selectedCurrency: '',
            selectedCurrency2: '',

        };
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
        this.handleCurrencyChange2 = this.handleCurrencyChange2.bind(this);
    }
    handleAmountChange = (value) => {
        this.setState({ amount: value });
    };

    handleCurrencyChange = (currency) => {
        this.setState({ selectedCurrency: currency });
    };

    handleCurrencyChange2 = (currency) => {
        this.setState({ selectedCurrency2: currency});
    }

    render() {

        const{ amount, selectedCurrency, selectedCurrency2 } = this.state;

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='card-title text-center'><h1>Currency Calculator</h1></div>
                                <div className='row align-items-baseline'>
                                    <div className='col-md-4'><BaseCurrencyDropDownMenu value={selectedCurrency} onChange={this.handleCurrencyChange}/></div>
                                    <div className='col-md-4'><BaseCurrencyDropDownMenu value={selectedCurrency2} onChange={this.handleCurrencyChange2}/></div>
                                    <div className='col-md-4'><AmountInput value={amount} onChange={this.handleAmountChange}/></div>
                                </div>
                                <div><Calculator amount={amount} selectedCurrency={selectedCurrency} selectedCurrency2={selectedCurrency2}/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )




    }
}

export default CurrencyCalculator;