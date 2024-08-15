import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const formEl = document.querySelector('.form');
const submitBtn = document.querySelector('button');
const delayInput = document.querySelector('input[name="delay"]');
const resolveRadioBtn = document.querySelector('input[value="fulfilled"]');
const rejectRadioBtn = document.querySelector('input[value="rejected"]');

formEl.addEventListener('submit', submitForm);
formEl.addEventListener('change', changeInput);


let delay = 0;
let fulfilledBtnChecked;

function changeInput(ev) {
    if (ev.target === delayInput) {
        delay = delayInput.value;
    } else if (ev.target.value === 'fulfilled') {
        fulfilledBtnChecked = true;
    } else {
        fulfilledBtnChecked = false;
    }
}
    
function submitForm(event) {
    event.preventDefault();
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fulfilledBtnChecked) {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay);
        formEl.reset();
    })

    promise.then(result => {
        iziToast.show({
            message: result,
            backgroundColor: 'green',
            messageColor: 'white',
            position: 'topRight',
            messageSize: '16',
        })
    })
        .catch(info => {
            iziToast.show({
            message: info,
            backgroundColor: 'red',
            messageColor: 'white',
            position: 'topRight',
            messageSize: '16',
        })
        })
}

