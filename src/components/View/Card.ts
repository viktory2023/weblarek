import { Component } from '../base/Component'

export interface ICard {
	title: string
	price: number | null
}

export abstract class Card<T extends ICard = ICard> extends Component<T> {
	protected _title: HTMLElement
	protected _price: HTMLElement

	constructor(container: HTMLElement) {
		super(container)
		this._title = container.querySelector('.card__title')!
		this._price = container.querySelector('.card__price')!
	}

	set title(value: string) {
		this.setText(this._title, value)
	}

	set price(value: number | null) {
		this.setText(this._price, value === null ? 'Бесценно' : `${value} синапсов`)
	}
}