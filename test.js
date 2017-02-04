const test = require('ava')
const extractComments = require('.')

test('should return an empty array', t => {
  const str = `
    body {
      color: #fff;
      background-color: #000;
    }
  `

  const value = extractComments(str)

  t.deepEqual(value, [])
})

test('should return an array with a single comment', t => {
  const str = `
    /* This is my box component */
    .box {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .box-title {
      font-size: 24px;
      font-weight: bold;
    }
  `

  const value = extractComments(str)
  const expected = [' This is my box component ']

  t.deepEqual(value, expected)
})

test('should return an array with a single multiline comment', t => {
  const str = `
/*
This is
a multiline
comment
*/
.box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.box-title {
  font-size: 24px;
  font-weight: bold;
}
  `

  const value = extractComments(str)
  const expected = [`
This is
a multiline
comment
`]

  t.deepEqual(value, expected)
})

test('should return an array with multiple comments', t => {
  const str = `
/* Body styles */
body {
  ...
}

/*@docs

## Card

This is the description of my card component.
*/

.card {
  ...
}

.card-title {
  hack: fix; /* hack fix */
}
`

  const expected = [
    ' Body styles ',
`@docs

## Card

This is the description of my card component.
`,
  ' hack fix '
  ]

  const value = extractComments(str)

  t.deepEqual(value, expected)
})
