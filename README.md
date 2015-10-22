# hallpass
invitation microservice

hallpass only cares about sending an invitation via nodemailer compatible npm modules, verifying it and sending back to the consuming endpoint. No database is needed because invitations are JWT tokens.

Optionally define a handlebars compatible template for your html invitation.

hallpass depends on the <a href="https://github.com/sebringj/athu">athu microservice</a> for oauth/oauth2 profile info attached to the accepted invitation.

## Make Invitation

- Make a POST request to http(s)://[hallpass hostname]/invitation/send/[invitation id]
- "jwt" name-value pair should be in the body of the request

### JWT payload items defined

- iss (this should be you as the issuer)
- invitationId (for your use to tie back to the initial invitation request)
- email (optional depending on transport defined and configuration)
- phone (optional depending on transport defined and configuration)
- successRedirect (upon invitation acceptance, user is redirect here, optional)
- errorRedirect (upon invitation failure, user is redirect here, optional)

## Receive Invitation

If the successRedirect occurs, "jwt" name-value pair will be sent via query string.

### JWT payload items defined

- iss (this app, identified from config)
- invitationId (the invitation id you initially sent)
- provider (the oauth/oauth2 provider verifying the profile, i.e. google)
- profileId (the unique profile id based on the provider verified)

## Tech Stack
node v4.2.1

## Setup
See the config directory for more info.
