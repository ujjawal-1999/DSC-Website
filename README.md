# DSC-Website
DSC Website NITS. 

## MASTER BRANCH

`Don't Mess With Master`

### Routes 

- `/dsc` Routes

#### Get Route for Home Page `/dsc`
#### Get Route for Members Page  `/dsc/members`
#### Get Route for Website Developers Page `/dsc/dscwebsitedeveloper`
#### Post Route for Contact Us `/dsc/contact`

- `/dsc/user` Routes

#### Get `dsc/user/register` Signup Page Route
#### Get `dsc/user/newusermobile` Mobile view for signup page
#### Get `dsc/user/login` Login Page Route
#### Post `dsc/user/register` Signup a new user
#### Get `/dsc/user/verify/:id` Verify mail after signup via sent mail
#### Post `dsc/user/login` Login an existing user
#### Get `dsc/user/logout` Logout a logged in user

- `/dsc/user/profile` Routes

#### Get `/dsc/user/testUser` Route to test the User Routes
#### Get `/dsc/user/new` Route to get the regsiter page
#### Get `/dsc/user/verify/:id` Route to verify an account via link sent on mail
#### Get `/dsc/user/verify/forgotpassword/:id` Route to verify the link sent on mail for changing the password
#### Post `/dsc/user/changepassword/:id` Route to submit form for changing the password
#### Get `/dsc/user/verify-handle/:handle` Route to verify the DSC Handle
#### Get `/dsc/user/register` Route to render signup page
#### Post `/dsc/user/register` Route to submit form for signup
#### Get `/dsc/user/login` Route to render login page
#### Post `/dsc/user/login` Route to submit form for login
#### Get `/dsc/user/logout` Route to logout the user
#### Get `/dsc/user/forgotpassword` Route to render forgot password page
#### Post `/dsc/user/forgotpassword` Route to submit form to get mail to reset the password
#### Get `/dsc/user/profile` Route to render profile page
#### Get `/dsc/user/public-profile/:handle` Route to render public profile page
#### Post `/dsc/user/skill` Route to Add a new skill 
#### Get `/dsc/user/delete/skill/:id` Route to Delete a particular skill of a user
#### Post `/dsc/user/experience` Route to Add a new experience 
#### Get `/dsc/user/delete/experience/:id` Route to Delete a particular Experience of a user
#### Post `/dsc/user/profile` Route to Edit user profile details
#### Post `/dsc/user/project/personal` Route to Add a new personal project
#### Get  `/dsc/user/delete/project/personal/:id` Route to delete a particular personal project
#### Post `/dsc/user/achievement` Route to Add a new achievement 
#### Get `/dsc/user/delete/achievement/:id` Route to Delete a particular achievement of a user
#### Get `/dsc/user/blog/delete/:blog_id` Route to Delete a particular blog of a user
#### Post `/dsc/user/profile/upload/:id` Update User Profile Image

- `/dsc/project` Routes

#### Get `/dsc/route` Route to render DSC Projects Page

- `/dsc/blog` Routes

#### Get `/dsc/blog` Route to render the main blog page
#### Post `/dsc/blog/bookmark/:bookmark_id` Route to save a bookmark
#### Get `/dsc/blog/bookmarks` Route to render the bookmarks page of a user
#### Get `/dsc/blog/delete/bookmark/:bookmark_id` Route to remove a particular blog from the bookmarks
#### Get `/dsc/blog/create` Route to render the create blog page
#### Post `/dsc/blog/create` Route to post a new blog
#### Get `/dsc/blog/view/:slug` Route to render the complete single blog page


**Installation**

1. Clone the repo *Or* Run `git pull origin master` if already cloned.
2. Run "npm install" in the command prompt to install all related dependencies.
3. Create a ".env" file in the root directory.
4. Insert `MONGODB_URL=mongodb+srv://dscnits20:<password>@cluster0-wi7dd.mongodb.net/test?retryWrites=true&w=majority` in .env file. Also replace **password** with the given password.
5.  Add the `NODEMAILER_EMAIL`, `NODEMAILER_PASSWORD`, `NODEMAILER_SECONDARYEMAIL`, `JWT_SECRET` to the ".env" file present in root directory
6. Run `npm start` *Or* `npm run dev`.



### Our Contributors


<a href="https://github.com/ujjawal-1999/DSC-Website/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=ujjawal-1999/DSC-Website" />
</a>

Made with [contributors-img](https://contributors-img.web.app).





#### 
