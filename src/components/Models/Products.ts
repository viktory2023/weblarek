import { IProduct } from '../../types'
import { IEvents } from '../base/Events'
import { AppEvents } from '../../utils/constants'

export class Products {
	private items: IProduct[]
	private preview: IProduct | null

	constructor(protected events: IEvents) {
		this.items = []
		this.preview = null
	}

	// сохраняем список и оповещаем подписчиков
	setItems(items: IProduct[]): void {
		this.items = items
		this.events.emit(AppEvents.ProductsChanged, items)
	}

	getItems(): IProduct[] {
		return this.items
	}

	getItem(id: string): IProduct | undefined {
		return this.items.find((product) => product.id === id)
	}

	// null — сбросить выбранный товар
	setPreview(item: IProduct | null): void {
		this.preview = item
		this.events.emit(AppEvents.ProductPreview, item ?? undefined)
	}

	getPreview(): IProduct | null {
		return this.preview
	}
}
