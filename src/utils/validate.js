export const validateData = (email,password,name) => {
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]{8,}$/.test(password);
    const isNameValid = /^[a-zA-Z\s]{2,}$/i.test(name);

    if (!isNameValid) {
        return "Name is not valid";
    }

    if (!isEmailValid) {
        return "Email is not valid";
    }
    if (!isPasswordValid) {
        return "Password is not valid";
    }
    return null;

}