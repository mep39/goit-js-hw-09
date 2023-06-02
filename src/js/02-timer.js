// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const timerInput = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');

const showDays = document.querySelector('[data-days]');
const showHours = document.querySelector('[data-hours]');
const showMinutes = document.querySelector('[data-minutes]');
const showSeconds = document.querySelector('[data-seconds]');

button.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        console.log(selectedDates[0]);

        const getselectedDate = selectedDates[0];
        if (getselectedDate < new Date()) {
            window.alert("Please choose a date in the future");
            button.disabled = true;
        } else {
            button.onclick = () => {
                dateCount(getselectedDate);
            };
            button.disabled = false;
        };
    }
}
flatpickr(timerInput, options);

function dateCount(getselectedDate) {

    const dateCountInterval = setInterval(() => {

        const datedifference = getselectedDate.getTime() - new Date().getTime();

        if (datedifference <= 0) {
            clearInterval(dateCountInterval);
        } else {
            const days = Math.floor(datedifference / (1000 * 60 * 60 * 24));            
            const hours = Math.floor((datedifference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((datedifference / 1000 / 60) % 60);
            const seconds = Math.floor((datedifference / 1000) % 60);

            showDays.textContent = `${days}`.padStart(2, '0');
            showHours.textContent = `${hours}`.padStart(2, '0');
            showMinutes.textContent = `${minutes}`.padStart(2, '0');
            showSeconds.textContent = `${seconds}`.padStart(2, '0');

            return { days, hours, minutes, seconds };
        }
    }, 1000)
    
}