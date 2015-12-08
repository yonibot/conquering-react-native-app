import ApiKeys from '../ApiKeys'
import ApiUtils from './ApiUtils'

var Api = {
  getItems: function(token) {
    return fetch(ApiKeys.itemsUrl, {
      method: 'GET',
      headers: {
        'AUTH-TOKEN': token
      }
    })
    .then(r => r.json())
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
  }
};

export { Api as default };
