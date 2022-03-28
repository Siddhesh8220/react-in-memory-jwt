# react-in-memory-jwt

Added JWT authentication using cookies
- Stored refreshToken in cookies
- Stored accessToken in memory using JwtManager function
- on page refresh new token is requested using refresh token
- user object object is also sent back while refreshing page to maintain a session.
