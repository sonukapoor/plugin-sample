# SampleProject

This is a sample project show-casing how to dynamically import modules/plugins into Angular and render them on the screen.

## Plugins

The `projects/plugins` folder contains a sample angular application that will be loaded dynamically.
It is built using webpack. The output is directly copied into the `/src/assets/plugins/` folder.

## SystemJS

The app uses `SystemJS` to load the modules. A wrapper has been created inside the `utilities` library to help with that.
The same helper also adds the `Angular` dependencies into the `window` object.

## Building the libraries

- Build the `utilities` library using: `npx ng build utilities --prod`
- Build the `plugins` library using `npx ng run plugins:build`

## Start the app

Run `npm run start` to start the app in your browser. You should see a simple `plugins works!` label, which came from the plugin itself.
