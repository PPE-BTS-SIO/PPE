// On importe React et 'PureComponent' pour avoir un state.
import React, { PureComponent } from 'react';

// On importe les composants nécéssaires à ce qu'on veut faire.
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
// Pas la peine d'utiliser un Tooltip, c'est juste pour l'exemple.
import Tooltip from 'material-ui/Tooltip';

// On déclare notre classe.
class CreateInput extends PureComponent {

	// Comme en Java, on va crééer un constructor avec notre state.
	constructor(props) {
		super(props);
		// Dans notre state nous allons stocker deux variables: shouldBeDisabled et textInput
		// shouldBeDisabled est un boolean qui permet d'activer / désactiver l'espace d'écriture.
		// textInput est le texte qui sera présent dans l'espace d'écriture.
		this.state = {
			shouldBeDisabled: false,
			textInput: ''
		}
	}


	/*
		On déclare une méthode qu'on va appeler 'handleChange' qui va nous permettre
		changer la variable 'textInput' présente dans notre state pour celle qui sera
		passée par le composant TextField (quand on change le contenu dedans).
	*/
	handleChange = (e) => {
		/*
			Le composant 'TextField' nous renvoie un élement HTML contenant la variable
			'target' qui contient la variable 'value', c'est le texte que nous avons
			écrit dedans.
		*/
		const text = e.target.value;

		// On met la valeur de la variable dans le state.
		this.setState({ textInput: text });
	}

	// On rend notre composant.
	render() {
		// On récupère les variables depuis le state.
		const { shouldBeDisabled, textInput } = this.state;
		return (
			<div className="examples-container">
				<TextField
					value={textInput}
					onChange={this.handleChange}
					disabled={shouldBeDisabled}
					placeholder="Je suis un placeholder !"
				/>
				<Tooltip title="Activer / Desactiver le TextField">
					<Checkbox
						onChange={e => this.setState({ shouldBeDisabled: e.target.checked })}
						value={shouldBeDisabled}
					/>
				</Tooltip>
			</div>
		);
	}
}

// On exporte notre composant.
export default CreateInput;
