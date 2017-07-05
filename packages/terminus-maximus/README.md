# @tww/terminus-maximus [![npm version](https://badge.fury.io/js/%40tww%2Fterminus-maximus.svg)](https://badge.fury.io/js/%40tww%2Fterminus-maximus)

> Run concurrent command line commands in an organized and readable way

## Installation

```sh
$ npm install --save @tww/terminus-maximus
```

## Usage
1. create a .terminusMaximus file (JSON), eg:

> See the api config below for more about these options
```js
{
  "errorHeight": 20,
  "scripts": {
    "ping": {
      "screensPerRow": 3,
      "commands": [
        {
          "label": "ping google",
          "command": "ping www.google.com",
          "screenConfig": {}
        },
        {
          "label": "ping microsoft",
          "command": "ping www.microsoft.com",
          "screenConfig": {}
        },
        {
          "label": "ping yahoo",
          "command": "ping www.yahoo.com",
          "screenConfig": {}
        },
        {
          "label": "ping reddit",
          "command": "ping www.reddit.com",
          "screenConfig": {}
        },
        {
          "label": "ping craigslist.com",
          "command": "ping www.craigslist.com",
          "screenConfig": {}
        },
        {
          "label": "ping ravelry",
          "command": "ping www.ravelry.com",
          "screenConfig": {}
        }
      ]
    },
    "http": {
      "commands": [
        {
          "label": "http",
          "command": "http-server",
          "screenConfig": {}
        },
        {
          "label": "ping",
          "command": "curl http://127.0.0.1:8080/",
          "screenConfig": {}
        }
      ]
    }
  }
}

```
2. add an npm script for your command, eg `ping`.
```js
//...
"scripts": {
  "ping" "termax ping"
}
//...
```

3. run `npm run ping` and behold, your readable output of 6 pings.

![logo](https://github.com/thewooleyway/thewooleymeta/raw/master/packages/terminus-maximus/docs/ping.png "Logo Title Text 2")


# API

See (our api)[./api.md]


## License

MIT © [Eric Wooley](ericwooley.github.com)
