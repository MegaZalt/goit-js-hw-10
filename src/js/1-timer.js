
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const dateTimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysValue = document.querySelector("[data-days]");
const hoursValue = document.querySelector("[data-hours]");
const minutesValue = document.querySelector("[data-minutes]");
const secondsValue = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let timerId = null;

startButton.disabled = true;

flatpickr("#datetime-picker", {
  enableTime: true,            
  dateFormat: "Y-m-d H:i",     
  minDate: "today",            
  time_24hr: true,             
  defaultDate: new Date(),     
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if(userSelectedDate < new Date()) {
      window.alert("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  }          
});

function startCountdown() {
  timerId = setInterval(() => {
    const currenTime = new Date();
    const timeRemaining = userSelectedDate - currenTime;

    if (timeRemaining <= 0) {
      clearInterval(timerId);
      updateTimerInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const time = convertMs(timeRemaining);
    updateTimerInterface(time);
  }, 1000);
}

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  startCountdown();
});

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

  function updateTimerInterface({ days, hours, minutes, seconds }) {
    daysValue.textContent = String(days).padStart(2, '0');
    hoursValue.textContent = String(hours).padStart(2, '0');
    minutesValue.textContent = String(minutes).padStart(2, '0');
    secondsValue.textContent = String(seconds).padStart(2, '0');

  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
  