import express from 'express'
import 'dotenv/config'
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer'

const app = express()
const port = process.env.PORT || 3000

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// This route doesn't need authentication
app.get('/api/public', (req, res) => {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  })
})

// This route needs authentication
app.get('/api/private', checkJwt, (req, res) => {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  })
})

const requiredScope = 'read:messages'
const checkScopes = requiredScopes(requiredScope)

// This route needs authentication and a specific scope
app.get('/api/private-scoped', checkJwt, checkScopes, (req, res) => {
  res.json({
    message: `Hello from a private endpoint! You need to be authenticated and have a scope of ${requiredScope} to see this.`
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
