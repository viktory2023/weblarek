import { Component } from '../base/Component'
import { IEvents } from '../base/Events'
import { AppEvents } from '../../utils/constants'

interface IHeaderData {
	counter: number
}

export class Header extends Component<IHeaderData> {
	protected _counter: HTMLElement
	protected _basket: HTMLButtonElement

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container)

		this._counter = this.container.querySelector('.header__basket-counter')!
		this._basket = this.container.querySelector<HTMLButtonElement>('.header__basket')!

		this._basket.addEventListener('click', () =>
			this.events.emit(AppEvents.BasketOpen)
		)
	}

	set counter(value: number) {
		this.setText(this._counter, value)
	}
}

interface IGalleryData {
	catalog: HTMLElement[]
}

export class Gallery extends Component<IGalleryData> {
	protected _gallery: HTMLElement

	constructor(container: HTMLElement) {
		super(container)

		this._gallery = this.container.querySelector('.gallery')!
	}

	set catalog(items: HTMLElement[]) {
		this._gallery.replaceChildren(...items)
	}
}