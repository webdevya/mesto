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

  updateData(localUrl, dataObj, restPart) {
    return fetch(this._getUrl(localUrl, restPart), {
      method: 'PATCH',
      headers: this._headers,
      body: dataObj ? JSON.stringify(dataObj) : null
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

  deleteData(localUrl, restPart) {
    return fetch(this._getUrl(localUrl, restPart), {
      method: 'DELETE',
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

  putData(localUrl, dataObj, restPart) {
    return fetch(this._getUrl(localUrl, restPart), {
      method: 'PUT',
      headers: this._headers,
      body: dataObj ? JSON.stringify(dataObj) : null
    }).then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис с кодом для дальнейшей его обработки
      return Promise.reject(res.status);
    });
  }

  _getUrl(localUrl, restPart) {
    if (restPart)
      return `${this._baseUrl}${localUrl}/${restPart}`;
    return this._baseUrl + localUrl;
  }
}


