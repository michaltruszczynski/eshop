class TokenService {
      getRefreshToken() {
            return JSON.parse(localStorage.getItem('refreshToken'));
      }

      getAccessToken() {
            return JSON.parse(localStorage.getItem('token'));
      }

      updateAccessToken(token) {
            localStorage.setItem('token', JSON.stringify(token));
      }
}

export default new TokenService();