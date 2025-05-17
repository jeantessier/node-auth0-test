# Node Auth0 Test

A trivial Express app that integrates with [Auth0](https://auth0.com/).

Based on [this tutorial](https://auth0.com/docs/quickstart/backend/nodejs).

## Public Endpoint

The `/api/public` endpoint is public and you can access it without any authentication.

```bash
http :3000/api/public
```

```json
{
    "message": "Hello from a public endpoint! You don't need to be authenticated to see this."
}
```

## Private Endpoint

The `/api/private` endpoint is private.  If you try to access it without being
authenticated, you will receive an error code.

```bash
http :3000/api/private
```

```
HTTP/1.1 401 Unauthorized
```

You can authenticate by setting environment variables from the `.env` file, and
receive a JWT with:

```bash
http ${AUTH0_ISSUER_BASE_URL}/oauth/token \
    grant_type=client_credentials \
    client_id=${AUTH0_CLIENT_ID} \
    client_secret=${AUTH0_CLIENT_SECRET} \
    audience=${AUTH0_AUDIENCE}
```

```json
{
    "access_token": "eyJhbGci...CRF37NhQ",
    "expires_in": 86400,
    "token_type": "Bearer"
}
```

Save the JWT to your environment:

```bash
export JWT_AUTH_TOKEN=eyJhbGci...CRF37NhQ
```

And use the JWT to access the private endpoint:

```bash
http --auth-type jwt :3000/api/private
```

```json
{
    "message": "Hello from a private endpoint! You need to be authenticated to see this."
}
```

## Private Endpoint with Scope

The `/api/private-scoped` endpoint is private and requires the JWT to include a
specific scope.  If you try to access it without being authenticated, you will
receive an error code.

```bash
http :3000/api/private-scoped
```

```
HTTP/1.1 401 Unauthorized
```

If you use a JWT with the required scope, like shown above, you will receive a
different error code.

```bash
http --auth-type jwt :3000/api/private-scoped
```

```
HTTP/1.1 403 Forbidden
```

You can get a JWT with the required scope with:

> I haven't figured out this part, yet.
