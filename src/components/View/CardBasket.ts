import { Card, ICard } from './Card'

export interface ICardBasket extends ICard {
	index?: number
}

export class CardBasket extends Card<ICardBasket> {
	protected _index: HTMLElement
	protected _deleteButton: HTMLButtonElement

	constructor(container: HTMLElement, actions?: { onClick?: () => void }) {
		super(container)

		this._index = container.querySelector('.basket__item-index')!
		this._deleteButton =
			container.querySelector<HTMLButtonElement>('.basket__item-delete')!

		if (actions?.onClick) {
			this._deleteButton.addEventListener('click', actions.onClick)
		}
	}

	set index(value: number) {
		this.setText(this._index, String(value))
	}
}