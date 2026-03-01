import { Component } from '../base/Component'
import { IEvents } from '../base/Events'
import { AppEvents } from '../../utils/constants'

export abstract class Form<T extends object> extends Component<
	T & { valid: boolean; errors: string }
> {
	protected _submit: HTMLButtonElement
	protected _errors: HTMLElement

	constructor(
		container: HTMLFormElement,
		protected readonly events: IEvents
	) {
		super(container)

		this._submit = container.querySelector('[type=submit]')!
		this._errors = container.querySelector('.form__errors')!

		container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement

			this.events.emit(AppEvents.FormChange, {
				field: target.name,
				value: target.value,
			})
		})

		container.addEventListener('submit', (e: Event) => {
			e.preventDefault()
			this.onSubmit()
		})
	}

	protected abstract onSubmit(): void

	set valid(value: boolean) {
		this.setDisabled(this._submit, !value)
	}

	set errors(value: string) {
		this.setText(this._errors, value)
	}
}