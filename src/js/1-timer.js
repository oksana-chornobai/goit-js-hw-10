// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
import { Input } from "postcss";


const input = document.querySelector('.input')
const daysEl = document.querySelector('[data-days]')
const hoursEl = document.querySelector('[data-hours]')
const minutesEl = document.querySelector('[data-minutes]')
const secondsEl = document.querySelector('[data-seconds]')
const btn = document.querySelector('[type="button"]')
let userSelectedDate = null
const options = {

  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      userSelectedDate = selectedDates[0]
      if (userSelectedDate < new Date()) {
                    iziToast.show({
    title: 'Hey',
    message: 'Please choose a date in the future'
});
          
          btn.disabled = true;
          btn.classList.add('disabled')
      } else {
          btn.disabled = false
          btn.classList.remove('disabled')
      }
      
    },
  
};

flatpickr("#datetime-picker", options)
// різниця в мс


btn.addEventListener('click', () => {
    btn.disabled = true
    btn.classList.add('disabled')
    input.disabled = true
    
    const intervalId = setInterval(() => {
        let dif = userSelectedDate - new Date()
        if (dif <= 0) {
            clearInterval(intervalId)
            daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    
    btn.disabled = false
    btn.classList.remove('disabled')
    input.disabled = false
    return;
        }
        const result = convertMs(dif)
        daysEl.textContent = addLeadingZero(result.days)
        hoursEl.textContent = addLeadingZero(result.hours)
        minutesEl.textContent = addLeadingZero(result.minutes)
        secondsEl.textContent = addLeadingZero(result.seconds)
    }, 1000)

})

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}