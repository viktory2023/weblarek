import { Component } from '../base/Component'
import { categoryMap } from '../../utils/constants'

export interface ICardActions {
	onClick?: () => void
}

export interface ICard {
	title: string
	price: number | null
	category?: string
	image?: string
}

/**
 * Абстрактный базовый класс карточки товара.
 * Управляет общими полями: title, price, category, image.
 */
export abstract class Card<T extends ICard = ICard> extends Component<T> {
	protected _title: HTMLElement
	protected _price: HTMLElement
	protected _category?: HTMLElement
	protected _image?: HTMLImageElement

	constructor(container: HTMLElement) {
		super(container)
		this._title = container.querySelector('.card__title')!
		this._price = container.querySelector('.card__price')!
		this._category = container.querySelector('.card__category') ?? undefined
		this._image = container.querySelector<HTMLImageElement>('.card__image') ?? undefined
	}

	set title(value: string) {
		this.setText(this._title, value)
	}

	set price(value: number | null) {
		this.setText(this._price, value === null ? 'Бесценно' : `${value} синапсов`)
	}

	set category(value: string) {
		if (this._category) {
			this.setText(this._category, value)
			// Убрать существующие модификаторы категории
			Object.values(categoryMap).forEach((cls) => this._category!.classList.remove(cls))
			const modifier = categoryMap[value as keyof typeof categoryMap]
			if (modifier) this._category.classList.add(modifier)
		}
	}

	set image(src: string) {
		if (this._image) {
			this.setImage(this._image, src, this._title?.textContent ?? '')
		}
	}
}

/**
 * Карточка товара в каталоге галереи.
 * При клике вызывает actions.onClick().
 */
export class CardCatalog extends Card {
	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container)
		if (actions?.onClick) {
			container.addEventListener('click', actions.onClick)
		}
	}
}

export interface ICardPreview extends ICard {
	description?: string
	buttonText?: string
	buttonDisabled?: boolean
}

/**
 * Детальная карточка товара в модальном окне.
 * Содержит поле описания и кнопку "В корзину" / "Уже в корзине".
 */
export class CardPreview extends Card<ICardPreview> {
	protected _description: HTMLElement
	protected _button: HTMLButtonElement

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container)
		this._description = container.querySelector('.card__text')!
		this._button = container.querySelector('.card__button')!

		if (actions?.onClick) {
			this._button.addEventListener('click', actions.onClick)
		}
	}

	set description(value: string) {
		this.setText(this._description, value)
	}

	set buttonText(value: string) {
		this.setText(this._button, value)
	}

	set buttonDisabled(value: boolean) {
		this.setDisabled(this._button, value)
	}
}

export interface ICardBasket extends ICard {
	index?: number
}

/**
 * Карточка товара в корзине.
 * Отображает порядковый номер, название, цену и кнопку удаления.
 */
export class CardBasket extends Card<ICardBasket> {
	protected _index: HTMLElement
	protected _deleteButton: HTMLButtonElement

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container)
		this._index = container.querySelector('.basket__item-index')!
		this._deleteButton = container.querySelector<HTMLButtonElement>('.basket__item-delete')!

		if (actions?.onClick) {
			this._deleteButton.addEventListener('click', actions.onClick)
		}
	}

	set index(value: number) {
		this.setText(this._index, String(value))
	}
}
