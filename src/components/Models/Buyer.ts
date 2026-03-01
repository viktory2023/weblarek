import { IBuyer, TPayment } from '../../types'
import { IEvents } from '../base/Events'
import { AppEvents } from '../../utils/constants'

export class Buyer {
	private payment: TPayment | '' = ''
	private address: string
	private phone: string
	private email: string

	constructor(protected events: IEvents) {
		this.payment = ''
		this.address = ''
		this.phone = ''
		this.email = ''
	}

	public setPayment(value: TPayment): void {
		this.payment = value
		this.events.emit(AppEvents.BuyerChanged, this.getData())
	}

	public setAddress(value: string): void {
		this.address = value
		this.events.emit(AppEvents.BuyerChanged, this.getData())
	}

	public setPhone(value: string): void {
		this.phone = value
		this.events.emit(AppEvents.BuyerChanged, this.getData())
	}

	public setEmail(value: string): void {
		this.email = value
		this.events.emit(AppEvents.BuyerChanged, this.getData())
	}

	public getData(): IBuyer {
		return {
			payment: this.payment,
			address: this.address,
			phone: this.phone,
			email: this.email,
		}
	}

	public clear(): void {
		this.payment = ''
		this.address = ''
		this.phone = ''
		this.email = ''
		this.events.emit(AppEvents.BuyerChanged, this.getData())
	}

	public validate(): Partial<Record<keyof IBuyer, string>> {
		const errors: Partial<Record<keyof IBuyer, string>> = {}
		if (!this.payment) {
			errors.payment = 'Не выбран способ оплаты'
		}
		if (!this.address) {
			errors.address = 'Не указан адрес'
		}
		if (!this.phone) {
			errors.phone = 'Не указан телефон'
		}
		if (!this.email) {
			errors.email = 'Не указан email'
		}
		return errors
	}
}
