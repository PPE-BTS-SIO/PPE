import React, { Component } from 'react';

class LTSComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			/*
			The 'render' props tells the component if it should render (Thanks Sherlock).
			If the variables is not defined then the default value is true.
			If the props change over time, we will handle the change in the
			componentWillReceiveProps method, this is important, if we don't handle this
			situation the brower will still listen to scroll-based events, impacting performances.
			*/
			render: this.props.render === false ? false : true;
		}
	}
}
