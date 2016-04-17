# Skelet is naive [Yeoman](http://yeoman.io/)/[Slush](http://slushjs.github.io/#/)-like generator implementation

To use generator.  

- clone the repo
- `cd` into it
- run `npm install`
- use `node index -d ../path/to/folder` or `node index --dist=../path/to/folder`, or `node index`
- skelet stored in `../path/to/folder` or `./closet` folder.

You know what to do next


## Skelet directory structure

```
.
|-- .babelrc - babel configuration file
|-- .eslintrc - eslint configuration file
|-- .gitignore
|-- .npmignore - to exclude files/folder from publishing as npm package
|-- LICENSE.md
|-- README.md
|-- package.json
|-- src
|   `-- index.js
`-- test
    `-- test.js
```

## Build tool

In general good practice for small libraries would be to avoid using gulp, and use [npm](http://www.sitepoint.com/guide-to-npm-as-a-build-tool/) as a [build tool](http://substack.net/task_automation_with_npm_run). But that's not an obligation.  


