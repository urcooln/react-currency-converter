import React from 'react';
import { checkStatus, json } from '../utils';
import Chart from 'chart.js/auto';

class CalculatorGraph extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.state = {
      selectedCurrency: '',
      selectedCurrency2: '',
    };
  }

  componentDidMount() {
    // Fetch historical rates when the component mounts
    this.getHistoricalRates();
  }

  getHistoricalRates = () => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    const { selectedCurrency, selectedCurrency2 } = this.props;
    fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${selectedCurrency}&to=${selectedCurrency2}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map(rate => rate[selectedCurrency2]);
        const chartLabel = `${selectedCurrency}/${selectedCurrency2}`;
        this.buildChart(chartLabels, chartData, chartLabel);
      })
      .catch(error => console.error(error.message));
  }

  buildChart = (labels, data, label) => {
    const chartRef = this.chartRef.current.getContext("2d");
    if (typeof this.chart !== "undefined") {
      this.chart.destroy();
    }
    this.chart = new Chart(this.chartRef.current.getContext("2d"), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
          }
        ]
      },
      options: {
        responsive: true,
      }
    })
  }

  render() {
    return (
      <div>
        <canvas ref={this.chartRef} className='img-fluid'></canvas>
      </div>
    );
  }
}

export default CalculatorGraph;
