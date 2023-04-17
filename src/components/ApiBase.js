export default class ApiBase {
  constructor({ baseUrl,
    headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getDataJson(localUrl) {
    return fetch(this._getUrl(localUrl), {
      method: 'GET',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис с кодом для дальнейшей его обработки
        return Promise.reject(res.status);
      });
  }

  _getUrl(localUrl) {
    return this._baseUrl + localUrl;
  }
}
