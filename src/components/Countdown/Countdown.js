import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import TimerTwo from './TimerTwo'

class Countdown extends React.Component {
    state = {
        start: undefined,
        minutes: undefined,
        seconds: undefined,
        countdownCopy: 510,
        POLL_LENGTH: 2,
    }
    componentDidMount() {
        
        this.interval = setInterval(() => {
            const then = moment(this.props.time);
            const last = moment().utc().subtract(this.state.POLL_LENGTH/2, 'minutes');
            const first = moment().utc().subtract(this.state.POLL_LENGTH, 'minutes');
            const countdown = moment(then - first);
            const countdownCopy = Number(moment(then - first).format('mmss'))
            let minutes = countdown.format('mm');
            let seconds = countdown.format('ss');
            this.setState({ minutes, seconds, countdownCopy });

            this.state.countdownCopy > 150  &&                                       // Change this
            !this.props.voteReducer.winner.idea_text  &&
            this.state.countdownCopy % 10 === 1 &&
            this.props.dispatch({
                type: 'FETCH_STATUS',
                payload: { url: this.props.route }
            })
            // console.log(moment().utc().diff(moment(this.props.time))/ 60000 )
            
            this.props.pollReducer.pollStatus.collection_period &&
                this.state.countdownCopy % 2 === 1 &&
                this.props.dispatch({
                    type: 'GET_SHALLOW_IDEA_LIST',
                    payload: { id: this.props.pollReducer.pollStatus.id }
                })

            this.state.countdownCopy <= 105 &&                                         // Change this
                this.state.countdownCopy >= 55 &&                                     // Change this     
                this.props.dispatch({
                    type: 'FETCH_STATUS',
                    payload: { url: this.props.route }
                })

            // this.props.pollReducer.pollStatus.voting_period === true
            this.state.countdownCopy === 59
                && this.props.voteReducer.voteNeedsToBeInit === true
                && this.props.dispatch({ type: "INIT_BALLOT", payload: this.props.ideaReducer.ideaList })

            this.state.countdownCopy <= 5
                && this.props.dispatch({
                    type: 'FETCH_STATUS',
                    payload: { url: this.props.route }
                })


            // this.props.pollReducer.pollStatus.complete === true
            //     && !this.props.voteReducer.winner.idea_text
            //     && this.props.dispatch({ type: 'CALC_WINNER', payload: this.props.pollReducer.pollStatus.id })

            // this.state.countdownCopy <= 2
            //     && !this.props.voteReducer.winner.idea_text &&
            //     this.props.dispatch({ type: 'CALC_WINNER', payload: this.props.pollReducer.pollStatus.id })

            this.props.pollReducer.pollStatus.complete === true
                && !this.props.voteReducer.winner.idea_text
                && this.props.dispatch({ type: 'GET_WINNER', payload: this.props.pollReducer.pollStatus.id })

            this.state.countdownCopy === 0
                && !this.props.voteReducer.winner.idea_text &&
                this.props.dispatch({ type: 'GET_WINNER', payload: this.props.pollReducer.pollStatus.id })

            this.props.voteReducer.winner.idea_text
                && this.props.pollReducer.pollStatus.complete === true
                && clearInterval(this.interval)

        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { minutes, seconds, countdownCopy } = this.state;
        const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
        const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

        if (!countdownCopy) {
            return null;
        }

        return (
            <div>
                {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
                {/* <TimerOne /> */}
                {/* {this.state.countdownCopy < 500 && <TimerTwo time={this.props.time}  /> } */}

                {this.state.minutes < this.state.POLL_LENGTH &&
                    <>
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
                    </>
                }
                {moment().utc().diff(moment(this.props.time))/ 60000 < this.state.POLL_LENGTH &&
                <div>
                    {this.state.countdownCopy >= 700 &&
                        <p>{minutes.slice(1)-5} minutes to suggest ideas, <br /> Then five minutes to vote</p>}
                    {this.state.countdownCopy < 700 && this.state.countdownCopy >= 600 &&
                        <p>{minutes.slice(1)-5} minute to suggest ideas, <br /> Then five minutes to vote</p>}
                    {this.state.countdownCopy < 600 && this.state.countdownCopy >= 500 &&
                        <p>Idea entering time is almost up<br /> Then 5 minutes to vote</p>}
                    {this.state.countdownCopy < 500 && this.state.countdownCopy >= 200 &&
                        <p>{minutes.slice(1)} minutes to vote</p>}
                    {this.state.countdownCopy < 200 && this.state.countdownCopy >= 100 &&
                        <p>{minutes.slice(1)} minute to vote</p>}
                    {this.state.countdownCopy < 100 &&
                        <p>Lock in your vote before time is up</p>}    
                </div>}
            </div>
        );
    }
}

const SVGCircle = ({ radius }) => (
    <svg className='countdown-svg'>
        <path fill="none" stroke="#E5E9F0" strokeWidth="4" d={describeArc(50, 50, 48, 0, radius)} />
    </svg>
);



// From stackoverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {

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
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default connect(mapReduxStateToProps)(Countdown);
// export default Countdown;