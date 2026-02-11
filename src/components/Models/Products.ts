import { IProduct } from '../../types'

/**
 * Класс, представляющий коллекцию товаров.
 */
export class Products {
	private items: IProduct[]
	private preview: IProduct | null

	constructor() {
		this.items = []
		this.preview = null
	}

	/**
	 * Устанавливает массив товаров.
	 * @param items - Массив объектов товаров.
	 */
	setItems(items: IProduct[]): void {
		this.items = items
	}

	/**
	 * Возвращает массив всех товаров.
	 * @returns IProduct[] - Массив объектов товаров.
	 */
	getItems(): IProduct[] {
		return this.items
	}

	/**
	 * Возвращает товар по его идентификатору.
	 * @param id - Идентификатор товара.
	 * @returns IProduct | undefined - Объект товара или объект с ошибкой, если товар не найден.
	 */
	getItem(id: string): IProduct | undefined  {
		const item = this.items.find(product => product.id === id)

		if (!item) {
			return
		}

		return item
	}

	/**
	 * Устанавливает товар для предпросмотра.
	 * @param item - Объект товара или null для очистки предпросмотра.
	 */
	setPreview(item: IProduct | null): void {
		this.preview = item
	}

	/**
	 * Возвращает товар для предпросмотра.
	 * @returns IProduct | null - Объект товара или null, если предпросмотр не установлен.
	 */
	getPreview(): IProduct | null {
		return this.preview
	}
}
