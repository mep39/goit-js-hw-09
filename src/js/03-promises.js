const submit = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    resolve({ position, delay });
  } else {
    // Reject
    reject({ position, delay });
  }
}, delay);
});
}

function handlerSubmit(event) {
  event.preventDefault();

  const inputAmount = document.querySelector('.promis-amount');
  const inputAmountValue = parseInt(inputAmount.value);

  const inputDelay = document.querySelector('.promis-delay');
  const inputDelayValue = parseInt(inputDelay.value);

  const inputStep = document.querySelector('.promis-step');
  const inputStepValue = parseInt(inputStep.value);

  if (isNaN(inputAmountValue) || isNaN(inputDelayValue) || isNaN(inputStepValue)) {
    alert('Please enter a valid number')
    return
  }
  let currentDelay = inputDelayValue;
  for (let i = 0; i < inputAmountValue; i++) {
    const currentPosition = i + 1;
    

    createPromise(currentPosition, currentDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    
    currentDelay += inputStepValue;
  }
}

submit.addEventListener('submit', handlerSubmit);