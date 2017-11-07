![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) Code-401-Javascript Lab 36-39
===
This is the 36-39 lab for Code Fellows. Students are expected to build a front end for a Charity backend API that was built as a midterm project for the course.

# Charity Choice Application

Allows user build profiles, search for charities, and favorite specific charities.

### main.js

Entry point for the app.

### Components

#### Structure:
```
Provider
  App
    BrowserRouter
      AuthRedirect
      Header
      // Depends on routes
      AuthRedirect
      Landing
        AuthForm
      Dashboard
      Profile
        PhotoForm
        ProfileForm
        Favorite
      Search
        SearchForm
        Charity
```
  * ##### Provider
    * Holds / manages all application state
  * ##### App
    * Holds the links to access the routes in the navbar
    * Components displayed depends if user is logged in or not.
  * ##### BrowserRouter
    * Manages the frontend routes
  * ##### Header
    * Contains the links to other Components
    * Dynamically changes depending if user is logged in or not.
  * ##### AuthRedirect
    * Redirects user to different pages depending on if they have a token.
    * If token is present the user is redirected to the Dashboard
    * Without a token, user is sent to the Landing page.
  * ##### Landing
    * Displays login/signup form depending if user is logged in.
  * ##### Dashboard
    * Displays a dashboard message
  * ##### Profile
    * Displays the users profile or form for creating a profile.
  * ##### PhotoForm
    * Allows user to upload a photo for the profile
  * ##### ProfileForm
    * Used to edit or create profiles for the user
  * ##### Favorite
    * Used for displaying the user's favorite charities
  * ##### Search
    * Displays the search bar for charities
    * Displays the charities that were queried by the user
  * ##### SearchForm
    * Used for searching by charity name
  * ##### Charity
    * Used to display charity content
