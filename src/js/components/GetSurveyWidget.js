import React, { Component } from "react";
import ReactDOM from "react-dom";
import update from "immutability-helper";
import jsonp from "jsonp";

import '../../css/GetSurveyWidget.css';


export default class GetSurveyWidget extends Component {

    constructor() {
		super();
		this.state = {
		};
		this._getSurveyOffer = this._getSurveyOffer.bind(this);
	}


	_handleOfferError(error) {
	}


	_processSurveyOffer(offer) {
	}


	_getSurveyOffer() {
		jsonp('https://www.tapresearch.com/supply_api/surveys/offer?api_token=9a7fb35fb5e0daa7dadfaccd41bb7ad1&user_identifier=tapresearch', 
			{}, (error,offer) => {
				console.log(`_getSurveyOffer: ` + 
							`error = ${JSON.stringify(error)}, ` +
							`response = ${JSON.stringify(offer)}`);
				if (error) {
					this._handleOfferError(error);
				} else {
					this._processSurveyOffer(offer)
				}
			});
	}


	render() {
		return (
			<div className="get-survey-widget">
				Enter Survey Offer Code: 
				<input/>
				<button onClick={this._getSurveyOffer}>Get Survey</button>
			</div>
		)
	}

};


GetSurveyWidget.propTypes = {
//	ratings: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
//	reviews: React.PropTypes.number.isRequired
}