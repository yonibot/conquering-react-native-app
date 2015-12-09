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
  addItem: function(token, todo) {
    return fetch(ApiKeys.itemsUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AUTH-TOKEN': token
      },
      body: JSON.stringify({
        item: {
          content: todo,
          completed: false
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
  },
  toggleCompleted: function(token, todoId, completed) {
    return fetch(`${ApiKeys.itemsUrl}/${todoId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AUTH-TOKEN': token
      },
      body: JSON.stringify({
        item: {
          completed
        }
      })
    })
  },
  deleteItem: function(token, todoId) {
    return fetch(`${ApiKeys.itemsUrl}/${todoId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AUTH-TOKEN': token
      }
    })
  },
  register: function(email, password) {
    return fetch(ApiKeys.usersUrl, {
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
};

export { Api as default };
