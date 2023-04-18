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

  updateData(localUrl, dataObj) {
    return fetch(this._getUrl(localUrl), {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(dataObj)
    }).then(res => {
      if (res.ok) {
        return Promise.resolve(dataObj);
      }

      // если ошибка, отклоняем промис с кодом для дальнейшей его обработки
      return Promise.reject(res.status);
    });
  }

  addData(localUrl, dataObj) {
    return fetch(this._getUrl(localUrl), {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(dataObj)
    }).then(res => {
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


