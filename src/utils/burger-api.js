const NORMA_API = "https://norma.nomoreparties.space/api";

export function getIngredients() {
	return fetch(`${NORMA_API}/ingredients`);
}

export function getOrder(tempList) {
	let tempOrder = { ingredients: tempList };
	return fetch(`${NORMA_API}/orders`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(tempOrder),
	});
}

export const checkReponse = (res) => {
	return res.ok
		? res.json()
		: res.json().then((err) => {
				Promise.reject(err);
		  });
};

export async function resetPassword(email) {
	let postReset = { email: email };
	return await fetch(`${NORMA_API}/password-reset`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(postReset),
	});
}

export async function saveNewPassword(password, token) {
	let postReset = { password: password, token: token };
	return await fetch(`${NORMA_API}/password-reset/reset`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(postReset),
	});
}

export async function createUser(email, password, name) {
	let postReset = { email: email, password: password, name: name };
	return await fetch(`${NORMA_API}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(postReset),
	});
}

export async function refreshToken() {
	return await fetch(`${NORMA_API}/auth/token`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			token: localStorage.getItem("refreshToken"),
		}),
	});
}

export async function fetchWithRefresh(url, options) {
	let tempRefresh = null;
	let tempAccess = null;
	let isRefresh = false;
	const result = await fetch(url, options)
		.then((checkReponse) => {
			if(checkReponse.status === 403){
				isRefresh = true;
			}
			return checkReponse;
		})
		.then((res) => {
			return res.json();
		})
		.catch((e) => {
			return null;
		});
	if(isRefresh){
			await refreshToken()
				.then(checkReponse)
				.then((newToken) => {
					tempRefresh = newToken.refreshToken;
					tempAccess = newToken.accessToken;
					if('authorization' in options.headers){
						options.headers.authorization = tempAccess;
					}
					return newToken;
				})
				.catch((e) => {
					return null;
				});
			result = await fetch(url, options)
				.then(checkReponse)
				.then((res) => {
					return res;
				})
				.catch((e) => {
					return null;
				});
			isRefresh = false;
	} else if('refreshToken' in result && 'accessToken' in result) {
		tempRefresh = result.refreshToken;
		tempAccess = result.accessToken;
	}

	if(tempRefresh !== null && tempAccess !== null){
		localStorage.setItem("refreshToken", tempRefresh);
		setCookie("accessToken", tempAccess);
	}
	return result;
}

export async function loginUser(email, password) {
	let postReset = { email: email, password: password };
	return await fetchWithRefresh(`${NORMA_API}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(postReset),
	});
}

export function logoutUser(token) {
	let postReset = { token: token };
	return fetch(`${NORMA_API}/auth/logout`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(postReset),
	});
}

export function getUser(token) {
	return fetchWithRefresh(`${NORMA_API}/auth/user`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: token,
		},
	});
}

export function saveUser(token, email, password, name) {
	let postReset = { email: email, password: password, name: name };
	if(password === ""){
		postReset = { email: email, name: name };
	}
	return fetchWithRefresh(`${NORMA_API}/auth/user`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			authorization: token,
		},
		body: JSON.stringify(postReset),
	});
}


export function setCookie(name, value, props) {
	props = props || {};
	let exp = props.expires;
	if (typeof exp == "number" && exp) {
		const d = new Date();
		d.setTime(d.getTime() + exp * 1200);
		exp = props.expires = d;
	}
	if (exp && exp.toUTCString) {
		props.expires = exp.toUTCString();
	}
	value = encodeURIComponent(value);
	let updatedCookie = name + "=" + value;
	for (const propName in props) {
		updatedCookie += "; " + propName;
		const propValue = props[propName];
		if (propValue !== true) {
			updatedCookie += "=" + propValue;
		}
	}
	document.cookie = updatedCookie;
}

export function getCookie(name) {
	const matches = document.cookie.match(
		new RegExp(
			"(?:^|; )" +
				name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
				"=([^;]*)"
		)
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
	setCookie(name, null, { expires: -1 });
}
