# DogSearch

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.17.

#### Requirements for running
- AngularJS

The web application is made up of two components and two services.

## Component 1: Home
The Home component is displayed as a list on the left side of the viewport. This list by default shows the videos that would be found if searching youtube with the word 'dog'. 

At the top of the list there is a search bar wherein the user can enter words to add on top of dog such as 'toy'. This will execute the search for 'dog toy'. The list of videos has also been implemented with infinite scroll. 

When the user reaches the bottom of the list the API searches for more videos using the next Youtube Page token to provide a seamless list of as many videos as there are under that search query.

## Component 2: Video
The Video component is dispalyed on the right 2/3 of the viewport and has 2 main elements. These are
- The embedded youtube player
- The video information (description, channel name, upload date, views, and channel profile picture).

Clicking on the video title will take the user to the Youtube page of the video (opened in a new tab). 

Clicking on the profile picture for the channel will take the user to the Youtube channel that uploaded the video.

Clicking on the fullscreen button at the bottom of the component will open a fullscreen version of the embedded player video and darken the rest of the page.

## Service 1: Youtube Service
The Youtube Service is used to:
- Retrieve the list of dog videos each time a search is made & when the application is started.

- Retrieve the information regarding a specific Youtube **video** using its unique ID.

- Retrieve the information regarding a specific Youtube **channel** using its unique ID.

## Service 2: Data Service
The Data service is used to:
- Transfer data between the home and video components.

This is done using an Angular BehaviorSubject that updates all subscribers of a data change.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
