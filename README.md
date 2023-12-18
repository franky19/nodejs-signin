# nodejs-signin
sample nodejs signin


# please register your email to get verified email on google cloud
1. open google cloud
2. Select the New Project option:
3. Fill in the blank for the project name and click create and it will show on IAM & ADMIN > setting screen
4. return the first step and choose API & Services
5. choose OAuth consent screen > external > click create
6. fill in the blank app name , support email, and developer contact information > Clicking Save and Continue will bring us to the Scopes phase of this configuration > Skip this phase, as it is not relevant for us, and head into the Test Users phase.
7. add email example on test users. > CLICK SAVE AND CONTINUE


# Configure Your OAuth Settings
1. CREDENTIALS > CREATE CREDENTIALS > CHOOSE OAuth client ID
2. Choose application type to be Web Application > click add on authorized redirect URIs and fill in blank with this word (https://developers.google.com/oauthplayground)
3. click create it will create your client id  and client secret


# Get Your OAuth Refresh Token
1. open the tab on https://developers.google.com/oauthplayground and Click on the gear icon to the right (which is OAuth2 Configuration) and check the checkbox to use your own OAuth2 Credentials:
2. add your cliend id and client secret on the blank field, the client id and client secret you will get on step configure your OAuth Settings
3. Look over to the left side of the website and you will see a list of services. Scroll down until you see Gmail API v1. and choose the https://mail.google.com/ > Click Authorize APIs > it will open the gmail form > Choose the one you listed as a Test user.
4. Click continue and it will generate the Authorization code > Click on the blue button labelled Exchange authorization code for tokens. and it will generate the refresh token 
5. fill on file .env.template with reference your setting up