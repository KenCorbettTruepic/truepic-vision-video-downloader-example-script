# TRUEPIC VISION VIDEO DOWNLOADER EXAMPLE SCRIPT

This library is a small example library which demonstrates how one might download
videos from recent inspections.

## Setup

### Install Node & NPM Dependencies

To run this script you will need to install Node 16+ on your system. Once node is
installed, you must install the npm dependencies by running

```sh
npm install
```

### Create .env File

This script relies an an environment file. You must create a file named `.env`
within the folder containing these files There are 2 required values `CLIENT_ID`
and `CLIENT_SECRET`. If you do not already have these values, reach out to us
and we can provide them to you.

This file should look something like this, but with your values:

```sh
CLIENT_ID=*******
CLIENT_SECRET=*******
```

You can also set `API_DOMAIN` and `AUTH_TOKEN_URL` variables, but you shouldn't
need to.

## Running

To run the script you can just run:

```sh
npm start
```

This will fetch the last 50 events, look through them for any videos, and download
those videos into a downloads folder.

## Important Note

This script is meant to be an example template only. It is an example of how
downloading videos could be done, but there are 3 very important things you should
implement before setting up this script to run on a regular basis for your company.

1. Implement a caching layer to keep track of whether you have checked a specific event or not, and only get the event details for event you have not already checked.
2. Implement a way to check and see if you have already downloaded the video or not, and only download the videos you don't already have.
3. After you have downloaded the videos, send them to a different system to be stored.

**Important** Every time the script runs, it deletes all the videos in the downloads folder. Make sure you save them somewhere else before you run the script again.
