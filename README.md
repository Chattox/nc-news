# NC News

A RESTful back end API allowing interaction with a database of news articles, topics, comments, and users.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before installing NC-News, you will need Node.js and NPM installed on your machine. Instructions for doing this can be found [here (node.js)](https://nodejs.org/en/download/) and [here (NPM)](https://www.npmjs.com/get-npm).

### Installing

Firstly, you will want to fork this repo using the fork button at the top of the repo page.

Once this is done, clone the repo to your machine:

```
git clone "your-git-repo-url"
cd nc-news
```

This will clone the repo to your machine and navigate to within the repo folder.

Next, use NPM to install the packages NC-News depends on to work. If you are intending to develop or test this API, use this command to automatically download and install all required dependencies both for functionality and for testing/development:

```
npm install
```

Alternatively, if you intend to run the application from your local machine and don't require any additional development/testing packages:

```
npm install --production
```

This will install only the packages required for the API to function, and not the additional packages used in development and testing.
