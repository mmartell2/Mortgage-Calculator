
//taking control of input fields and radio buttons
const MortgageAmountInput = document.querySelector('.m-amount-input')
const MortgageTermInput = document.querySelector('#m-term')
const MortgageRateInput = document.querySelector('#i-rate')
const repaymentRb = document.querySelector('#repayment')
const interestRb = document.querySelector('#interest')
const formatter = new Intl.NumberFormat('en-US')

//event listeners to change the styling of the input container when focused
MortgageAmountInput.addEventListener('focus', function() {
    document.querySelector('.money-p').style.backgroundColor = '#d7da2f'
    document.querySelector('.input-container').style.borderColor = '#d7da2f'
    document.querySelector('.money-p').style.color = 'hsl(202, 55%, 16%)'
})

MortgageAmountInput.addEventListener('blur', function() {
    document.querySelector('.money-p').style.backgroundColor = 'hsl(202, 86%, 94%)'
    document.querySelector('.input-container').style.borderColor = 'hsl(200, 24%, 40%)'
})

MortgageTermInput.addEventListener('focus', function() {
    document.querySelector('.year-p').style.backgroundColor = '#d7da2f'
    document.querySelector('.term-input-container').style.borderColor = '#d7da2f'
    document.querySelector('.year-p').style.color = 'hsl(202, 55%, 16%)'
})

MortgageTermInput.addEventListener('blur', function() {
    document.querySelector('.year-p').style.backgroundColor = 'hsl(202, 86%, 94%)'
    document.querySelector('.term-input-container').style.borderColor = 'hsl(200, 24%, 40%)'
})

MortgageRateInput.addEventListener('focus', function() {
    document.querySelector('.m-rate').style.backgroundColor = '#d7da2f'
    document.querySelector('.rate-input-container').style.borderColor = '#d7da2f'
    document.querySelector('.m-rate').style.color = 'hsl(202, 55%, 16%)'
})

MortgageRateInput.addEventListener('blur', function() {
    document.querySelector('.m-rate').style.backgroundColor = 'hsl(202, 86%, 94%)'
    document.querySelector('.rate-input-container').style.borderColor = 'hsl(200, 24%, 40%)'
})

const form = document.querySelector('.form')
//prevent default on form element
form.addEventListener('submit', function(e) {
    e.preventDefault()
})

//radio button styling on change 
repaymentRb.addEventListener('change', function() {
    document.querySelector('.r-rbtn').style.backgroundColor = 'hsl(63, 100%, 84%)'
    document.querySelector('.i-rbtn').style.backgroundColor = 'hsl(0, 0%, 100%)'
})

interestRb.addEventListener('change', function() {
    document.querySelector('.i-rbtn').style.backgroundColor = 'hsl(63, 100%, 84%)'
    document.querySelector('.r-rbtn').style.backgroundColor = 'hsl(0, 0%, 100%)'
})

//calculations

//calculate btn event listener

const calculateBtn = document.querySelector('.repayment-btn')

calculateBtn.addEventListener('click', function() {
    //error handling
    if(
       MortgageAmountInput.value &&
       MortgageRateInput.value &&
       MortgageTermInput.value &&
       (interestRb.checked || repaymentRb.checked) 
    ){
        renderCalculations()
        clearErrorMsgs()
    } else {
        errorHandling()
        console.log('fill out all of the fields')
    }

    
})

//calc render function
function renderCalculations() {
    document.querySelector('.empty-results').style.display = 'none'
    document.querySelector('.completed-results').style.display = 'block'

    const P = MortgageAmountInput.value 
    const I = MortgageRateInput.value / 100 / 12
    const N = MortgageTermInput.value * 12

    if(repaymentRb.checked){
        document.querySelector('.monthly-repayments').textContent = `$${monthlyPayment(P, I, N)}`
        document.querySelector('.total-payment').textContent = `$${totalPayment(P, I, N)}`
    } else if(interestRb.checked){
        document.querySelector('.monthly-repayments').textContent = `$${monthlyInterest(P, I, N)}`
        document.querySelector('.total-payment').textContent = `$${totalInterest(P, I, N)}`
    }


    console.log(totalPayment(monthlyPayment(P, I, N), N))
    return console.log('calculation successful')
}

//error handling funtion
function errorHandling() {
    if(MortgageAmountInput.value === ''){
        document.querySelector('.money-p').style.backgroundColor = 'hsl(4, 69%, 50%)'
        document.querySelector('.money-p').style.color = 'hsl(0, 0%, 100%)'
        document.querySelector('.input-container').style.borderColor = 'hsl(4, 69%, 50%)'
        document.querySelector('.ma-error').style.display = 'block'
    } else {
        document.querySelector('.ma-error').style.display = 'none'
    }

    if(MortgageTermInput.value === ''){
        document.querySelector('.year-p').style.backgroundColor = 'hsl(4, 69%, 50%)'
        document.querySelector('.year-p').style.color = 'hsl(0, 0%, 100%)'
        document.querySelector('.term-input-container').style.borderColor = 'hsl(4, 69%, 50%)'
        document.querySelector('.mt-error').style.display = 'block'
    } else {
        document.querySelector('.mt-error').style.display = 'none'
    }

    if(MortgageRateInput.value === ''){
        document.querySelector('.m-rate').style.backgroundColor = 'hsl(4, 69%, 50%)'
        document.querySelector('.m-rate').style.color = 'hsl(0, 0%, 100%)'
        document.querySelector('.rate-input-container').style.borderColor = 'hsl(4, 69%, 50%)'
        document.querySelector('.ir-error').style.display = 'block'
    } else {
        document.querySelector('.ir-error').style.display = 'none'
    }

    if(!interestRb.checked && !repaymentRb.checked){
        document.querySelector('.rb-error').style.display = 'block'
    } else {
        document.querySelector('.rb-error').style.display = 'none'
    }
}

function clearErrorMsgs(){
    document.querySelector('.ma-error').style.display = 'none'
    document.querySelector('.mt-error').style.display = 'none'
    document.querySelector('.ir-error').style.display = 'none'
    document.querySelector('.rb-error').style.display = 'none'
}

//formula M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]

function monthlyPayment(p, i, n){
    return formatter.format((p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)).toFixed(2))
}

function totalPayment(p, i, n){
    return formatter.format(((p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)) * n).toFixed(2))
}

function monthlyInterest(p, i, n){
    return formatter.format(((p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)) - (p/n)).toFixed(2))
}

function totalInterest(p, i, n){
    return formatter.format((((p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)) * n) - p).toFixed(2))
}