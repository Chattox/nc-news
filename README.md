# NC News

A RESTful back end API allowing interaction with a database of news articles, topics, comments, and users.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before installing NC-News, you will need Node.js and NPM installed on your machine. Instructions for doing this can be found [here (node.js)](https://nodejs.org/en/download/) and [here (NPM)](https://www.npmjs.com/get-npm).

### Installing

#### Step 1: Downloading

Firstly, you will want to fork this repo using the fork button at the top of the repo page.

Once this is done, clone the repo to your machine:

```
git clone "your-git-repo-url"
cd nc-news
```

This will clone the repo to your machine and navigate to within the repo folder.

#### Step 2: Installing dependencies

Next, use NPM to install the packages NC-News depends on to work. If you are intending to develop or test this API, use this command to automatically download and install all required dependencies both for functionality and for testing/development:

```
npm install
```

Alternatively, if you intend to run the application from your local machine and don't require any additional development/testing packages:

```
npm install --production
```

This will install only the packages required for the API to function, and not the additional packages used in development and testing.

#### Step 4: Creating and seeding databases

The next step is creating and seeding the databases for the API to use. To this purpose, I have created a number of scripts to make this process easier.

First, run setup-dbs to create the databases themselves. This will create two databases, `nc_news` for development and `nc_news_test` for testing.

```
npm run setup-dbs
```

Next, run migrate:make to format the databases with the correct tables to receive the seed data.

```
npm run migrate:make
```

Up next is seeding the databases with data. Which script you run will depend on which database you want to work with. For development data and `nc_news`:

```
npm run seed
```

Or for test data and `nc_news_test`:

```
npm run seed-test
```

#### Step 5: Check your installation

NC-News should now be properly installed on your local machine. In order to verify this via an app like Insomnia or even your browser, run one of the following scripts to start the server:

- Development:

```
npm run start
```

- Testing:

```
npm run start-test
```

Once the server is running, you will see the following console log:

```
Listening on port 9090...
```

To verify the server is working properly, navigate to the /api endpoint which will return an object containing explanations of all endpoints. When running on your local machine, the default address to navigate to is `http://localhost:9090/api`.

By default the server will listen on port 9090, but this can be changed by editing the `PORT` variable found in `listen.js`.

## Endpoints

NC-News offers a suite of endpoints for interacting with the provided databases. The various endpoints are listed here, though more in-depth information can be found by accessing the /api endpoint when the server is running on your machine.

### Topics

```
GET /api/topics
```

Responds with an array of all topics.

### Users

```
GET /api/users/:username
```

Responds with a user object matching the given username.

### Articles

```
GET /api/articles
```

Responds with an array of all articles.

```
GET /api/articles/:article_id
```

Responds with an object of the article matching the given article ID.

```
PATCH /api/articles/:article_id
```

Adjusts the vote count of the specified article by the amount given in the body of the patch request. Responds with the updated article.

```
POST /api/articles/:article_id/comments
```

Creates a comment associated with the specified article containing content and author username as given in the post request body. Responds with an object of the newly created comment.

```
GET /api/articles/:article_id/comments
```

Responds with an array of comments associated with the specified article.

### Comments

```
PATCH /api/comments/:comment_id
```

Adjusts the vote count of the specified comment by the amount given in the body of the patch request. Responds with the updated comment.

```
DELETE /api/comments/:comment_id
```

Deletes the comment specified by ID.
