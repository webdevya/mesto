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
    }).then(res => this._getResponseData(res));
  }

  updateData(localUrl, dataObj, restPart) {
    return fetch(this._getUrl(localUrl, restPart), {
      method: 'PATCH',
      headers: this._headers,
      body: dataObj ? JSON.stringify(dataObj) : null
    }).then(res => this._getResponseData(res));
  }

  addData(localUrl, dataObj) {
    return fetch(this._getUrl(localUrl), {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(dataObj)
    }).then(res => this._getResponseData(res));
  }

  deleteData(localUrl, restPart) {
    return fetch(this._getUrl(localUrl, restPart), {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  putData(localUrl, dataObj, restPart) {
    return fetch(this._getUrl(localUrl, restPart), {
      method: 'PUT',
      headers: this._headers,
      body: dataObj ? JSON.stringify(dataObj) : null
    }).then(res => this._getResponseData(res));
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _getUrl(localUrl, restPart) {
    if (restPart)
      return `${this._baseUrl}${localUrl}/${restPart}`;
    return this._baseUrl + localUrl;
  }
}


