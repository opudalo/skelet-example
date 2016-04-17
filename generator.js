const fs = require('fs')
const path = require('path')

const inquirer = require('inquirer')
const _ = require('lodash.template')
const mkdirp = require('mkdirp')

function onError(err) {
  console.error(err)
  process.exit(1)
}

function readDir(dirname, onFileContent) {
  fs.readdir(dirname, onDirItem)

  function onDirItem(err, items) {
    if (err) return onError(err)

    items.forEach(function(itemPath) {
      var p = path.join(dirname, itemPath)

      if (isDirectory(p)) readDir(p, onFileContent)
      else readFile(p, onFileContent)
    })
  }
}

function isDirectory(p) {
  return fs.lstatSync(p).isDirectory()
}

function readFile(path, onContent){
  fs.readFile(path, 'utf-8', function(err, content) {
    if (err) return onError(err)
    onContent(path, content)
  })
}

module.exports = function(opts) {
  const data = opts.data || {}
  const distDir = opts.dist
  const source = opts.source

  readDir(source, processFile)

  function processFile(filePath, template) {
    const content = _(template, {
      interpolate: /<%=([\s\S]+?)%>/g
    })(data)
    const fileDir = path.relative(source, path.dirname(filePath))
    const dist = path.join(distDir, fileDir, path.basename(filePath))

    mkdirp.sync(path.dirname(dist))
    fs.writeFileSync(dist, content)

    console.log('\x1b[32m', '✓', '\x1b[0m', dist)
  }
}
