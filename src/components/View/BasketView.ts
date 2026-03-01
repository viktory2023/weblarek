import { Component } from '../base/Component'
import { IEvents } from '../base/Events'
import { AppEvents } from '../../utils/constants'

export interface IBasketView {
	items: HTMLElement[]
	total: number
	valid: boolean
}

/**
 * Компонент корзины в модальном окне.
 * Отображает список товаров, общую сумму и кнопку оформления заказа.
 */
export class BasketView extends Component<IBasketView> {
	protected _list: HTMLElement
	protected _total: HTMLElement
	protected _button: HTMLButtonElement

	constructor(
		container: HTMLElement,
		protected events: IEvents
	) {
		super(container)
		this._list = container.querySelector('.basket__list')!
		this._total = container.querySelector('.basket__price')!
		this._button = container.querySelector<HTMLButtonElement>('.basket__button')!

		this._button.addEventListener('click', () => {
			this.events.emit(AppEvents.OrderOpen)
		})
	}

	set items(elements: HTMLElement[]) {
		if (elements.length === 0) {
			this._list.innerHTML = '<p class="basket__empty">Корзина пуста</p>'
		} else {
			this._list.replaceChildren(...elements)
		}
	}

	set total(value: number) {
		this.setText(this._total, `${value} синапсов`)
	}

	set valid(value: boolean) {
		this.setDisabled(this._button, !value)
	}
}
