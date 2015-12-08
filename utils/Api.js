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
};

export { Api as default };
