import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.form').addEventListener("submit", (event) => {
        event.preventDefault();
    
        const form = event.currentTarget;
        const delay = parseInt(form.delay.value);
        const state = form.state.value;
    
        createPromise(delay, state)
        .then((delay) => {
            showNotification(`✅ Fulfilled promise in ${delay}ms`, "success");
            console.log(`✅ Fulfilled promise in ${delay}ms`);
        })
        .catch((delay) => {
            showNotification(`❌ Rejected promise in ${delay}ms`, "error");
            console.log(`❌ Rejected promise in ${delay}ms`)
        });
    });
    
});

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
}

function showNotification(message, type) {
    if(type === "success") {
        iziToast.success({
            title: "Success",
            message: message,
            position: 'topRight',
        });
    } else if(type === "error") {
        iziToast.error({
            title: "Error",
            message: message,
            position: 'topRight',
        });
    }
}

function showTextFcton (message, type) {
    const notificationDiv = document.getElementById("notification");
    notificationDiv.textContent = message;
    notificationDiv.className = type;
}