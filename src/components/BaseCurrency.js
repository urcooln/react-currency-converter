import React from 'react';
import { checkStatus, json } from '../utils';

class BaseCurrencyDropDownMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencyKeys: []
        };
    }

    componentDidMount() {
        fetch(`https://api.frankfurter.app/latest?from=USD`)
            .then(checkStatus)
            .then(json)
            .then((data) => {
                console.log('API Response:', data); // Log the API response for debugging
                if (data && data.rates) {
                    const keys = Object.keys(data.rates);
                    keys.unshift('USD');
                    keys.unshift('Select a Currency')
                    this.setState({ currencyKeys: keys });
                } else {
                    console.error('Invalid API response:', data);
                }
            })
            .catch((error) => {
                console.error('Error fetching data from API:', error);
            });
    }

    render() {
        const { selectedCurrency, onChange } = this.props;
        const { currencyKeys } = this.state;

        return (
            <div>
                <select className='form-select form-select-sm mb-3' value={selectedCurrency} onChange={(e) => onChange(e.target.value)}>
                    {currencyKeys.map((key) => (
                        <option key={key} value={key}>
                            {key}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

export default BaseCurrencyDropDownMenu;
