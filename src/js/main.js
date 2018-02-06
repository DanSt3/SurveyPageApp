import React, { Component } from "react";
import ReactDOM from "react-dom";
import update from "immutability-helper";

import GetSurveyWidget from "./components/GetSurveyWidget.js"

import '../css/main.css';


class App extends Component {

	constructor() {
		super();
		this.state = {
		}
	}

	render() {
		return (
			<div className="main-container">
				<GetSurveyWidget/>
			</div>
		);
	}
};


ReactDOM.render(<App />, document.getElementById('main'));