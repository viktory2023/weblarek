import { Component } from '../base/Component'
import { IEvents } from '../base/Events'
import { AppEvents } from '../../utils/constants'

/**
 * Компонент экрана успешного оформления заказа.
 * Отображает сумму списанных синапсов и кнопку возврата в каталог.
 */
export class OrderSuccess extends Component<{ total: number }> {
	private _close: HTMLButtonElement
	private _description: HTMLElement

	constructor(
		container: HTMLElement,
		protected readonly events: IEvents
	) {
		super(container)

		this._close = container.querySelector<HTMLButtonElement>('.order-success__close')!
		this._description = container.querySelector<HTMLElement>('.order-success__description')!

		this._close.addEventListener('click', () => {
			this.events.emit(AppEvents.SuccessClose)
		})
	}

	/** Устанавливает текст с количеством списанных синапсов */
	set total(value: number) {
		this.setText(this._description, `Списано ${value} синапсов`)
	}
}
