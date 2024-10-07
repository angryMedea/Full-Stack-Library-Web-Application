export const oktaConfig = {
    clientId: '0oak748iq7XNlWhKu5d7',
    issuer:'https://dev-87590633.okta.com/oauth2/default',
    redirectUri:'http://localhost:3000/login/callback',
    scopes:['openid','profile','email'],
    pkce: true,
    disableHttpsCheck: true,
}