import React from 'react';

import FAQ from './views/faq';

/*
As said in home/index, this component render contant based on the current
contentView.
*/
const View = ({ contentView, changeContentView }) => {
	switch (contentView) {
		case 1: return <div>{'yo'}</div>
		default: return <FAQ changeContentView={changeContentView} />
	}
};

export default View;
