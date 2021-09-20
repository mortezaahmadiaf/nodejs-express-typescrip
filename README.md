# nodejs-express-typescrip
# this code powerd by morteza ahmadi
# appliation name : nodejs-express-typescrip 
# hot to install app
# 1 ====> clone project 
# 2 ====> npm install
# 3 ====> add database config in src\config\config.json and .env file
# 4 ====> create database in postgres
# 5 ====> go to src\modules\profile\schema.ts and src\modules\users\schema.ts uncomment last line
# 6 ====> npm run dev
# --- features ---
# jwt - send email with nodemaile - send sms with twilio - socket - cookie - bruteForce - firebase notification -test unit - validation

#   ------------ How to use jwt -----------------
# send get request to /test/check-jwt
# jwt check middleware path src\middleware\jwt.ts
# jwt router path src\routes\V1\test.ts

#   ------------ How to send Email -----------------
# go to src\script\sendEmail.ts

#   ------------ How to send SMS twillo -----------------
# 1 ===> go to twillo and create an account
# 2 ===> buy a number
# 3 ===> put your TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in .env
# 4 ===> go to src\script\sendSms.ts and uncomment code
# 5 ===> call the function and send countryCode and phone number to function
# 6 ===> you can choose a name to your phone go to src\script\sendSms.ts and replace "chooseName"