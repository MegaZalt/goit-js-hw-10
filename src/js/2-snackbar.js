document.querySelector('#promiseForm').addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const delay = parseInt(form.delay.value);
    const state = form.state.value;

    createPromise(delay, state)
    .then((message) => {
        showNotification(message, "success");
    })
    .cathc((error) => {
        showNotification(error, "error");
    });
});

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(`Promise fulfilled after ${delay}ms`);
            } else {
                reject(`Promise rejected after ${delay}ms`);
            }
        })
    })
}