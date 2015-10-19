# hallpass
invitation microservice

hallpass only cares about sending an invitation via email/text message, verifying it and sending back to the consuming endpoint along with 3rd party profile JWT token. No database is needed because the invitations are encrypted and uniquely identified based on timestamp. It is up to the consuming app to handle duplicate invitations.

hallpass depends on the <a href="https://github.com/sebringj/athu">athu microservice</a>.

## Tech Stack
node v4+

## Setup
See the config directory for more info.
