// Типы методов для API
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE'

// Интерфейс для работы с API
export interface IApi {
	get<T extends object>(uri: string): Promise<T>
	post<T extends object>(
		uri: string,
		data: object,
		method?: ApiPostMethods
	): Promise<T>
}

// Описание товара
export interface IProduct {
	id: string
	description: string
	image: string
	title: string
	category: string
	price: number | null
}

export interface IBasketProduct extends IProduct {
	price: number
}

// Данные покупателя
export interface IBuyer {
	payment?: TPayment | string
	email?: string
	phone?: string
	address?: string
}

// Вывод ошибочных данных по покупателю
export interface IBuyerErrors {
	payment?: string
	address?: string
	phone?: string
	email?: string
}

// Тип оплаты
export type TPayment = 'card' | 'cash'

// Список товаров
export interface IProductList {
	total: number
	items: IProduct[]
}

// Данные для оформления заказа
export interface IOrder extends IBuyer {
	total: number
	items: IProduct['id'][]
}

// Результат оформления заказа
export interface IOrderResult {
	id: string
	total: IOrder['total']
}

// Ошибка при оформлении заказа
export interface IOrderError {
	error: string
}
