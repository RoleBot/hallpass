# hallpass
invitation microservice

hallpass only cares about sending an invitation via email/text message, verifying it and sending back to the consuming endpoint along with a JWT token including the id of the user from an oath/oauth2 provider. No database is needed because invitations are JTW tokens with a unique identifier and timestamp. It is up to the consuming app to handle duplicate invitations.

hallpass depends on the <a href="https://github.com/sebringj/athu">athu microservice</a>.

## Tech Stack
node v4.2.1

## Setup
See the config directory for more info.
