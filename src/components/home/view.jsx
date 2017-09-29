import React from 'react';

import FAQ from './views/faq';

const View = ({ contentView, changeContentView }) => {
	switch (contentView) {
		case 1: return <div>{'yo'}</div>
		default: return <FAQ changeContentView={changeContentView} />
	}
};

export default View;
