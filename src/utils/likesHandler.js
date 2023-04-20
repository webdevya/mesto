function getLikesCount(likes) {
  return likes.length;
}

function getIsUserLiked(likes, userId) {
  return likes.some(like => like._id === userId);
}


export {
  getLikesCount,
  getIsUserLiked
}
