# Cinedate
![readme_intro](https://user-images.githubusercontent.com/45428822/60176814-aca9f500-9817-11e9-822b-1dd5c4ca55f8.png)

## Feature
the user can create his own profile. It is then possible for the user to post his own date request. The user indicates which film he / she wants to see and then places the date.

## Research
I have done a lot of research to realize this project. Read more about this in my [wiki](https://github.com/MarcKunst/Project-Tech/wiki)

## Database Structure
![db_structure](https://user-images.githubusercontent.com/45428822/60177207-93557880-9818-11e9-8153-27bda83302e3.png)
<br>
When a user creates an account, this information is stored in the mongoDB database called "user". When creating an account, a `_id` is given to the user. When the user chooses to post a date, new information is added to this user in the database.

## Installation
1. Open your terminal.

2. change your directory to the folder where you would like to install this project.

3. assuming that git is intalled on you computer type: <br>
`https://github.com/MarcKunst/Project-Tech.git` in the terminal.

4. To install all the dependencies type: <br>
`npm install` in the terminal.

5. To het the application up and running type: <br>
`npm run start` in the terminal.

## Usage
Now that everything is installed, you can run this application locally on your computer. To make things a bit easier you can use nodemon to restart the server everytime you make a change to the code. To use this, simply type: <br>
`nodemon ./server.js localhost 3000` in the terminal.

If you want to publish your own project based on this one on github, make sure you create a `.gitignore` file. This file makes sure that you don't upload any file that you don't need or want to upload. I recommend to (at least) place the following files in your .gitignore:

`node_modules/` <br>
`.DS_Store` <br>
`.env`

To use mongoDB we need to create a `.env` file to store important information for our database. Make sure you include:

`DB_NAME=your_db_name` <br>
`DB_PORT=your_db_port` <br>
`DB_HOST=your_db_host` <br>
`PORT=your_port_number` <br>
`MONGODB_URI='mongodb://'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME`

This project uses `EJS` for writing the dynamic pages and partials. For more information on writing EJS follow this link: (https://ejs.co/#install).

## Packages
Here I will put the links to the documentation for all packages that I have used in this application: <br>
[path](https://www.npmjs.com/package/path) <br>
[body-parser](https://www.npmjs.com/package/body-parser) <br>
[multer](https://www.npmjs.com/package/multer) <br>
[express-validator](https://www.npmjs.com/package/express-validator) <br>
[express-session](https://www.npmjs.com/package/express-session)

## License
[MIT](https://github.com/MarcKunst/Project-Tech/blob/master/LICENSE)
