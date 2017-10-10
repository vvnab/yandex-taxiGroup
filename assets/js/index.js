// import "../css/flexboxgrid.scss";
import "../css/main.scss";
import "./imask.js";
import "whatwg-fetch";

var phoneMask = new IMask(
    document.getElementById('phone'), {
        mask: '+{7} (000) 000-00-00'
    });

let sended = false;

let sendEmail = () => {
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
        // to: "taxi-099@mail.ru",
        to: "vvnab@mail.ru",
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
    fetch("https://api-driver.taxi21.ru/utils/mail?mail-access-key=123456", {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
        .then(result => document.getElementById("overlay").classList.add("show"))
        .catch(error => console.error(error));
}

document.getElementById("sendEmail").addEventListener("click", sendEmail, false);