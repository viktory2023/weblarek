import { Component } from '../base/Component'
import { IEvents } from '../base/Events'
import { AppEvents } from '../../utils/constants'

interface IModalData {
	content: HTMLElement
}

/**
 * Модальное окно.
 * Управляет открытием/закрытием и вставкой content.
 * При открытии emit ModalOpen, при закрытии — ModalClose.
 */
export class Modal extends Component<IModalData> {
	protected _closeButton: HTMLButtonElement
	protected _content: HTMLElement

	constructor(
		container: HTMLElement,
		protected events: IEvents
	) {
		super(container)
		this._closeButton = container.querySelector('.modal__close')!
		this._content = container.querySelector('.modal__content')!

		// Закрытие по кнопке
		this._closeButton.addEventListener('click', () => this.close())

		// Закрытие по клику на оверлей (фон контейнера, а не его содержимое)
		container.addEventListener('click', (e) => {
			if (e.target === container) this.close()
		})
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value)
	}

	open(): void {
		this.toggleClass(this.container, 'modal_active', true)
		this.events.emit(AppEvents.ModalOpen)
	}

	close(): void {
		this.toggleClass(this.container, 'modal_active', false)
		this.events.emit(AppEvents.ModalClose)
	}

	/** Устанавливает content, открывает модалку и возвращает контейнер */
	render(data: IModalData): HTMLElement {
		super.render(data)
		this.open()
		return this.container
	}
}
