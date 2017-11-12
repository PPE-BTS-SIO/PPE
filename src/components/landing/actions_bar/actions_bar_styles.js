import {
	flexUtils
} from '../../../utils/styles_utils';

const { goFlex } = flexUtils;

export default theme => ({
	container: {
		height: 60,
		boxShadow: 'rgba(0, 0, 0, 0.07) 0px 3px 10px, rgba(0, 0, 0, 0.14) 0px 3px 10px',
		backgroundColor: '#FFF',
		padding: [0, 30],
		...goFlex('space-between'),
		position: 'relative',
		zIndex: 1
	},
	navigation: {
		height: '100%',
		width: 200
	},
	tabs: {
		height: 'calc(100% - 3px)',
		width: '100%'
	},
	tab: {
		height: '100%',
		width: 100,
		...goFlex(),
		textAlign: 'center',
		fontFamily: ['Roboto', 'open sans', 'sans serif', 'Raleway'],
		color: 'rgba(0, 0, 0, .5)',
		float: 'left',
		'&:hover': {
			cursor: 'pointer'
		}
	},
	tabActive: {
		fontWeight: 'bolder'
	},
	inkBarContainer: {
		height: 3,
		width: '100%'
	},
	inkBar: {
		height: '100%',
		width: 100,
		backgroundColor: theme.palette.primary[500],
		transition: '.3s'
	}
});
