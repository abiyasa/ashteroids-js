# Ashteroids.js

A simple asteroids game using [Ash.js](https://github.com/brejep/ash-js), a JavaScript port of [Ash Framework](http://ashframework.org)

## Running
Just open `ashteroids.html` from your browser. This will run the final (built & minified) version of the game.

If you modify or customize the code, you have to re-build the sources in order to see the effect.
Or you can run the game in development version (see the [topic below](#running-the-development-version).

## Building/compiling
This project uses [RequireJS](http://requirejs.org/) for AMD, [Grunt](http://www.gruntjs.com) for the building process, and
Twitter's [Bower](https://github.com/twitter/bower) for package manager.

All JavaScript files, including the Ash Framework, will be concatenated into 1 file & minified using UglifyJS.

### Dependencies
* Node.js
* Grunt's CLI installed globally using `npm install -g grunt-cli`
* Twitter Bower installed globally using `npm install -g bower`

Once you have all above installed, go to project folder and do:

```
npm install
```

That will automatically download & install the required modules for building process. After that, do:

```
bower install
```

That will automatically download & install other JavaScript libraries which are used by this application.

### Usage
Once you have all dependencies installed, you can do as many build as you like by:

```
grunt
```

That will run jshint & build the game files. The results can be found on folder `build`, both minified & non-minified version.

## Running the Development Mode
Running the development mode allows you to debug the source codes easily or see any changes immediately without having to build.
To run in development mode, you need a local web-server. This is due to XMLHttpRequest for loading screen templates.

But don't worry, Grunt also includes a local web server. You just need to do:

```
grunt connect
```

That will start a local webserver using port 9000 by default. From your browser, you can go to `http://localhost:9000/ashteroids.dev.html`.

## Grunt command lines
These are the list of other grunt commands you can use:

* `grunt jshint` : jshint all JS files
* `grunt requirejs:compile` : build the non-minified version
* `grunt requirejs:minified` : build the minified version

## License
MIT License
