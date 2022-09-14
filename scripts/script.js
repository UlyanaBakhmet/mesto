let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let inputUserName = popup.querySelector('.popup__input_type_name');
let inputUserProfession = popup.querySelector('.popup__input_type_profession');
let popupCloseButton = popup.querySelector('.popup__closeButton');

let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__editButton');
let profileName = profile.querySelector('.profile__name');
let profileProfession = profile.querySelector('.profile__profession');

const togglePopup = () => {
    popup.classList.toggle('popup_opened');
    if (popup.classList.contains('popup_opened') === true) {
    inputUserName.value = profileName.textContent;
    inputUserProfession.value = profileProfession.textContent;
    }
}


let formSubmitHandler = event => {
    event.preventDefault();
    profileName.textContent = inputUserName.value;
    profileProfession.textContent = inputUserProfession.value;
    togglePopup();
}

popupForm.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);
