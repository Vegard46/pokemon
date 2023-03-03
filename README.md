# Noroff: Front End Assignment 3 - Angular Pokemon Application

## Purpose
The purpose of the assignment was to utilize the Angluar framework to build an application that communicates with the public PokeAPI to interact with a collection of pokemon that can be "caught" and added to a personal collection/pokedex.

## Technologies
- Language
  - TypeScript, HTML and CSS
- Framework
  - Angular CLI
- Server
  - Simple JSON server with single db.json file
- Deployment & Hosting
  - Server
    - Railway
  - Angular application
    - Vercel
- Extra
  - Fontawesome Icons by Twitter
- Created with
  - VSCode (Development environment)
  - Figma (Design)
  
## Structure
- app
  - components
    - Singular components
  - enums
    - Enumerated values
  - guards
    - Authentication guard components for restricting access to certain routes
  - models
    - Defined models of tytpescript objects that are received and used in the app
  - pages
    - Page-components comprised of html, css and typescript for individual pages of the application
  - services
    - Services mainly handling business logic in the form of API communication
  - utils
    - Utility classes and functions providing extra functionality needed
- assets
  - Raw assets like images used in the application

- component-tree-figma.pdf
  - Component tree model showing the general structure and relationships of the components used in the application
  
## Run
Clone this repository and run the following commands in the root directory:
```
npm install
npm start
```
Afterwards, open any browser and access the url "localhost:4200"
### Creator 
Vegard46 (Vegard Andersson)

