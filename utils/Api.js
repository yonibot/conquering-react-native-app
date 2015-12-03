import ApiKeys from '../ApiKeys'

var Api = {
  loginUser: function(email, password) {
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
  }
};

export { Api as default };
