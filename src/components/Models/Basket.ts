import { IBasketProduct } from '../../types'
import { IEvents } from '../base/Events'
import { AppEvents } from '../../utils/constants'

export class Basket {
	private items: IBasketProduct[]

	constructor(protected events: IEvents) {
		this.items = []
	}

	public getItems(): IBasketProduct[] {
		return this.items
	}

	public add(item: IBasketProduct): void {
		this.items.push(item)
		this.events.emit(AppEvents.BasketChanged, this.items)
	}

	public remove(item: IBasketProduct): void {
		this.items = this.items.filter((i) => i.id !== item.id)
		this.events.emit(AppEvents.BasketChanged, this.items)
	}

	public clear(): void {
		this.items = []
		this.events.emit(AppEvents.BasketChanged, this.items)
	}

	public getTotal(): number {
		return this.items.reduce((sum, item) => sum + item.price, 0)
	}

	public getCount(): number {
		return this.items.length
	}

	public contains(id: string): boolean {
		return this.items.some((item) => item.id === id)
	}
}
