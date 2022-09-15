let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let inputUserName = popup.querySelector('.popup__input_type_name');
let inputUserProfession = popup.querySelector('.popup__input_type_profession');
let popupCloseButton = popup.querySelector('.popup__close-button');

let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileProfession = profile.querySelector('.profile__profession');

function togglePopup () {
    popup.classList.toggle('popup_opened'); 
    inputUserName.value = profileName.textContent;
    inputUserProfession.value = profileProfession.textContent;
}


function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = inputUserName.value;
    profileProfession.textContent = inputUserProfession.value;
    togglePopup();
}

popupForm.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);
