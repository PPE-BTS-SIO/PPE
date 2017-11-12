import {
	createBorder,
	flexUtils,
	pixelsToRem
} from '../../../../utils/styles_utils';

const { goFlex } = flexUtils;

export default ({
	container: {
		border: createBorder(),
		overflow: 'hidden',
		'&, & > *': {
			width: '100%',
			transition: 'all .3s'
		}
	},
	visible: type => ({
		height: '100%',
		width: '100%',
		...goFlex(),
		textAlign: 'center',
		textTransform: 'uppercase',
		fontWeight: 'bolder',
		fontFamily: ['Raleway', 'sans serif'],
		fontSize: pixelsToRem(70),
		transition: 'all .3s',
		color: type === 'dark' ? 'rgba(0, 0, 0, .3)' : '#FFF',
		'-webkit-text-stroke-width': type === 'dark' ? 0 : '2px',
		'-webkit-text-stroke-color': type === 'dark' ? null : 'rgba(0, 0, 0, .3)',
		'&:hover': {
			cursor: 'pointer'
		}
	})
});
