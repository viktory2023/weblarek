import { IBuyer, TPayment } from '../../types'

export class Buyer {
	private payment: TPayment
	private address: string
	private phone: string
	private email: string

	constructor() {
		this.payment = '' as TPayment
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
		return {
			payment: this.payment,
			address: this.address,
			phone: this.phone,
			email: this.email
		}
	}

	public clear(): void {
		this.payment = '' as TPayment
		this.address = ''
		this.phone = ''
		this.email = ''
	}

	public validate(): IBuyer {
		const errors: IBuyer = {}
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
