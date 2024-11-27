## TECHNICAL DOCS

### DEPENDENCIES

This story depends on: GLIDER-88

### DESCRIPTION

A random password will be generated for new users. A new property will be added to check if users have modified the default password. After login a user in the app, if he has to modify the password he will be redirected to an screen requesting the change. Meanwhile, no other APIs except users will work for him. (The password change could be applied also using the API for users not using the UI). Admin users should be able to reset any user password, then, a new random password should be set for that user and a new email should be sent.

This functionality will be implemented in users domain v2. The v1 of the users domain will be maintained, this is a possible paint point because in the v1 the admin users will still be able to create or change the users passwords, but this issue will be fixed when v1 api is deprecated.

!functional-flow.png!

### DATA MODEL

#### Affected entities

- Users: Added change_password_required property as boolean. It will be set as true if no password is received when the user is created, and set to false when a PATCH containing the new password is received again (PUT to change passwords will be only allowed from the user itself from now, in order to avoid admin users creating or changing passwords to other users).

!data-model.png!

### API CONTRACT

#### Affected endpoints

- POST /users/v2/users - password property not allowed in POST any more
- GET /users/v2/users/me - New property change_password_required

{
  "business": 1,
  "role": "company-admin",
  "email": "foo@foo.com",
  "change_password_required": true,
  "name": "Karl Konrad Koreander"
}

- GET /users/v2/users - New property change_password_required
- PATCH /users/v2/users/:id - Password property not allowed any more, 403 forbidden should be returned in that case. change_password_required property can be set to true by admin users, in that case, a new random password will be set and an email sent to the user
- PATCH /users/v2/users/me When received password property, the property change_password_required will be set to false

#### Affected filters

- GET /users/v2/users - Added change_password_required query string parameter (/users/v2/users?change_password_required=true)

#### Roles and permissions implications

- Any PATCH to an user containing password property willl be only allowed to /users/v2/users/me
- PATCH to /users/v2/users/:id containing change_password_required to true will be allowed only to admin users. Setting the property to false will not be allowed to anyone.

### IMPLEMENTATION TIPS

##### Front

- When user data has change_password_required property as true, then redirect to the change password page.
- Check user data after login action, before redirecting to any other page. (data/auth/session.js)

##### Back

- Add changePasswordRequired field to User Model (/app/user/serializers.py)
