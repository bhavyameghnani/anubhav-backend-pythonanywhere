import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from './Header';
import Footer from './Footer';

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {chartData: {labels : ['Community Welfare', 'Arts & Culture', 'Health & Fitness', 'Green Initiative', 'Mental Wellness'],
      datasets: [
        {
          label: '# of Activities',
          data: [12, 19, 3, 5, 2],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }
}
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'bottom',
    location:'City'
  }

  render(){
    return (

      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Anubhav" />
      <div className="chart">
       
     
        <Pie
          data={this.state.chartData}

          options={{
            title:{
              display:this.props.displayTitle,
              text:'Analytics Dashboard',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            },
            maintainAspectRatio: false
          }}
       
          width={500}
          height={500}
        />
      </div>

      </Container>
      <Footer title="" description="Something here to give world a purpose!" />
    </React.Fragment>
    )
  }
}

export default Chart;