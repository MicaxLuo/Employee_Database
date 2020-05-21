# Project Overview

A published heroku web app that uses multiple routes which serve static files (HTML & CSS) as well as create a "data service" module for accessing data. It support adding, deleting employees and departments using a web form, and can uploading images. It also incorporates the Handlebars view engine to render our JSON data visually in the browser using .hbs views and layouts. For our app's database, we can use Postgres or MongoDB to add user registration and Login/Logout functionality & tracking (logging). The password storage logic was also implemented and included "hashed" passwords (using bcrypt.js).

## Server

- employees
- managers
- departments

## Data Service

- getEmployees
- getManagers
- initialize
- registerUser
