export const oktaConfig = {
    clientId: '0oak748iq7XNlWhKu5d7',
    issuer:'https://dev-87590633.okta.com/oauth2/default',
    redirectUri:'https://librarypageturner.s3-website-eu-west-1.amazonaws.com/login/callback',
    scopes:['openid','profile','email'],
    // proof key for code exchange
    pkce: true,
    // disable the check for https which can not secure the data transfers
    disableHttpsCheck: true,
}