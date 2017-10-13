import React, { Component } from 'react';

/*
The ListenToScrollComponent (called LTSComponent) is a component which should change
based on scroll events.

It is used in the Home component as the NavigationBar, when the user scroll, the
NavigationBar's style change, allowing it's background to fade from transparent to
white.
*/
class LTSComponent extends Component {
	constructor(props) {
		super(props);
		/*
		The 'render' props tells the component if it should render (Thanks Sherlock).
		If the variables is not defined then the default value is true.
		If the props change over time, we will handle the change in the
		componentWillReceiveProps method, this is important, if we don't handle this
		situation the brower will still listen to scroll-based events, impacting performances.

		The triggerWhenAbove is the value to which the onTrigger property is fired (in px).
		*/
		const { triggerWhenAbove } = this.props;
		const isFixed = this.props.isFixed === false ? false : true;
		let render = this.props.render === false ? false : true;
		if (!triggerWhenAbove) {
			render = false;
		}
		this.state = {
			render,
			triggerWhenAbove,
			isFixed,
			lastTrigger: null
		}
	}

	componentWillMount() {
		if (!this.state.render || !this.props.onTrigger) {
			return null;
		}
		if (!this.props.children) {
			console.warn("[LTSComponent] Children must be valid React elements !");
			return null;
		}
		if (window.scrollY >= this.state.triggerWhenAbove
			&& (!this.state.lastTrigger || this.state.lastTrigger === 'above')) {
			this.onTrigger('below');
		} else if (window.scrollY < this.state.triggerWhenAbove
			&& (!this.state.lastTrigger || this.state.lastTrigger === 'below')) {
			this.onTrigger('above');
		}
		this.addEventListener();
		return null;
	}

	componentWillReceiveProps(newProps) {
		if (newProps.render !== undefined && newProps.render !== this.state.render) {
			const { render } = newProps;
			this.setState({ render });
			if (!render) {
				this.removeEventListener();
			} else if (this.props.children) {
				this.addEventListener();
			}
		}
		if (newProps.triggerWhenAbove !== this.state.triggerWhenAbove) {
			this.setState({ triggerWhenAbove: newProps.triggerWhenAbove });
		}
	}

	componentWillUnmount() {
		this.removeEventListener();
	}

	onTrigger = (position) => {
		this.props.onTrigger(position);
		this.setState({ lastTrigger: position });
	}

	addEventListener = () => window.addEventListener('scroll', this.listenToScroll);

	removeEventListener = () => window.removeEventListener('scroll', this.listenToScroll)

	listenToScroll = () => {
		if (window.scrollY >= this.state.triggerWhenAbove
			&& (!this.state.lastTrigger || this.state.lastTrigger === 'above')) {
			this.onTrigger('below');
		} else if (window.scrollY < this.state.triggerWhenAbove
			&& (!this.state.lastTrigger || this.state.lastTrigger === 'below')) {
			this.onTrigger('above');
		}
		return null;
	}

	render() {
		const { render } = this.state;
		const { children } = this.props;
		if (!render || !children) {
			return null;
		}
		return children;
	}
}

export default LTSComponent;
