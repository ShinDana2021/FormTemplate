var username = document.querySelector('#username')
var email = document.querySelector('#email')
var password = document.querySelector('#password')
var cfpassword = document.querySelector('#cfpassword')
var form = document.querySelector('form')

function showError(input,message) {
    let parent = input.parentElement
    let messageError = parent.querySelector('.form-message')
    messageError.innerText = message
    input.classList.add('error')
    messageError.classList.add('error')
    messageError.classList.remove('success')
}

function showSuccess(input, message) {
    let parent = input.parentElement
    let messageError = parent.querySelector('.form-message')
    messageError.innerText = message
    input.classList.remove('error')
    messageError.classList.remove('error')
    messageError.classList.add('success')
}

function checkEmty(Listinput) {
    let isEmty = false
    Listinput.forEach(input => {
        let value = input.value.trim()
        if (value) {
            isEmty = true
            showSuccess(input,'Hợp lệ ^^')
        } else {
            isEmty = false
            showError(input,'Bạn chưa nhập thông tin vào')
        }
    })
    return isEmty
}

function checkGmail(input) {
    let regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    condition = regex.test(input.value)
    if(condition) {
        showSuccess(input,'Email hợp lệ ^^')
        return true
    } else {
        showError(input, 'Email không hợp lệ')
        return false
    }
}

function checkLenghtUsername(input,min,max) {
    let lengthUsername = input.value.length
    if (lengthUsername < min) {
        showError(input,`Username phải ít nhất ${min} ký tự`)
    } else if(lengthUsername > max) {
        showError(input,`Username không được quá ${max} ký tự`)
    } else {
        return true
    }
    
}

function checkLenghtEmailPassword(input,min) {
    let lengthUsername = input.value.length
    if (lengthUsername < min) {
        showError(input,`Password phải ít nhất ${min} ký tự`)
    }  else {
        return true
    }
}

function checkGmailAgain(input,inputNeedCheked) {
    let password = input.value
    let passwordAgain = inputNeedCheked.value
    if (password == passwordAgain) {
        return
    } else {
        showError(input,'Password trùng khớp')
        showError(inputNeedCheked,'Password trùng khớp')
    }
}

function oninput(Listinput) {
    Listinput.forEach(input=> {
        input.oninput = function() {
            if (input.value) {
                let parent = input.parentElement
                let messageError = parent.querySelector('.form-message') 
                messageError.innerText = ''
                input.classList.remove('error')
                messageError.classList.remove('error')
            }
        }
    })
}

form.addEventListener('submit', e => {
    e.preventDefault()
    let isEmty =  checkEmty([username,email,password,cfpassword])
    if (email.value) {
        let isEmail = checkGmail(email)
    }  
    if (username.value) {
        let isLengthUsername = checkLenghtUsername(username,3,15)
    } 
    
    if (password.value) {
        let lenghtEmailPassword = checkLenghtEmailPassword(password,8)
        if(cfpassword.value) {
            let lenghtEmailcfPassword = checkLenghtEmailPassword(cfpassword,8)
            if(lenghtEmailPassword && lenghtEmailcfPassword) {
                let isEmailMatch = checkGmailAgain(password,cfpassword)
            }
        }
    }

    if(cfpassword.value) {
        let lenghtEmailcfPassword = checkLenghtEmailPassword(cfpassword,8)
    }
    oninput([username,email,password,cfpassword])
})