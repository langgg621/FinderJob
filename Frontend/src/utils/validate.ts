export const validateEmail = (email:string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!regex.test(email)) {
        return true
      }
}

export const validatePhone = (phone:string) => {
    if (phone.length !== 10) {
        return true
    }
}

export const validatePassword = (password:string) => {
    if (password.length < 6) {
        return true
    }
}