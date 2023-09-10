import { authUser } from "./functions/api.js"
import { setCookie } from "./functions/cookies.js";
import { setError } from "./functions/dom.js";

// authenticate user
const loginForm = document.querySelector('#login-form')

async function handleSubmit(e) {
    e.preventDefault()
    let error = 0
    const data = new FormData(e.currentTarget)
    let body = {}
    data.forEach((value, key) => {
        if (value === '') error++
        body[key] = value
    })

    if (error !== 0) {
        console.log("error : ", error)
        setError('#login-form', 'Erreur dans l’identifiant ou le mot de passe', 'prepend')
        return
    }

    body = JSON.stringify(body)

    // Send request to authenticate user
    try {
        const res = await authUser(body);

        // We save the id and token in cookies (This is not the best methode)
        // It is better to use HttpOnly cookies (but we should do some changes in the backend code)
        setCookie('UID', res.userId)
        setCookie('TOKEN', res.token)

        //Redirect user to home page
        window.location.href = "index.html"
    } catch (e) {
        // If there is an error we can show a login error message
        setError('#login-form', 'Erreur dans l’identifiant ou le mot de passe', 'prepend')
    }
}

loginForm.addEventListener('submit', e => handleSubmit(e))