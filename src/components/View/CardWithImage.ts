import { Card, ICard } from './Card'
import { categoryMap } from '../../utils/constants'

export interface ICardWithImage extends ICard {
	category: string
	image: string
}

export abstract class CardWithImage<
	T extends ICardWithImage = ICardWithImage
> extends Card<T> {
	protected _category: HTMLElement
	protected _image: HTMLImageElement

	constructor(container: HTMLElement) {
		super(container)
		this._category = container.querySelector('.card__category')!
		this._image = container.querySelector<HTMLImageElement>('.card__image')!
	}

	set category(value: string) {
		this.setText(this._category, value)

		Object.values(categoryMap).forEach((cls) =>
			this._category.classList.remove(cls)
		)

		const modifier = categoryMap[value as keyof typeof categoryMap]
		if (modifier) this._category.classList.add(modifier)
	}

	set image(src: string) {
		this.setImage(this._image, src, this._title.textContent ?? '')
	}
}