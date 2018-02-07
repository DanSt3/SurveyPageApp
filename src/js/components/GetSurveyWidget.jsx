import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import update from "immutability-helper";
import jsonp from "jsonp";

import ShowSurveyOffer from "./ShowSurveyOffer.jsx"

import '../../css/GetSurveyWidget.css';


export default class GetSurveyWidget extends Component {

    constructor() {
		super();
		this.state = {
			userId: "",
			surveyOffer: undefined
		};
		this._getSurveyOffer = this._getSurveyOffer.bind(this);
		this._handleUserIdChange = this._handleUserIdChange.bind(this);
	}


	_handleOfferError(error) {
	}


	_processSurveyOffer(newOffer) {
		this.setState(update(this.state, {surveyOffer: {$set: newOffer}}));
	}


	_getSurveyOffer() {
		// clear the previous survey offer, if any
		this.setState(update(this.state, {surveyOffer: {$set: undefined}}));

		// get a new survey offer
		const url = `https://www.tapresearch.com/supply_api/surveys/offer?api_token=${this.props.appToken}&user_identifier=${this.state.userId}`
		jsonp(url, 
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


	_handleUserIdChange(event) {
		this.setState(update(this.state, {userId: {$set: event.target.value}}));
	}


	render() {
		const offer = this.state.surveyOffer;
		const hasOffer = (offer && offer.has_offer);
		const offerUrl = (offer && offer.offer_url);
		const offerMin = (offer && offer.message_hash && offer.message_hash.min) ?
			parseFloat(offer.message_hash.min) : undefined;
		const offerMax = (offer && offer.message_hash && offer.message_hash.max) ?
			parseFloat(offer.message_hash.max) : undefined;
		const offerCurrency = (offer && offer.message_hash && offer.message_hash.currency);

		return (
			<div className="get-survey-widget">
				<label>
				Enter User ID Code: 
					<input type="text" value={this.state.userId} onChange={this._handleUserIdChange} />
					<button onClick={this._getSurveyOffer}>Get Survey</button>
					{(offer) ? 
						<ShowSurveyOffer hasOffer={hasOffer}
							offerUrl={offerUrl}
							offerMin={offerMin}
							offerMax={offerMax} 
							offerCurrency={offerCurrency}/>
						: null
					}
				</label>
			</div>
		)
	}

};


GetSurveyWidget.propTypes = {
	appToken: PropTypes.string.isRequired
}