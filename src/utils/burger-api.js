
const NORMA_API = "https://norma.nomoreparties.space/api";

export function getIngredients() {
	return fetch(`${NORMA_API}/ingredients`);
}

export function getOrder(tempList) {
	let tempOrder = {"ingredients": tempList};
	return fetch(`${NORMA_API}/orders`, {
		method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
		body: JSON.stringify(tempOrder),
	});
}
