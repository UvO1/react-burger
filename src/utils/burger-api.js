
const NORMA_API = "https://norma.nomoreparties.space/api";

function getIngredients() {
    return fetch(`${NORMA_API}/ingredients`)
 }

 export default getIngredients;