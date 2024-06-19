function isNotEmpty(value, fieldName) {
    if (value === null || value.trim() === "") {
        return fieldName + " không được để trống ";
    }
    return "";
}

function checkAccount(account, errorElement) {
    let isValid = true,
        errMes = isNotEmpty(account, "Tài khoản");
    if (account.length < 4 || account.length > 6 || !/^\d+$/.test(account) || isNaN(account)) {
        if (errMes != "") {
            errMes += "và "
        } else {
            errMes = "Tài khoản "
        }
        errMes += "phải là 4-6 ký tự số.";
        isValid = false;
    }
    if (!isValid) {
        errorElement.style.display = "block";
    } else {
        errorElement.style.display = "none";
    }
    errorElement.textContent = errMes;
    return isValid;
}

function checkName(name, errorElement) {
    let isValid = true,
        errMes = isNotEmpty(name, "Tên nhân viên");
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        if (errMes != "") {
            errMes += "và "
        } else {
            errMes = "Tên nhân viên "
        }
        errMes += "phải là chữ.";
        isValid = false;
    }
    if (!isValid) {
        errorElement.style.display = "block";
    } else {
        errorElement.style.display = "none";
    }
    errorElement.textContent = errMes;
    return isValid;
}

function checkEmail(email, errorElement) {
    let isValid = true,
        errMes = isNotEmpty(email, "Email");
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        if (errMes != "") {
            errMes += "và "
        } else {
            errMes = "Email "
        }
        errMes += "không đúng định dạng.";
        isValid = false;
    }
    if (!isValid) {
        errorElement.style.display = "block";
    } else {
        errorElement.style.display = "none";
    }
    errorElement.textContent = errMes;
    return isValid;
}

function checkPassword(password, errorElement) {
    let isValid = true,
        errMes = isNotEmpty(password, "Mật khẩu");
    let passwordPattern = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,10}$/;
    if (!passwordPattern.test(password)) {
        if (errMes != "") {
            errMes += "và "
        } else {
            errMes = "Mật khẩu "
        }
        errMes += "phải từ 6-10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt.";
        isValid = false;
    }
    if (!isValid) {
        errorElement.style.display = "block";
    } else {
        errorElement.style.display = "none";
    }
    errorElement.textContent = errMes;
    return isValid;
}

function checkDate(date, errorElement) {
    let isValid = true,
        errMes = isNotEmpty(date, "Ngày làm");
    let datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!datePattern.test(date)) {
        if (errMes != "") {
            errMes += "và "
        } else {
            errMes = "Ngày làm "
        }
        errMes += "không đúng định dạng (mm/dd/yyyy).";
        isValid = false;
    }
    if (!isValid) {
        errorElement.style.display = "block";
    } else {
        errorElement.style.display = "none";
    }
    errorElement.textContent = errMes;
    return isValid;
}

function checkSalary(salary, errorElement) {
    let isValid = true,
        errMes = isNotEmpty(salary, "Lương cơ bản");
    if (salary < 1000000 || salary > 20000000 || isNaN(salary)) {
        if (errMes != "") {
            errMes += "và "
        } else {
            errMes = "Lương cơ bản "
        }
        errMes += "phải từ 1.000.000 đến 20.000.000.";
        isValid = false;
    }
    if (!isValid) {
        errorElement.style.display = "block";
    } else {
        errorElement.style.display = "none";
    }
    errorElement.textContent = errMes;
    return isValid;
}

function checkPosition(position, errorElement) {
    let isValid = true;
    if (!["Giám đốc", "Trưởng phòng", "Nhân viên"].includes(position)) {
        errorElement.textContent = "Chức vụ phải được chọn là Giám đốc, Trưởng Phòng hoặc Nhân Viên.";
        isValid = false;
    }
    if (!isValid) {
        errorElement.style.display = "block";
    } else {
        errorElement.style.display = "none";
    }
    return isValid;
}

function checkHours(hours, errorElement) {
    let isValid = true,
        errMes = isNotEmpty(hours, "Số giờ làm trong tháng");
    if (hours < 80 || hours > 200 || isNaN(hours)) {
        if (errMes != "") {
            errMes += "và "
        } else {
            errMes = "Số giờ làm trong tháng "
        }
        errMes += "phải từ 80 đến 200 giờ.";
        isValid = false;
    }
    if (!isValid) {
        errorElement.style.display = "block";
    } else {
        errorElement.style.display = "none";
    }
    errorElement.textContent = errMes;
    return isValid;
}