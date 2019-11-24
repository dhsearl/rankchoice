import React from 'react'
import moment from 'moment'
// import './Countdown.css'
class Countdown extends React.Component {
	state = {
        start: undefined,
		minutes: undefined,
        seconds: undefined,
	}
	
	componentDidMount() {

        this.interval = setInterval(() => {
			const then = moment(this.props.time);
            const now = moment().subtract(2, 'minutes');
            const countdown = moment(then - now);
			const minutes = countdown.format('mm');
            const seconds = countdown.format('ss');
          	this.setState({minutes, seconds });
		}, 1000);
    }

	componentWillUnmount() {
		if(this.interval) {
			clearInterval(this.interval);
		}
	}
	
	render() {
		const {minutes, seconds } = this.state;
		const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
		const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

		if(!seconds) {
			return null;
		}
		
		return (
			<div>
            
				{this.state.minutes <2 ?
				<div className='countdown-wrapper'>
					
					{minutes && (
						<div className='countdown-item'>
							<SVGCircle radius={minutesRadius} />
							{minutes} 
							<span>minutes</span>
						</div>
					)}
					{seconds && (
						<div className='countdown-item'>
							<SVGCircle radius={secondsRadius} />
							{seconds} 
							<span>seconds</span>
						</div>
					)}
				</div>
                : 
                <h1>Poll Over</h1>}
			</div>
		);
	}
}

const SVGCircle = ({ radius }) => (
	<svg className='countdown-svg'>
		<path fill="none" stroke="#333" strokeWidth="4" d={describeArc(50, 50, 48, 0, radius)}/>
	</svg>
);



// From stackoverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

// Stackoverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(number, in_min, in_max, out_min, out_max) {
  return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export default Countdown;