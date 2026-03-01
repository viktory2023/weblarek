import { Component } from '../base/Component'
import { IEvents } from '../base/Events'
import { AppEvents } from '../../utils/constants'
import { TPayment } from '../../types'

/**
 * Абстрактный базовый класс формы.
 * T — тип данных, специфичных для конкретной формы (payload сеттеров).
 * Итоговый тип рендера: T & { valid: boolean; errors: string }
 */
export abstract class Form<T extends object> extends Component<T & { valid: boolean; errors: string }> {
	protected _submit: HTMLButtonElement
	protected _errors: HTMLElement

	constructor(
		container: HTMLFormElement,
		protected readonly events: IEvents
	) {
		super(container)

		this._submit = container.querySelector<HTMLButtonElement>('[type=submit]')!
		this._errors = container.querySelector<HTMLElement>('.form__errors')!

		// Изменение любого поля → сообщить Presenter'у
		container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement
			this.events.emit(AppEvents.FormChange, {
				field: target.name,
				value: target.value,
			})
		})

		// Отправка формы → делегировать конкретному подклассу
		container.addEventListener('submit', (e: Event) => {
			e.preventDefault()
			this.onSubmit()
		})
	}

	/** каждый подкласс сам решает, что именно emit'ить при сабмите */
	protected abstract onSubmit(): void

	set valid(value: boolean) {
		this.setDisabled(this._submit, !value)
	}

	set errors(value: string) {
		this.setText(this._errors, value)
	}
}

// шаг 1: оплата + адрес
export class OrderForm extends Form<{ payment: TPayment | ''; address: string }> {
	private _paymentButtons: HTMLButtonElement[]
	private _addressInput: HTMLInputElement

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events)

		this._paymentButtons = Array.from(container.querySelectorAll<HTMLButtonElement>('.order__buttons button'))
		this._addressInput = container.querySelector<HTMLInputElement>('[name=address]')!

		// Клик по кнопке оплаты → уведомить Presenter
		this._paymentButtons.forEach((button) => {
			button.addEventListener('click', () => {
				this.events.emit(AppEvents.OrderPayment, { payment: button.name as TPayment })
			})
		})
	}

	/** Обновляет визуальное состояние кнопок оплаты */
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

// шаг 2: контакты
export class ContactsForm extends Form<{ email: string; phone: string }> {
	private _emailInput: HTMLInputElement
	private _phoneInput: HTMLInputElement

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events)

		this._emailInput = container.querySelector<HTMLInputElement>('[name=email]')!
		this._phoneInput = container.querySelector<HTMLInputElement>('[name=phone]')!
	}

	set email(value: string) {
		this._emailInput.value = value
	}

	set phone(value: string) {
		this._phoneInput.value = value
	}

	protected onSubmit(): void {
		this.events.emit(AppEvents.ContactsSubmit)
	}
}
