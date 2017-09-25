import "../css/flexboxgrid.scss";
import "../css/main.scss";
// import "https://use.fontawesome.com/63207561e3.js";
import "./imask.js";

var phoneMask = new IMask(
    document.getElementById('phone'), {
        mask: '+{7} (000) 000-00-00'
    });


window.postAjax = (url, data, success) => {
    const params = JSON.stringify(data);
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState > 3 && xhr.status == 200) {
            success(xhr.responseText);
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(params);
    return xhr;
}

let sended = false;

window.sendEmail = () => {
    const data = {
        town: document.getElementById("town").value,
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        auto: document.getElementById("auto").value,
        year: document.getElementById("year").value
    };

    let validator = {
        town: data.town != "",
        name: data.name != "",
        // phone: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}$/.test(data.phone)
        phone: data.phone && data.phone.length > 11
    };

    let valid = true;

    for (let i in validator) {
        if (!validator[i]) {
            document.getElementById(`${i}-error`).classList.add("error");
            valid = false;
        } else {
            document.getElementById(`${i}-error`).classList.remove("error");
        }
    }

    if (!valid) return;

    let message = {
        from: "job@yandex.ru",
        to: "taxi-099@mail.ru",
        subject: `Яндекс.Такси ${data.town}`,
        text: `
Город: ${data.town}
Имя: ${data.name}
Телефон: ${data.phone}
Автомобиль: ${data.auto}
Год выпуска: ${data.year}
        `
    }
    if (sended) {
        console.log("sended true");
        return;
    } else {
        sended = true;
        setTimeout(() => {
            sended = false
        }, 5000);
    }
    postAjax("https://api-driver.taxi21.ru/utils/mail?mail-access-key=123456", message, result => {
        document.getElementById("overlay").classList.add("show");
    });
}