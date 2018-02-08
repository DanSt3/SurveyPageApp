import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import update from "immutability-helper";

import '../../css/ShowSurveyOffer.css';


export default class ShowSurveyOffer extends Component {

    constructor() {
		super();
		this.state = {
		};
    }
    

	render() {
		var display = <div className="no-offer">No survey available</div>;
		if (this.props.hasOffer) {
			display = (
				<div className="offer-display">
					<div><span className="offer-header">Congratulations!</span> There's a survey for you to take!</div>
					<div>This survey's is reward is from {this.props.offerMin} to {this.props.offerMax} {this.props.offerCurrency}</div>
					<div>
						<a href={this.props.offerUrl} target="_blank">Click Here</a>
						<span> to take the survey</span>
					</div>
				</div>
			);
		}

		return (
			<div className="show-survey-offer">
				{display}
			</div>
		)
	}

};


ShowSurveyOffer.propTypes = {
	hasOffer: PropTypes.bool.isRequired,
	offerUrl: PropTypes.string,
	offerMin: PropTypes.number,
	offerMax: PropTypes.number,
	offerCurrency: PropTypes.string
}