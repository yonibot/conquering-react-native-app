import ApiKeys from '../ApiKeys'

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
