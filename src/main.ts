import './scss/styles.scss'

import { Products, Basket, Buyer, WebLarekApi } from './components/Models'

import { apiProducts } from './utils/data'
import { Api } from './components/base/Api'
import { IBasketProduct } from './types'
import { API_URL } from './utils/constants'

const productsModel = new Products()
const basketModel = new Basket()
const buyerModel = new Buyer()
const apiModel = new Api(API_URL)
const WebLarekApiModel = new WebLarekApi(apiModel)

productsModel.setItems(apiProducts.items)

// Если не сделать "as IBasketProduct",
// тогда TypeScript считает что в корзину возможно будет добавлен товар с price: null.
// Можно так же делать исключение и проверять "if (apiProducts.items[0].price !== null)" тогда кладем в корзину.
// Возможно я запутался с типами корзины и списка товаров.
// Пример:
// if (apiProducts.items[0].price !== null) {
// 	basketModel.add(apiProducts.items[0])
// }
basketModel.add(apiProducts.items[0] as IBasketProduct)

// КОРЗИНА
console.log('--- КОРЗИНА ---')
console.log('Товары в корзине:', basketModel.getItems())
console.log('Количество товаров:', basketModel.getCount())
console.log('Общая сумма:', basketModel.getTotal())
console.log('Содержит товар с id "1":', basketModel.contains('1'))
console.log(
	'Содержит товар с id "854cef69-976d-4c2a-a18c-2aa45046c390":',
	basketModel.contains('854cef69-976d-4c2a-a18c-2aa45046c390')
)

// ТОВАРЫ
console.log('--- ТОВАРЫ ---')
console.log('Все товары:', productsModel.getItems())
console.log('Поиск товара по id "1":', productsModel.getItem('1'))
console.log(
	'Поиск товара по id "854cef69-976d-4c2a-a18c-2aa45046c390":',
	productsModel.getItem('854cef69-976d-4c2a-a18c-2aa45046c390')
)

productsModel.setPreview(apiProducts.items[0])
console.log('Preview после установки:', productsModel.getPreview())
productsModel.setPreview(null)
console.log('Preview после сброса:', productsModel.getPreview())

// ПОКУПАТЕЛЬ (пустые данные)
console.log('--- ПОКУПАТЕЛЬ (пустые данные) ---')
const emptyBuyer = new Buyer()
console.log('Валидация пустого покупателя:', emptyBuyer.validate())

// ПОКУПАТЕЛЬ (заполненные данные)
console.log('--- ПОКУПАТЕЛЬ (заполненные данные) ---')
buyerModel.setEmail('mail@mail.com')
buyerModel.setPhone('+1234567890')
buyerModel.setAddress('Chelyabinsk, Lenina St, 5')
buyerModel.setPayment('card')
console.log('Данные покупателя:', buyerModel.getData())
console.log('Валидация заполненного покупателя:', buyerModel.validate())

// ПОКУПАТЕЛЬ (частично заполненные данные)
console.log('--- ПОКУПАТЕЛЬ (частично заполненные данные) ---')
const partialBuyer = new Buyer()
partialBuyer.setEmail('test@test.com')
partialBuyer.setPayment('cash')
console.log('Данные частично заполненного покупателя:', partialBuyer.getData())
console.log('Валидация:', partialBuyer.validate())

// API
console.log('--- API ---')
const productsData = await WebLarekApiModel.get()
console.log('Массив товаров с сервера: ', productsData.items)

const orderResult = await WebLarekApiModel.post({
	total: basketModel.getTotal(),
	items: basketModel.getItems().map(item => item.id),
	...buyerModel.getData()
})
console.log('Ответ сервера при оформлении заказа: ', orderResult)
