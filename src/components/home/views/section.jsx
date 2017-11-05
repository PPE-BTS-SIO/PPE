import React, { Component } from 'react';

import '../../../styles/home/views/faq.css';

class Section extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openHidden: false
		}
	}

	componentWillMount = () => {
		const { visible } = this.props;
		if (!visible) {
			console.warn("[Section] Can't add a section with a null or undefined 'visible' prop!");
			return false;
		}
		return true;
	}

	setOpenHidden = open => this.setState({ openHidden: open });

	render() {
		const {
			options = {},
			style,
			visibleStyle,
			hiddenStyle,
			visibleContent,
			hiddenContent
		} = this.props;

		const visibleHeight = options.visibleHeight || 250;
		const hiddenHeight = options.hiddenHeight || 250;

		return (
			<div
				className="home-faq-section"
				style={style}
			>
				<Visible
					content={visibleContent}
					height={visibleHeight}
					style={visibleStyle}
					setOpenHidden={this.setOpenHidden}
					openHidden={this.state.openHidden}
				/>
				<Hidden
					content={hiddenContent}
					height={hiddenHeight}
					style={hiddenStyle}
					open={this.state.openHidden}
					setOpenHidden={this.setOpenHidden}
				/>
			</div>
		);
	}
}

const Visible = ({
	content,
	height,
	style = {},
	setOpenHidden,
	openHidden
}) => {
	if (!content || !height || !setOpenHidden) {
		return null;
	}
	const newStyle = Object.assign({}, style, { height })
	return (
		<div
			className="home-faq-section-visible-container"
			style={newStyle}
			onClick={() => setOpenHidden(!openHidden)}
		>
			{content}
		</div>
	);
}

const Hidden = ({
	content,
	height,
	style = {},
	open
}) => {
	if (!content || !height) {
		return null;
	}
	const newStyle = Object.assign({}, style, {
		height: open ? height : 0
	});
	return (
		<div
			className="home-faq-section-hidden-container"
			style={newStyle}
		>
			{content}
		</div>
	);
}

export default Section;
