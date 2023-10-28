const getOffset = (limit = 10, page = 1) => (page - 1) * limit

module.exports = {
  getOffset
}
