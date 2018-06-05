/* eslint no-undef: 0 */
/*
Tous les `import ... from ...` ci-dessous nous permettent d'importer les
composants/méthodes/autres dont nous avons besoin dans ce composant.

Exemple : Le `import './styles/global.css'` nous permet d'importer les styles
présents dans le fichier 'global.css' afin de bien afficher nos interfaces.

Lorsque que l'on importe une méthode venant des actions, cela sigifie que l'on
va la passer dans les props du composant (avec le mapDispatchToProps). Après
ça reste le fonctionnement de Redux, voir ici : https://redux.js.org/

Les routes permettent de naviguer dans l'interface, voir ici :
https://reacttraining.com/react-router/web/

Material-ui est la librairie dont on se sert pour créer nos interfaces
(Boutons, Champs de texte, Dialogs, etc...).
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MomentUtils from 'material-ui-pickers/utils/moment-utils';

import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

import { connectToServer as connectToServerAction } from './actions/node_server_actions';
import { changeWindowWidth as changeWindowWidthAction } from './actions/utils_actions';

import UserSidePanel from './components/smallviews/user_side_panel/user_side_panel';

import Routes from './routes/routes';

/*
Importing default styles, used to change appearance of the top-level objects.
This style will be used anywhere in the entire website.
*/
import './styles/global.css';

const theme = createMuiTheme({
	palette: {
		primary: blue
	}
})

/*
C'est le composant principal, en bref, c'est notre application.
Ce composant contient tous les composants enfants.
*/
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openNotConnected: false,
			openConnected: false
		}
	}

	/*
	Cette méthode est appelée juste avant que le composant ne soit monté.
	(Comprendre : Avant que le composant ne soit affiché).
	*/
	componentWillMount() {
		if (this.props.nodeStatus === 'not-connected') {
			this.props.connectToServer();
		}
	}

	/*
	Cette méthode est appelée juste après que le composant soit monté.
	(Comprendre : Après que le composant soit affiché).
	*/
	componentDidMount() {
		this.handleWindowResize();
		/*
		Le window.addEventListener permet d'appeler une fonction à chaque fois qu'un
		chargement de largeur de la fenêtre se produit. Ici, la fonction appelée est
		`handleWindowResize`.
		*/
		window.addEventListener('resize', this.handleWindowResize);
	}

	/*
	Cette fonction est appelée lorsque les props changent.
	Ici, ça nous permet de gérer les snackbar (https://material-ui-next.com/demos/snackbars/)
	afin de savoir comment et si on doit les afficher.
	*/
	componentWillReceiveProps(props) {
		if (props.nodeStatus !== 'connected' && !this.state.openNotConnected) {
			this.setState({
				openNotConnected: true,
				openConnected: false
			});
		} else if (props.nodeStatus === 'connected' && this.state.openNotConnected) {
			this.setState({
				openNotConnected: false,
				openConnected: true
			});
		}
	}

	/*
	Cette fonction est appelée juste après que le composant soit démonté.
	(Comprendre, quand il disparait).
	Ici, nous l'utilisons pour prévenir le navigateur que nous ne souhaitons plus
	écouter les changements de largeur de la fenêtre (avec la fonction `removeEventListener`).
	*/
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowResize);
	}

	handleWindowResize = () => {
		const { changeWindowWidth } = this.props;
		if (!changeWindowWidth) return false;
		changeWindowWidth(window.innerWidth);
		return true;
	}

	/*
	The render method is the main method of a React component.
	This method should return a valid React element.
	A valid element could be simple html elements surrounded by a parent element
	such as a <div> or a <span>. Custom elements works as well as long as they are
	surrounded.

	La méthode render() est la méthode principale d'un composant React.
	Elle doit absolument retourner un élement React valide.
	Un élement valide peut être de simple élement html entouré d'un élement parent
	tel qu'une <div> ou un <span>. Les élements personnalisés fonctionnent du
	moment qu'ils sont entourés d'un élement parent.

	Le MuiThemeProvider nous permet de passer certaines informations de notre
	interface à tous les composants enfants en tant que props. Nous ne l'utilisons
	que pour récupérer la couleur principale (bleu) et secondaire (violet / rose).
	Il n'est pas nécéssaire d'y toucher et la très grande majorité des styles des
	élements de l'interface proviennent des styles importés précédemments.

	Le container est la div contenant notre application (Comprendre, l'élement
	parent de tous ses enfants).

	Le composant Routes permet de déclarer toutes nos routes. (Voir le premier
	commentaire pour en savoir plus).

	Le composant UserSidePanel est le 'menu déroulant horizontalement' qui nous
	permet d'avoir des informations sur notre utilisateur et de pouvoir se
	déconnecter.

	Les deux snackbars permettent de savoir si nous sommes connectés au serveur.
	(Voir la méthode ComponentWillReceiveProps).
	*/
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<MuiPickersUtilsProvider utils={MomentUtils}>
					<div id="container">
						<Routes />
						<UserSidePanel />
						<Snackbar
							open={this.state.openNotConnected}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
							message="Vous n'êtes pas connecté au serveur"
							action={<SnackbarAction />}
						/>
						<Snackbar
							open={this.state.openConnected}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
							message="Connecté au serveur"
							autoHideDuration={4000}
							onClose={() => this.setState({ openConnected: false })}
						/>
					</div>
				</MuiPickersUtilsProvider>
			</MuiThemeProvider>
		);
	}
}

/*
Ceci est ce que l'on appelle un `Stateless Component`.
Il s'agit qu'un composant React simple, qui ne dispose d'aucun state.
Il est utile si nous n'avons pas besoin d'avoir un composant dynamique mais
plutôt qu'un composant statique.
*/
const SnackbarAction = () => (
	<Button
		onClick={() => window.location.reload()}
		color="secondary"
	>
		{'Rafraichir'}
	</Button>
);

/*
Cette méthode permet de passer certains élements de notre state dans les props
de notre composant (ici: App).
Nous pouvons ensuite intéragir avec ses données au sein de notre composant.
*/
const mapStateToProps = state => ({
	nodeStatus: state.nodeServer.status,
	socket: state.nodeServer.socket,
	role: state.user.role
});

/*
Cette méthode permet de passer les actions dans les props du composant.
(Voir le premier commentaire pour plus de détails).
*/
const mapDispatchToProps = dispatch => bindActionCreators({
	connectToServer: connectToServerAction,
	changeWindowWidth: changeWindowWidthAction
}, dispatch);

/*
Ici nous exportons notre composant afin de pouvoir l'importer dans un autre
fichier.
La méthode `connect` est fournie par Redux et nous permet de connecter notre
composant avec notre state et nos actions.
*/
export default connect(mapStateToProps, mapDispatchToProps)(App);
