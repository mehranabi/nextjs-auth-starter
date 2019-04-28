export default class AuthService {
  isLoggedIn = () => {
    const token = this.getToken()
    return token && token != undefined && token != ''
  }

  setToken = token => {
    localStorage.setItem('token', jwt)
  }

  removeToken = () => {
    localStorage.setItem('token', '')
  }

  getToken = () => {
    return localStorage.getItem('token')
  }

  getAuth = () => {
    return {
      token: this.getToken(),
      profile: {
        first_name: '',
        last_name: '',
        email: '',
      },
    }
  }
}
