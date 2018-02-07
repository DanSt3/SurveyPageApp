import React, { Component } from "react";
import ReactDOM from "react-dom";
import update from "immutability-helper";

import GetSurveyWidget from "./components/GetSurveyWidget.jsx"

import '../css/main.css';

const appToken = "9a7fb35fb5e0daa7dadfaccd41bb7ad1";

class App extends Component {

	constructor() {
		super();
		this.state = {
		}
	}

	render() {
		return (
			<div className="main-container">
				<GetSurveyWidget appToken={appToken}/>
			</div>
		);
	}
};


ReactDOM.render(<App />, document.getElementById('main'));