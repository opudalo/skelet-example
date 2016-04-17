const inquirer = require('inquirer')
const path = require('path')
const generator = require('./generator')
const parseArgs = require('minimist')

const closetDir = 'closet'
const source = 'skelet'
const args = parseArgs(process.argv)
const dist = args.dist || args.d

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const questions = [{
  name: 'name',
  message: 'Library name: ',
  validate: nonEmpty
}, {
  name: 'dist',
  message: 'Output folder: ',
  default: answers => {
    return './' + path.join(closetDir, answers.name)
  },
  when: !dist
}, {
  name: 'packageDescription',
  message: 'Package description: ',
  default: answers => {
    return `${answers.name} JS library`
  }
}, {
  name: 'repo',
  message: 'Github repo: ',
  default: answers => {
    return `opudalo/${answers.name}`
  },
  validate: nonEmpty,
  filter: function (repo) {
    return 'https://github.com/' + repo
  }
}, {
  name: 'packageName',
  message: 'NPM package name: ',
  default: answers => {
    return `@opudalo/${answers.name}`
  },
  validate: nonEmpty
}]


function nonEmpty(input) {
  if (!input.length) return 'Can not be empty'
  else return /^[a-zA-Z0-9_@\-/]*$/.test(input)
    || 'Can contain only alphanumeric characters, _, @, -, or /'
}

inquirer.prompt( questions, answers => {
  generator({
    source: source,
    dist: dist || answers.dist,
    data: answers
  })
})

