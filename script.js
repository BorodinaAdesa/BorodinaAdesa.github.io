// ============================================
// НАСТРОЙКИ GOOGLE FORMS
// ============================================

// Ссылка на твою Google Форму.
// В конце обязательно должно быть /formResponse,
// а не /viewform.

const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSeUHxJJX5fsNsIJnk7Ym_zGq-Y9qLGH2JimkrZzgGtfPjmDRA/formResponse";


// ID поля «Ваше предложение»

const FIELD_NAME =
    "entry.387261246";


// ============================================
// ОТКРЫТЬ ОКНО
// ============================================

function openModal() {

    const modal =
        document.getElementById("modal");

    modal.style.display = "flex";
}


// ============================================
// ЗАКРЫТЬ ОКНО
// ============================================

function closeModal() {

    const modal =
        document.getElementById("modal");

    modal.style.display = "none";
}


// ============================================
// ОТПРАВКА ПРЕДЛОЖЕНИЯ
// ============================================

function sendSuggestion() {

    const textarea =
        document.getElementById("suggestion");

    const button =
        document.querySelector(".send-button");


    // Получаем текст

    const text =
        textarea.value.trim();


    // Проверяем, что пользователь что-то написал

    if (text === "") {

        alert(
            "Пожалуйста, напишите ваше предложение."
        );

        return;
    }


    // Ограничение длины

    if (text.length > 2000) {

        alert(
            "Предложение не должно быть длиннее 2000 символов."
        );

        return;
    }


    // Меняем кнопку

    button.disabled = true;

    button.textContent =
        "Отправка...";


    // ========================================
    // СОЗДАЁМ ФОРМУ
    // ========================================

    const form =
        document.createElement("form");


    form.method =
        "POST";


    form.action =
        GOOGLE_FORM_URL;


    form.target =
        "googleFormFrame";


    form.style.display =
        "none";


    // ========================================
    // СОЗДАЁМ ПОЛЕ
    // ========================================

    const input =
        document.createElement("input");


    input.type =
        "hidden";


    input.name =
        FIELD_NAME;


    input.value =
        text;


    form.appendChild(input);


    // Добавляем форму на страницу

    document.body.appendChild(form);


    // ========================================
    // ОТПРАВЛЯЕМ В GOOGLE FORMS
    // ========================================

    form.submit();


    // Удаляем временную форму

    setTimeout(function () {

        form.remove();


        // Очищаем поле

        textarea.value =
            "";


        // Возвращаем кнопку

        button.disabled =
            false;

        button.textContent =
            "Отправить";


        // Закрываем окно

        closeModal();


        // Сообщение пользователю

        alert(
            "Спасибо! Ваше предложение отправлено анонимно."
        );

    }, 1200);
}


// ============================================
// ЗАКРЫТИЕ ОКНА ПРИ КЛИКЕ ВНЕ НЕГО
// ============================================

window.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById("modal");


        if (event.target === modal) {

            closeModal();
        }

    }
);