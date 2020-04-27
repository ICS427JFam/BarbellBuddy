# BarbellBuddy
# Assignment 5 (Technical Portion) 4/13/2020 - 04/26/

## Links

```
● Online Repository: ​ ​https://github.com/ICS427JFam/BarbellBuddy
● Report Documentation File:
● Release Version: ​https://github.com/ICS427JFam/BarbellBuddy/releases/tag/1.0.
● Wiki Page: ​https://github.com/ICS427JFam/BarbellBuddy/wiki
```
## Responsibilities

### Gian Calica

```
● Code final implementation of program and release final version
● Technical Portion write-up
● Report write-up
```
### Mercedez Castro

```
● Report write-up
```
### Tysen Imai-Toyama

```
● GitHub Wiki Page
```
### Hyosun Song

```
● Report write-up
```
## Technical Notes

### Environment Requirements:

```
● Node (​https://nodejs.org/en/​) Version 12.16.1+
```
### How to install and run:

1. Clone the repo from ​https://github.com/ICS427JFam/BarbellBuddy
2. `cd` into the root directory
3. Install the dependencies by doing `npm install` in the root directory
4. Install the server-side package dependencies by switching to the “server” directory by
    doing `cd server && npm install`
5. Go back to the root directory using `cd ..`
6. Install the client-side package dependencies by switching to the “client” directory by
    doing `cd client && npm install`


7. Go back to the root directory using `cd ..`
8. To run the API server only: `npm run server`
9. To run the whole program (client and server): `npm run start`
10.When running the whole program, it should automatically open a new tab in your web
    browser that directs to the web app hosted on localhost on the initial start. Otherwise, to
    access the running program, go to `​http://localhost:3001/​`.

## Closing Thoughts

As discussed in our report, one of the things that we could not accomplish was
automating our end-to-end (E2E) testing process which affected our final security review. We
simply just ran into so many bugs that we could not resolve that resulted in us not even being
able to set up tests for automated E2E testing.
A particular accomplishment that we wanted to highlight was being able to design and
write an API with authentication. Our team has no prior experience writing RESTful APIs and
having to write endpoints that require authentication to access added more to the challenge.

# Assignment 4 (Technical Portion) 02/26/2020 - 04/12/

## Link

https://github.com/ICS427JFam/BarbellBuddy

## Progress

```
● API Completed (CRUD): User and WeightInventory
● Finished implementation of BarbellCalculatorPage
● Continued work on WeightInventoryPage
● Finished implementation of ConversionPage
● Fuzz Testing
```
## Roles and responsibilities

### Gian Calica

```
● Progress
○ Added authentication support to our RESTful API
○ Improved our current API
○ Finished implementation of BarbellCalculatorPage
○ Continued work on WeightInventoryPage
○ Fuzz Testing
● Next
```

```
○ Finish implementation of WeightInventoryPage
○ Finish implementation of any remaining code for the final version
○ Improve tests
```
### Mercedez Castro

```
● Progress
○ Improved front-end design
● Next
○ Wiki
○ Improve tests
○ Fix certain logical bugs found from testing
```
### Tysen Imai-Toyama

```
● Progress
○ Implemented our RESTful API
● Next
○ Wiki
○ Improve tests
○ Fix certain logical bugs found from testing
```
### Hyosun Song

```
● Progress
○ Finished implementation of ConversionPage
● Next
○ Wiki
○ Improve tests
○ Fix certain logical bugs found from testing
```
# Assignment 3 (Technical Portion) 02/25/2020 - 03/08/

## Link

https://github.com/ICS427JFam/BarbellBuddy

## Progress

```
● Landing Page: Completed
● Barbell Calculator Page: Front-end design and functionality completed
● Weight Inventory Page: Front-end design completed
● Navigation Bar: Front-end design completed
● Footer: Completed
```

```
● MongoDB: Set up the cluster along with a collection for holding users
● Express Server: Set up and connected with our MongoDB database
```
## Roles and responsibilities

### Gian Calica

```
● New Completions
○ Finished both front-end design and functionality implementation of the Barbell
Calculator page
● Current
○ Weight Inventory Page: finished front-end design and working on implementing the
functionality of this page
● Next
○ Finish the functionality implementation of the weight inventory page
○ Use the server API for saving user data from the client side
○ Fetch this saved data from the API to replace the functionality of Barbell Calculator and
Weight Inventory page so that data is saved persistently across sessions.
```
### Mercedez Castro

```
● New Completions
○ Logo: Designed the main logo for the landing page.
○ Landing page: Finished the front-end design, added ‘Sign-up’ and ‘Log-in’ buttons, and
created the description of the app.
○ Navigation Bar: Created the menu template to be used for all pages.
○ Footer: Finished the front-end design for better cohesion.
● Current
○ Navigation Bar: Needs to be imported and implemented into each page.
○ Links: Needs to be routed for buttons and menu items.
● Next
○ Front-end design for conversion page.
```
### Tysen Imai-Toyama

```
● New Completions
○ Register page: Adds users
○ Express server: set up and has some function calls to mongoDB
○ MongoDB: Cluster made, database created and User collection created.
● Current
○ Register page: Flesh out the functionality of the register page
○ Login page: Create for testing with User collection.
● Next
○ Create functions for REST API.
```

### Hyosun Song

```
● New Completions
○ Landing page: Front-end design
○ Navigation Bar: Front-end design
● Current
○ Conversion Page: Working on implementing the functionality
● Next
○ Finish implementing the functionality of the conversion page
```
# Assignment 2 (Technical Portion)

## Completed

- Setup repository on GitHub
- Setup static analysis tool scripts
- Routing for our web app
- Some starting front-end design for the web app

## Pending

- Write code for authentication (login and register)
- Write the REST API to support our functionality
- Design mock-up of user interface for all pages
* Write code for other functionalities:
* Barbell Weight Calculator
* Inventory for Plates
* Conversion Calculator (kg to lbs, vice-versa)
* Forum for posting personal records

# Team

### Gian Calica

```
● Contribution
○ Setup the repository on GitHub
○ Organized and setup the directories within our source code, creating templates
for the pages
○ Wrote JavaScript code on routing for links in the web app
○ Wrote CSS to be used for the design of our barbell and plates
○ Setup our static analysis tool, ESLint
● Planning
```

```
○ Write the code for our functionality Barbell Weight Calculator
```
### Mercedez Castro

```
● Contribution
○ Created the functions, security, privacy, and design requirements.
○ Researched approved tools for each layer of our project.
○ Helped to compile a comprehensive list of each specific software and version.
● Planning
○ Design a mock-up of the user interface.
○ Paper prototype for user experience and feedback.
○ Create Javascript templates of the user interface.
```
### Tysen Imai-Toyama

```
● Contribution
○ Created quality gates and the risk assessment plan.
○ Researched approved tools for each layer of our project.
○ Helped to compile a comprehensive list of each specific software and version.
● Planning
○ Coding the functionality of login and logouts with redirect pages. Leveraging the
Passport JS package to implement authentication.
```
### Hyosun Song

```
● Contribution
○ Created the functions, security, privacy, and design requirements.
○ Researched approved tools for each layer of our project.
○ Helped to compile a comprehensive list of each specific software and version.
● Planning
○ Write the code for our functionality for Inventory for Plates.
```

