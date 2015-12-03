import ApiKeys from '../ApiKeys'
import ApiUtils from './ApiUtils'

var Api = {
  login: function(email, password) {
    return fetch(ApiKeys.loginUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          email,
          password
        }
      })
    })
  },
  getItems: function(token) {
    return fetch(ApiKeys.itemsUrl, {
      method: 'GET',
      headers: {
        'AUTH-TOKEN': token
      }
    })
    .then(ApiUtils.checkStatus)
    .then(r => r.json())
    .catch(e => e)
  }
};

export { Api as default };
