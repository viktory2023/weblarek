import { CardWithImage, ICardWithImage } from './CardWithImage'

export interface ICardPreview extends ICardWithImage {
	description?: string
	buttonText?: string
	buttonDisabled?: boolean
}

export class CardPreview extends CardWithImage<ICardPreview> {
	protected _description: HTMLElement
	protected _button: HTMLButtonElement

	constructor(container: HTMLElement, actions?: { onClick?: () => void }) {
		super(container)

		this._description = container.querySelector('.card__text')!
		this._button = container.querySelector('.card__button')!

		if (actions?.onClick) {
			this._button.addEventListener('click', actions.onClick)
		}
	}

	set description(value: string) {
		this.setText(this._description, value)
	}

	set buttonText(value: string) {
		this.setText(this._button, value)
	}

	set buttonDisabled(value: boolean) {
		this.setDisabled(this._button, value)
	}
}