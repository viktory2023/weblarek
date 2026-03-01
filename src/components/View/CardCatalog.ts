import { CardWithImage } from './CardWithImage'

export interface ICardActions {
	onClick?: () => void
}

export class CardCatalog extends CardWithImage {
	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container)

		if (actions?.onClick) {
			container.addEventListener('click', actions.onClick)
		}
	}
}