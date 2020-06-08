# DSC-Website
DSC Website NITS. 

## MASTER BRANCH

### Routes 

- `/dsc` Routes

#### Get Route for Home Page `/dsc`
#### Post /dsc/contact route

- `/dsc/user` Routes

#### Get `dsc/user/register` Signup Page Route
#### Get `dsc/user/newusermobile` Mobile view for signup page
#### Get `dsc/user/login` Login Page Route
#### Post `dsc/user/register` Signup a new user
#### Get `/dsc/user/verify/:id` Verify mail after signup via sent mail
#### Post `dsc/user/login` Login an existing user
#### Get `dsc/user/logout` Logout a logged in user

- `/dsc/user/profile` Routes

#### Post `/dsc/user/profile/:id` Update user profile details
#### Post `/dsc/user/profile/upload/:id` Update User Profile Image

**Installation**

1. Clone the repo *Or* Run `git pull origin master` if already cloned.
2. Run "npm install" in the command prompt to install all related dependencies.
3. Create a ".env" file in the root directory.
4. Insert `MONGODB_URL=mongodb+srv://dscnits20:<password>@cluster0-wi7dd.mongodb.net/test?retryWrites=true&w=majority` in .env file. Also replace **password** with the given password.
5.  Add the `NODEMAILER_EMAIL`, `NODEMAILER_PASSWORD`, `NODEMAILER_SECONDARYEMAIL`, `JWT_SECRET` to the ".env" file present in root directory
6. Run `npm start` *Or* `npm run dev`.









#### 