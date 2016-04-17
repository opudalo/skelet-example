import index from '../src/index'
import test from 'tape'

test('<%= name %> basics', t => {
  t.equal(typeof index, 'function', 'should exist')
  t.end()
})
