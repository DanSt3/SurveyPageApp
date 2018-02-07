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
			errorMsg: "",
			surveyOffer: undefined
		};
		this._getSurveyOffer = this._getSurveyOffer.bind(this);
		this._handleUserIdChange = this._handleUserIdChange.bind(this);
	}


	_handleOfferError(error) {
		// check for timeout condition
		if (error && error.message && error.message === "Timeout") {
			this.setState(update(this.state, {errorMsg: {$set: "Survey offer request timed out"}}));			
		}
	}


	_processSurveyOffer(newOffer) {
		this.setState(update(this.state, {surveyOffer: {$set: newOffer}}));
	}


	_validateUserId(userId) {
		const MAX_USERID_LENGTH = 32;
		
		if (!userId || userId === "") {
			this.setState(update(this.state, {
				errorMsg: {$set: "You must enter a User ID code"},
				surveyOffer: {$set: undefined}
			}));
			return false;
		} else if (userId.length > MAX_USERID_LENGTH) {
			this.setState(update(this.state, {
				errorMsg: {$set: "The User ID must be 22 characters or less"},
				surveyOffer: {$set: undefined}
			}));
			return false;
		} else {
			// passed all validations
			// clear the previous survey offer, if any
			this.setState(update(this.state, {surveyOffer: {$set: undefined}}));
			return true;
		}
	}


	_getSurveyOffer() {
		const TIMEOUT_IN_MILLISECONDS = 60000;

		// if the entered User ID is valid
		if (this._validateUserId(this.state.userId)) {
			// get a new survey offer
			const url = `https://www.tapresearch.com/supply_api/surveys/offer?api_token=${this.props.appToken}&user_identifier=${this.state.userId}`
			jsonp(url, 
				{
					timeout: TIMEOUT_IN_MILLISECONDS
				}, (error,offer) => {
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
	}


	_handleUserIdChange(event) {
		// save entered User Id and clear any error messages that were being displayed
		this.setState(update(this.state, {
			userId: {$set: event.target.value},
			errorMsg: {$set: ""}
		}));
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
					<div>{this.state.errorMsg}</div>
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