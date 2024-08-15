import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
let dateDays = document.querySelector('[data-days]');
let dateHours = document.querySelector('[data-hours]');
let dateMins = document.querySelector('[data-minutes]');
let dateSeconds = document.querySelector('[data-seconds]');

let userSelectedDate;
let deltaTime;

startBtn.setAttribute('disabled', true);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            if (!startBtn.hasAttribute('disabled')) { startBtn.setAttribute('disabled', true) };
            iziToast.show({
                message: 'Please choose a date in the future',
                backgroundColor: 'red',
                messageColor: 'white',
                position: 'topRight',
                messageSize: '16',
            });
        } else {
            startBtn.removeAttribute('disabled');
            userSelectedDate = selectedDates[0];
        }
    }
}

flatpickr(dateInput, options);
            
startBtn.addEventListener("click", startCountdown);

function startCountdown() {
    startBtn.setAttribute('disabled', true);
    dateInput.setAttribute('disabled', true);
    const timerId = setInterval(() => {
        deltaTime = userSelectedDate.getTime() - Date.now();

        if (deltaTime <= 0) {
            dateInput.removeAttribute('disabled');
            clearInterval(timerId);
        } else {
            let remainingTime = convertMs(deltaTime);
            remainingTimeClock(remainingTime);
        }
    }, 1000) 
}

function remainingTimeClock(time) { 
    dateDays.textContent = addLeadingZero(time.days);
    dateHours.textContent = addLeadingZero(time.hours);
    dateMins.textContent = addLeadingZero(time.minutes);
    dateSeconds.textContent = addLeadingZero(time.seconds);
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

    return {days, hours, minutes, seconds};
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}