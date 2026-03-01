import './scss/styles.scss'

import { EventEmitter } from './components/base/Events'
import { WebLarekApi } from './components/Models/WebLarekApi'
import { Api } from './components/base/Api'
import { Products } from './components/Models/Products'
import { Basket } from './components/Models/Basket'
import { Buyer } from './components/Models/Buyer'
import { Page } from './components/View/Page'
import { CardCatalog, CardPreview, CardBasket } from './components/View/Card'
import { BasketView } from './components/View/BasketView'
import { Modal } from './components/View/Modal'
import { OrderForm, ContactsForm } from './components/View/Form'
import { OrderSuccess } from './components/View/OrderSuccess'
import { API_URL, CDN_URL, AppEvents } from './utils/constants'
import { cloneTemplate } from './utils/utils'
import { IBasketProduct, IOrder, IOrderResult, IProduct, TPayment } from './types'

// инфраструктура
const events = new EventEmitter()
const apiBase = new Api(API_URL)
const api = new WebLarekApi(apiBase)

// шаблоны
const cardCatalogTpl = document.querySelector<HTMLTemplateElement>('#card-catalog')!
const cardPreviewTpl = document.querySelector<HTMLTemplateElement>('#card-preview')!
const cardBasketTpl = document.querySelector<HTMLTemplateElement>('#card-basket')!
const basketTpl = document.querySelector<HTMLTemplateElement>('#basket')!
const orderTpl = document.querySelector<HTMLTemplateElement>('#order')!
const contactsTpl = document.querySelector<HTMLTemplateElement>('#contacts')!
const successTpl = document.querySelector<HTMLTemplateElement>('#success')!

// модели
const products = new Products(events)
const basket = new Basket(events)
const buyer = new Buyer(events)

// view
const page = new Page(document.body, events)
const modal = new Modal(document.querySelector<HTMLElement>('#modal-container')!, events)
const basketView = new BasketView(cloneTemplate(basketTpl), events)
const orderForm = new OrderForm(cloneTemplate<HTMLFormElement>(orderTpl), events)
const contactsForm = new ContactsForm(cloneTemplate<HTMLFormElement>(contactsTpl), events)

// Вспомогательная функция: создать DOM-элементы карточек корзины
function renderBasketItems(): HTMLElement[] {
	return basket.getItems().map((item, index) =>
		new CardBasket(cloneTemplate(cardBasketTpl), {
			onClick: () => basket.remove(item),
		}).render({
			title: item.title,
			price: item.price,
			index: index + 1,
		})
	)
}

// каталог
events.on(AppEvents.ProductsChanged, (items: IProduct[]) => {
	const cards = items.map((item) =>
		new CardCatalog(cloneTemplate(cardCatalogTpl), {
			onClick: () => events.emit(AppEvents.CardSelect, item),
		}).render({
			title: item.title,
			price: item.price,
			category: item.category,
			image: CDN_URL + item.image,
		})
	)
	page.render({ catalog: cards, counter: basket.getCount() })
})

// детальная карточка

// клик по карточке → открываем превью
events.on(AppEvents.CardSelect, (item: IProduct) => {
	products.setPreview(item)
})

// данные пришли из модели — рендерим и открываем модалку
events.on(AppEvents.ProductPreview, (item: IProduct) => {
	const inBasket = basket.contains(item.id)
	const noPrice = item.price === null

	const cardPreview = new CardPreview(cloneTemplate(cardPreviewTpl), {
		onClick: () => (inBasket ? events.emit(AppEvents.CardRemove, item) : events.emit(AppEvents.CardAdd, item)),
	})

	modal.render({
		content: cardPreview.render({
			...item,
			image: CDN_URL + item.image,
			buttonText: noPrice ? 'Недоступно' : inBasket ? 'Удалить из корзины' : 'В корзину',
			buttonDisabled: noPrice,
		}),
	})
})

// добавляем в корзину и закрываем
events.on(AppEvents.CardAdd, (item: IProduct) => {
	if (item.price !== null) {
		basket.add(item as IBasketProduct)
	}
	modal.close()
})

// убираем из корзины и закрываем
events.on(AppEvents.CardRemove, (item: IBasketProduct) => {
	basket.remove(item)
	modal.close()
})

// корзина

// иконка корзины в шапке
events.on(AppEvents.BasketOpen, () => {
	modal.render({
		content: basketView.render({
			items: renderBasketItems(),
			total: basket.getTotal(),
			valid: basket.getCount() > 0,
		}),
	})
})

// обновляем счётчик и перерисовываем корзину
events.on(AppEvents.BasketChanged, () => {
	page.render({ counter: basket.getCount() })
	basketView.render({
		items: renderBasketItems(),
		total: basket.getTotal(),
		valid: basket.getCount() > 0,
	})
})

// оформление — шаг 1

// «Оформить» в корзине → открываем форму оплаты и адреса
events.on(AppEvents.OrderOpen, () => {
	modal.render({ content: orderForm.render() })
})

// выбор способа оплаты
events.on<{ payment: TPayment }>(AppEvents.OrderPayment, ({ payment }) => {
	buyer.setPayment(payment)
})

// конкретное поле определяется по имени инпута
events.on(AppEvents.FormChange, ({ field, value }: { field: string; value: string }) => {
	if (field === 'address') buyer.setAddress(value)
	else if (field === 'email') buyer.setEmail(value)
	else if (field === 'phone') buyer.setPhone(value)
})

// при любом изменении данных покупателя обновляем обе формы
events.on(AppEvents.BuyerChanged, () => {
	const data = buyer.getData()
	const errors = buyer.validate()

	orderForm.render({
		payment: data.payment,
		address: data.address,
		valid: !errors.payment && !errors.address,
		errors: [errors.payment, errors.address].filter(Boolean).join('; '),
	})

	contactsForm.render({
		email: data.email,
		phone: data.phone,
		valid: !errors.email && !errors.phone,
		errors: [errors.email, errors.phone].filter(Boolean).join('; '),
	})
})

// шаг 1 пройден — переходим к контактам
events.on(AppEvents.OrderSubmit, () => {
	modal.render({ content: contactsForm.render() })
})

// оформление — шаг 2

// собираем заказ и отправляем
events.on(AppEvents.ContactsSubmit, () => {
	const orderData: IOrder = {
		...buyer.getData(),
		total: basket.getTotal(),
		items: basket.getItems().map((i) => i.id),
	} as IOrder
	api
		.post(orderData)
		.then((result) => {
			const total = (result as IOrderResult).total
			basket.clear()
			buyer.clear()
			const successView = new OrderSuccess(cloneTemplate(successTpl), events)
			modal.render({ content: successView.render({ total }) })
		})
		.catch((err: unknown) => {
			contactsForm.render({ valid: false, errors: String(err) })
		})
})

// возврат в каталог
events.on(AppEvents.SuccessClose, () => {
	modal.close()
})

// пока модалка открыта — страница не скроллится
events.on(AppEvents.ModalOpen, () => {
	page.render({ locked: true })
})

// закрытие модалки — только снятие блокировки прокрутки
events.on(AppEvents.ModalClose, () => {
	page.render({ locked: false })
})

// загружаем товары
api
	.get()
	.then((data) => products.setItems(data.items))
	.catch(() => {})
