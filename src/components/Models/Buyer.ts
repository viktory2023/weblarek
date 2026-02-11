import { IBuyer, IBuyerErrors, TPayment } from '../../types'

export class Buyer {
	private payment: TPayment | null
	private address: string
	private phone: string
	private email: string

	constructor() {
		this.payment = null
		this.address = ''
		this.phone = ''
		this.email = ''
	}

	public setPayment(value: TPayment): void {
		this.payment = value
	}

	public setAddress(value: string): void {
		this.address = value
	}

	public setPhone(value: string): void {
		this.phone = value
	}

	public setEmail(value: string): void {
		this.email = value
	}

	public getData(): IBuyer {
		if (!this.payment) {
			throw new Error('Payment is not set')
		}

		return {
			payment: this.payment,
			address: this.address,
			phone: this.phone,
			email: this.email
		}
	}

	public clear(): void {
		this.payment = null
		this.address = ''
		this.phone = ''
		this.email = ''
	}

	public validate(): IBuyerErrors {
		const errors: IBuyerErrors = {}

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
