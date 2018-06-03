// On importe React et 'PureComponent' pour pouvoir avoir un state.
import React, { PureComponent } from 'react';

// On importe le Button depuis material-ui.
import Button from 'material-ui/Button';

// On déclare notre classes contenant notre state.
class ButtonCreation extends PureComponent {

	// Comme en Java, on va crééer un constructor avec notre state.
	constructor(props) {

		// On s'occupe pas du 'super', mais en bref mettez le.
		super(props);

		// ça, c'est le state. Dedans on met notre variable 'iteration' (Nombre de clicks sur le bouton).
		this.state = {
			iteration: 0
		}
	}

	// On va créer une méthode qui va prendre en paramètre la variable newIteration et va la mettre en tant que nouvelle valeur de 'iteration' dans notre state avec 'setState'.
	setIteration = newIteration => this.setState({ iteration: newIteration });


	// Notre méthode render, qui permet de rendre notre composant.
	render() {

		// On récupère la variable 'iteration' depuis le state du composant.
		const { iteration } = this.state;

		// On retourne ce qu'on veut render.
		return (
			<div className="examples-container">
				{/* On ajoute le Bouton qu'on a importé auparavant. */}
				{/* La props 'onClick' va appeler la fonction 'setIteration' qu'on a créée
					en passant en paramère la valeur de base et en l'incrémentant de 1 */}
				<Button
					raised
					color="primary"
					onClick={() => this.setIteration(iteration + 1)}
				>
					{/* Le texte du bouton, ici on écrit 'Clicks: ' et on ajoute la variable 'iteration' */}
					{`Clicks: ${iteration}`}
				</Button>
			</div>
		);
	}
}

/* On exporte notre composant pour qu'il puisse être récupéré ailleurs. */
export default ButtonCreation;
