const RE = /\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/g

function extractComments (source) {
  const comments = source.match(RE) || []
  return comments.map(comment => comment.slice(1, -1))
}

module.exports = extractComments
