import { IOrder, IOrderError, IOrderResult, IProductList, IApi } from '../../types'

/**
 * Класс для работы с API WebLarek
 */
export class WebLarekApi {
	private readonly apiModel: IApi

	constructor(apiModel: IApi) {
		this.apiModel = apiModel
	}

	/**
	 * Получение списка товаров
	 * @returns Список товаров
	 */
	public async get(): Promise<IProductList> {
		return this.apiModel.get<IProductList>('/product/')
	}

	/**
	 * Оформление заказа
	 * @param order - Данные заказа
	 * @returns Результат оформления заказа или ошибка
	 */
	public async post(order: IOrder): Promise<IOrderResult | IOrderError> {
		return this.apiModel.post<IOrderResult | IOrderError>('/order/', order)
	}
}
