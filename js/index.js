
let arrNhanVien = [];

//5. phương thức tính tổng lương cho đối tượng nhân viên
tinhTongLuong = function (chucVu, luongCB) {
    switch (chucVu) {

        case 'Giám đốc':
            return luongCB * 3

        case 'Trưởng phòng':
            return luongCB * 2

        default:
            return luongCB
    }
    return luongCB
}

//6. phương thức xếp loại nhân viên
xepLoaiNhanVien = function (gioLam) {
    if (gioLam >= 192) {
        return "nhân viên xuất sắc"
    } else if (gioLam >= 176) {
        return "nhân viên giỏi"
    } else if (gioLam >= 160) {
        return "nhân viên khá"
    } else {
        return "nhân viên trung bình"
    }
}

// Chức năng lấy dữ liệu từ form
function getValueForm() {
    let arrField = document.querySelectorAll("#formQLNV input,#formQLNV select");
    let nhanVien = new NhanVien();
    let isValid = true;
    let spanAnounce;
    for (let field of arrField) {
        let { value, id } = field;
        nhanVien[id] = value;

        // xử lí gọi tới thẻ cha đang chứa thẻ input
        switch (field.getAttribute("data-validation")) {

            case "tknv":
                spanAnounce = document.getElementById("tbTKNV");
                isValid &= checkAccount(value, spanAnounce);
                break
            case "name":
                spanAnounce = document.getElementById("tbTen");
                isValid &= checkName(value, spanAnounce);
                break
            case "email":
                spanAnounce = document.getElementById("tbEmail");
                isValid &= checkEmail(value, spanAnounce);
                break
            case "password":
                spanAnounce = document.getElementById("tbMatKhau");
                isValid &= checkPassword(value, spanAnounce);
                break
            case "daypicket":
                spanAnounce = document.getElementById("tbNgay");
                isValid &= checkDate(value, spanAnounce);
                break
            case "luongCB":
                spanAnounce = document.getElementById("tbLuongCB");
                isValid &= checkSalary(value, tbLuongCB);
                break
            case "chucvu":
                spanAnounce = document.getElementById("tbChucVu");
                isValid &= checkPosition(value, spanAnounce);
                nhanVien["tongLuong"] = tinhTongLuong(value, nhanVien["luongCB"]);

                break
            case "gioLam":
                spanAnounce = document.getElementById("tbGiolam");
                isValid &= checkHours(value, spanAnounce);
                nhanVien["loaiNhanVien"] = xepLoaiNhanVien(value);
                break
        }
    }
    // kiểm tra xem có nên trả về nhanVien
    if (isValid) {
        $('#myModal').modal('hide');
        return nhanVien;
    }
}

document.getElementById("formQLNV").onsubmit = function (event) {
    event.preventDefault();
    let nhanVien = getValueForm();
    if (!nhanVien) {
        return;
    }
    arrNhanVien.push(nhanVien);
    console.log(arrNhanVien)
    renderSaveReset();
    // document.getElementById("myModal").style.display = "none";
};
function renderDanhSachNhanVien(arr = arrNhanVien) {
    let content = "";
    arr.forEach((item, index) => {
        let nhanVien = new NhanVien();
        Object.assign(nhanVien, item);
        let { tknv, name, email, datepicker, chucvu, tongLuong, loaiNhanVien } = nhanVien;
        content += `
      <tr>
        <td>${tknv}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${datepicker}</td>
        <td>${chucvu}</td>
        <td>${tongLuong}</td>
        <td>${loaiNhanVien}</td>
        <td>
          <button onclick="deleteNhanVien('${tknv}')"  class="btn btn-danger">Xoá</button>
          <button onclick="getInfoNhanVien('${tknv}')" class="btn btn-warning" data-toggle="modal" data-target="#myModal">Sửa</button>
        </td>
      </tr>
    `;
    });
    document.getElementById("tableDanhSach").innerHTML = content;
}
function saveLocalStorage(key = "arrNhanVien", value = arrNhanVien) {
    let stringJson = JSON.stringify(value);
    localStorage.setItem(key, stringJson);
}

// Chức năng lấy dữ liệu từ localStorage
function getLocalStorage(key = "arrNhanVien") {
    let dataLocal = localStorage.getItem(key);
    if (dataLocal) {
        // chuyển đổi từ chuỗi JSON về object
        let revertData = JSON.parse(dataLocal);
        arrNhanVien = revertData;
        // gọi hàm render để hiển thị dữ liệu
        renderDanhSachNhanVien();
    }
}
getLocalStorage();


// Chức năng cập nhật
function updateNhanVien() {
    // Lấy dữ liệu từ form
    let nhanVien = getValueForm();
    if (!nhanVien) {
        return;
    }
    console.log(nhanVien);
    // tìm kiếm tới vị trí của dữ liệu cũ và thay thế
    let index = arrNhanVien.findIndex((item, index) => {
        return item.tknv == nhanVien.tknv;
    });
    if (index != -1) {
        arrNhanVien[index] = nhanVien;
        renderSaveReset();
    }
    document.getElementById("tknv").readOnly = false;
    document.getElementById("btnThemNV").disabled = false;
}
document.getElementById("btnCapNhat").onclick = updateNhanVien;

// chức năng tìm kiếm
function searchNhanVien(event) {
    let newKeyWord = toNonAccentVietnamese(
        event.target.value.toLowerCase().trim()
    );
    let arrSearchNhanVien = arrNhanVien.filter((item, index) => {
        let newLoaiNhanVien = toNonAccentVietnamese(
            item.loaiNhanVien.toLowerCase().trim()
        );
        return newLoaiNhanVien.includes(newKeyWord);
    });
    document.getElementById("tableDanhSach").innerHTML = "";
    renderDanhSachNhanVien(arrSearchNhanVien);
}
document.getElementById("searchName").oninput = searchNhanVien;


// Chức năng cập nhật
function getInfoNhanVien(tknv) {
    console.log(tknv);
    let nhanVien = arrNhanVien.find((item, index) => {
        return item.tknv == tknv;
    });
    if (nhanVien) {
        let arrField = document.querySelectorAll(
            "#formQLNV input,#formQLNV select"
        );
        for (let field of arrField) {
            let id = field.id;
            field.value = nhanVien[id];
        }

        document.getElementById("tknv").readOnly = true;
        document.getElementById("btnThemNV").disabled = true;
    }
}


// Chức năng xoá
function deleteNhanVien(tknv) {
    let index = arrNhanVien.findIndex((item, index) => item.tknv == tknv);
    if (index != -1) {
        arrNhanVien.splice(index, 1);
        // hiển thị dữ liệu mới lên giao diện
        renderDanhSachNhanVien();
        saveLocalStorage();
    }
}

function renderSaveReset() {
    renderDanhSachNhanVien();
    saveLocalStorage();
    // xử lí reset form
    document.getElementById("formQLNV").reset();
}


document.getElementById("btnDong").onclick = () => {
    document.getElementById("tknv").readOnly = false;
    document.getElementById("btnThemNV").disabled = false;
    document.getElementById("formQLNV").reset();
};
