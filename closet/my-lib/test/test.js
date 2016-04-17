import index from '../src/index'
import test from 'tape'

test('my-lib basics', t => {
  t.equal(typeof index, 'function', 'should exist')
  t.end()
})
