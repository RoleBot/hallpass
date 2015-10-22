# hallpass
invitation microservice

hallpass only cares about sending an invitation via nodemailer compatible npm modules, verifying it and sending back to the consuming endpoint. No database is needed because invitations are JWT tokens.

Optionally define a handlebars compatible template for your html invitation.

hallpass depends on the <a href="https://github.com/sebringj/athu">athu microservice</a> for oauth/oauth2 profile info attached to the accepted invitation.

## Accepted Invitation Format

JWT Token with the following data items returned:

- iss (this should be you as the issuer)
- provider (provider name, i.e. google of the user authenticated),
	profileId (the unique profile identifier or user identifer of the given provider)
- invitationId (defined by the issuer upon initial request)

## Tech Stack
node v4.2.1

## Setup
See the config directory for more info.
