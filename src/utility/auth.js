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

      updateRefreshToken(refreshToken) {
            localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
      }

      removeTokens() {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
      }
}

export default new TokenService();