# Costasiella WordPress plugin

## About

This is an example WordPress plugin for costasiella. It's not suitable for usage without any modification. Think of it as an example on which to build. Only the minimum css for some layout definitions is included and some urls need to be changed to point to your Costasiella installation.

It won't look 'right' on your website without some additional work.

Currently included:

- Schedule integration

## Development

#### Technical overview

A thin php wrapper (costasiella.php )presents the plugin to WordPress and enables the schedule javascript app to be loaded. This javascript app is based on the create react app framework.

#### Setting up a development environment

The easiest way is to develop the basic features outside of WordPress, as you can use the live development server included with create react app. 
This guide assumes a setup on an LTS version of Ubuntu Linux or one of it's deriviates.

- Install nodejs12 
  [GitHub - nodesource/distributions: NodeSource Node.js Binary Distributions](https://github.com/nodesource/distributions#deb)

- Clone this git repository

- cd into the directory where you cloned this repository and then into the schedule_app folder

- Install the node modules by executing `npm install` 

- Start the development webserver using `npm run start` 
  Go to localhost:3000 or <your server ip>:3000 to view the development webserver in case it doesn't open automatically.

- Edit the file schedule_app/config.js to set the url of your OpenStudio installation.

- Edit the other js and css files to suit your needs

- When done making all the changed you want to make, create a production build using
  `npm run build` 

## Installation

After making the changes you'd like to make and making sure the plugin style matches your website, you can upload the plugin to your WordPress page and enable it.
Note that the plugin reads the built javascript. Without running `npm run build` prior to deployment your changes won't show up in the plugin.
