export default class Api {

    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._token = options.headers.authorization;
        this._contentType = options.headers['Content-Type'];
    }

    _statusCheck(res, str = '') {
        return res.ok
            ? res.json()
            : Promise.reject(`>>>> Ошибка - ${str}: ${res.status}`);
    }

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            method: 'GET',
            headers: {
                authorization: this._token
            }
        })
            .then(res => this._statusCheck(res, 'инфо о пользователе'));
    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            method: 'GET',
            headers: {
                authorization: this._token
            }
        })
            .then(res => this._statusCheck(res, 'предустановленные картинки'));
    }

    editProfile({ name, about }) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': this._contentType
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => this._statusCheck(res, 'изменение профиля'));
    }

    editAvatar({ avatar }) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': this._contentType
            },
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(res => this._statusCheck(res, 'изменение аватара'));
    }

    addNewCard({ name, link }) {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': this._contentType
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => this._statusCheck(res, 'добавление карточки'));
    }

    deleteCard(cardId) {
        return fetch(this._baseUrl + '/cards/' + cardId, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
            .then(res => this._statusCheck(res, 'удаление карточки'));
    }

    addLikeToCard(cardId) {
        return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
            method: 'PUT',
            headers: {
                authorization: this._token,
            }
        })
            .then(res => this._statusCheck(res, 'добавление лайка'));
    }

    deleteLikeToCard(cardId) {
        return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
            .then(res => this._statusCheck(res, 'удаление лайка'));
    }

    changeLikeCardStatus(cardId, status) {
        return status ? this.addLikeToCard(cardId) : this.deleteLikeToCard(cardId);
    }

}