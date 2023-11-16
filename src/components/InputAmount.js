import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

class AmountInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }



  render() {
    const { value, onChange} = this.props;
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <div className="input-group mb-3">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Amount"
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AmountInput;
