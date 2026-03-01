import { Form } from './Form'
import { IEvents } from '../base/Events'
import { AppEvents } from '../../utils/constants'

export class ContactsForm extends Form<{ email: string; phone: string }> {
	private _emailInput: HTMLInputElement
	private _phoneInput: HTMLInputElement

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events)

		this._emailInput = container.querySelector('[name=email]')!
		this._phoneInput = container.querySelector('[name=phone]')!
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