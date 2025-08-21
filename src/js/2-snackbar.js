// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const fieldset = document.querySelector('fieldset')
const valueDelay = document.querySelector('[name="delay"]')
const form = document.querySelector('.form')
const radioBtns = document.querySelectorAll('[name="state"]')
let selectedValue = null


fieldset.addEventListener('change', (e) => {
    if (e.target.name === 'state' && e.target.checked) {
        selectedValue = e.target.value;
        console.log('оновлено:', selectedValue);
    }
});


const makePromise = ({delay, selectedValue}) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (selectedValue === 'fulfilled') {
                resolve(`✅ Fulfilled promise in ${delay}ms`)
            } else {
                reject(`❌ Rejected promise in ${delay}ms`)
            }
        }, delay)
    })

}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const delay = Number(valueDelay.value)
    
    makePromise({ delay, selectedValue })

    .then(value => iziToast.show({ message: (value)}))
	.catch(error => iziToast.show({ message: (error)}))
})