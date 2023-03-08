const NORMA_API = "https://norma.nomoreparties.space/api";

  type TPostArg = {
	email: string;
	password?: string; 
	name?: string;
	token?: string;
};

export function getIngredients(): Promise<Response>  {
	return fetch(`${NORMA_API}/ingredients`);
}


export function getOrder(tempList: Array<string>): Promise<Response> {
	let tempOrder:{ingredients: Array<string>} = { ingredients: tempList };
	return fetch(`${NORMA_API}/orders`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(tempOrder),
	});
}

export function checkReponse <T>(res: Response): Promise<T> {
	return res.ok
		? res.json()
		: res.json().then((err) => {
				Promise.reject(err);
		  });
};

export async function resetPassword(email: string): Promise<Response>  {
	let postReset = { email: email };
	return await fetch(`${NORMA_API}/password-reset`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(postReset),
	});
}

export async function saveNewPassword(password: string, token: string): Promise<Response>  {
	let postReset = { password: password, token: token };
	return await fetch(`${NORMA_API}/password-reset/reset`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(postReset),
	});
}

export async function createUser(email: string, password: string, name: string): Promise<Response>  {
	let postReset = { email: email, password: password, name: name };
	return await fetch(`${NORMA_API}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(postReset),
	});
}
  
export async function refreshToken(): Promise<Response> {
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

export async function fetchWithRefresh (url: string, options: RequestInit): Promise<Response> {
	let tempRefresh: string = "";
	let tempAccess: string = "";
	let isRefresh: boolean = false;
	let result = await fetch(url, options)
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
				.then((newToken: any) => {
					tempRefresh = newToken.refreshToken;
					tempAccess = newToken.accessToken;
					if(options.headers){
						if('authorization' in options.headers){
							options.headers.authorization = tempAccess;
						}
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

	if(tempRefresh !== null && tempAccess !== null && tempRefresh !== "" && tempAccess !== ""){
		localStorage.setItem("refreshToken", tempRefresh);
		setCookie("accessToken", tempAccess, {expires: 1200});
	}
	return result;
}

export async function loginUser(email: string, password: string): Promise<Response>  {
	let postReset = { email: email, password: password };
	return await fetchWithRefresh(`${NORMA_API}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(postReset),
	});
}

export function logoutUser(token: string | null): Promise<Response>  {
	let postReset = { token: token };
	return fetch(`${NORMA_API}/auth/logout`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(postReset),
	});
}

export function getUser(token: string): Promise<Response>  {
	return fetchWithRefresh(`${NORMA_API}/auth/user`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: token,
		},
	});
}



export function saveUser(token: string, email: string, password: string, name: string): Promise<Response>  {
	let postReset: TPostArg = { email: email, password: password, name: name };
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


export function setCookie(name: string, value: string | null, props: any): null {
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
	if(value){			
		value = encodeURIComponent(value);
	}
	else value = "";
	let updatedCookie = name + "=" + value;
	for (const propName in props) {
		updatedCookie += "; " + propName;
		const propValue = props[propName];
		if (propValue !== true) {
			updatedCookie += "=" + propValue;
		}
	}
	document.cookie = updatedCookie;
	return null;
}

export function getCookie(name: string) {

	const matches = document.cookie.match(
		new RegExp(
			"(?:^|; )" +
				name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
				"=([^;]*)"
		)
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string): null {
	setCookie(name, null, { expires: -1 });
	return null;
}
