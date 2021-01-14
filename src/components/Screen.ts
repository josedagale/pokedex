import { State } from '../types/storeTypes';
import { TypeColor } from '../types/pokemonTypes';
import { getTypeColor } from '../utils/getTypeColor';

class Screen {
	screen: HTMLElement;
	name: HTMLElement;
	typesSection: HTMLElement;
	constructor() {
		this.screen = document.getElementById('screen')!;
		this.name = document.getElementById('name')!;
		this.typesSection = document.getElementById('types')!;
	}

	printPoke = ({ currentPokemon, loading, error }: State) => {
		if (loading) {
			this.screen.innerHTML = `<div class="lds-ripple"><div></div><div></div></div>`;
		}
		if (error) {
			this.screen.innerHTML = `<p class='screen__error'>It looks like it is not a pokemon. <br/><br/>Try again.`;
			this.name.innerHTML = 'Oops!';
		}

		this.screen.innerHTML = `<img class='screen__image' id='img' src=${currentPokemon.img} alt="">`;
		this.name.innerText = currentPokemon.name;

		this.typesSection.innerHTML = '';
		currentPokemon.types.map((type) => {
			const { background, color }: any = getTypeColor(type.type.name);
			const typeButton = `
					<div class='controls__type' style= 'background: ${background}; color:${color}'>
						${type.type.name}
					</div>
					`;
			this.typesSection.innerHTML = this.typesSection.innerHTML + typeButton;
		});
	};
}

export default Screen;
