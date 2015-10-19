# hallpass
invitation microservice

hallpass only cares about sending an invitation via email/text message, verifying it and sending back to the consuming endpoint. No database is needed because invitations are JWT tokens.

hallpass depends on the <a href="https://github.com/sebringj/athu">athu microservice</a> for oauth/oauth2 profile info attached to the accepted invitation.

## Accepted Invitation Format

JWT Token with the following data items returned:

- profileId (profile id)
- provider (provider name, i.e. google)
- invitationId (defined by the consuming application upon invitation request)

## Tech Stack
node v4.2.1

## Setup
See the config directory for more info.
