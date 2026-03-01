/* Константа для получения полного пути для сервера. Для выполнения запроса 
необходимо к API_URL добавить только ендпоинт. */
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`

/* Константа для формирования полного пути к изображениям карточек. 
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`

/* Константа соответствий категорий товара модификаторам, используемым для отображения фона категории. */
export const categoryMap = {
	'софт-скил': 'card__category_soft',
	'хард-скил': 'card__category_hard',
	кнопка: 'card__category_button',
	дополнительное: 'card__category_additional',
	другое: 'card__category_other',
}

export const settings = {}

export enum AppEvents {
	ProductsChanged = 'products:changed',
	ProductPreview = 'product:preview',
	BasketChanged = 'basket:changed',
	BuyerChanged = 'buyer:changed',
	CardSelect = 'card:select',
	CardAdd = 'card:addToBasket',
	CardRemove = 'card:removeFromBasket',
	BasketOpen = 'basket:open',
	OrderOpen = 'order:open',
	OrderPayment = 'order:paymentChange',
	OrderSubmit = 'order:submit',
	ContactsSubmit = 'contacts:submit',
	FormChange = 'form:change',
	SuccessClose = 'success:close',
	ModalOpen = 'modal:open',
	ModalClose = 'modal:close',
}
