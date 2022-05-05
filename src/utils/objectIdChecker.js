function isValidObjectId(objectId) {
  return objectId.match(/^[0-9a-fA-F]{24}$/);
}

module.exports = {
  isValidObjectId
}
