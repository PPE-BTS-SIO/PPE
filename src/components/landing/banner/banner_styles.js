import {
	flexUtils,
	createBackground,
	createBorder,
	pixelsToRem
} from '../../../utils/styles_utils';

const { goFlex } = flexUtils;

/*
This is where the magic happens.
Styles given to the 'Banner' component.
*/
export default ({
	container: {
		height: 550,
		width: '100%',
		position: 'relative',
		fontFamily: ['Raleway', 'open sans', 'Roboto', 'sans serif'],
		transition: 'background 2s',
		borderBottom: createBorder(),
		...createBackground()
	},
	darken: {
		height: '100%',
		width: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
		backgroundColor: '#585B65',
		background: 'linear-gradient(135deg, #585b64 0%, #2c2f38 70%)',
		opacity: 0.9
	},
	contentContainer: {
		height: '100%',
		width: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
		...goFlex()
	},
	content: {
		'& > div': {
			width: '100%',
			...goFlex(),
			textAlign: 'center',
			color: '#FFF'
		}
	},
	title: {
		fontSize: pixelsToRem(50),
		fontWeight: 'bolder',
		color: '#FFF',
		textTransform: 'uppercase',
		marginBottom: 10
	},
	description: {
		fontFamily: ['open sans', 'Roboto', 'sans serif', 'Raleway'],
		fontSize: 20,
		marginBottom: 50
	},
	buttons: {
		'& > div:first-child': {
			marginRight: 20
		}
	}
})
