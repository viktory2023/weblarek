import { Form } from './Form'
import { IEvents } from '../base/Events'
import { AppEvents } from '../../utils/constants'
import { TPayment } from '../../types'

export class OrderForm extends Form<{ payment: TPayment | ''; address: string }> {
	private _paymentButtons: HTMLButtonElement[]
	private _addressInput: HTMLInputElement

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events)

		this._paymentButtons = Array.from(
			container.querySelectorAll('.order__buttons button')
		)

		this._addressInput = container.querySelector('[name=address]')!

		this._paymentButtons.forEach((button) => {
			button.addEventListener('click', () => {
				this.events.emit(AppEvents.OrderPayment, {
					payment: button.name as TPayment,
				})
			})
		})
	}

	private _updatePaymentButtons(active: TPayment | ''): void {
		this._paymentButtons.forEach((button) => {
			this.toggleClass(button, 'button_alt-active', button.name === active)
		})
	}

	set payment(value: TPayment | '') {
		this._updatePaymentButtons(value)
	}

	set address(value: string) {
		this._addressInput.value = value
	}

	protected onSubmit(): void {
		this.events.emit(AppEvents.OrderSubmit)
	}
}