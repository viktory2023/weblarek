import { Component } from '../base/Component'
import { IEvents } from '../base/Events'
import { AppEvents } from '../../utils/constants'

interface IPageData {
	counter: number
	catalog: HTMLElement[]
	locked: boolean
}

export class Page extends Component<IPageData> {
	protected _counter: HTMLElement
	protected _gallery: HTMLElement
	protected _wrapper: HTMLElement
	protected _basket: HTMLButtonElement

	constructor(
		container: HTMLElement,
		protected events: IEvents
	) {
		super(container)
		this._counter = this.container.querySelector('.header__basket-counter')!
		this._gallery = this.container.querySelector('.gallery')!
		this._wrapper = this.container.querySelector('.page__wrapper')!
		this._basket = this.container.querySelector<HTMLButtonElement>('.header__basket')!
		this._basket.addEventListener('click', () => this.events.emit(AppEvents.BasketOpen))
	}

	set counter(value: number) {
		this.setText(this._counter, value)
	}

	set catalog(items: HTMLElement[]) {
		this._gallery.replaceChildren(...items)
	}

	set locked(value: boolean) {
		this.toggleClass(this._wrapper, 'page__wrapper_locked', value)
	}
}
