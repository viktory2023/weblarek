import { IOrder, IOrderError, IOrderResult, IProductList } from '../../types'
import { Api } from '../base/Api'

/**
 * Класс для работы с API WebLarek
 */
export class WebLarekApi {
	readonly apiModel: Api

	constructor(apiModel: Api) {
		this.apiModel = apiModel
	}

	/**
	 * Получение списка товаров
	 * @returns Список товаров
	 */
	public async get(): Promise<IProductList> {
		return await this.apiModel.get<IProductList>('/product/').then(data => {
			return data
		})
	}

	/**
	 * Оформление заказа
	 * @param order - Данные заказа
	 * @returns Результат оформления заказа или ошибка
	 */
	public async post(order: IOrder): Promise<IOrderResult | IOrderError> {
		return await this.apiModel
			.post<IOrderResult | IOrderError>('/order/', order)
			.then(data => {
				return data
			})
	}
}
