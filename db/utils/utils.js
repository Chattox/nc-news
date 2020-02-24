exports.formatDates = list => {
  const newList = [];
  // Go through each news obj in original array
  list.forEach(newsObj => {
    // Create new obj and assign properties of original obj to it
    const newObj = {};
    Object.assign(newObj, newsObj);
    // Format created_at property to JS date obj
    newObj.created_at = new Date(newObj.created_at);
    // Add new obj to new list
    newList.push(newObj);
  });

  return newList;
};

exports.makeRefObj = list => {
  // If list empty, return empty obj
  if (list.length === 0) {
    return {};
  }
  // Create ref obj
  const refObj = {};
  // Loop thru array, create title:article_id key/value pair from each and add to object
  list.forEach(obj => {
    refObj[obj.title] = obj.article_id;
  });

  return refObj;
};

exports.formatComments = (comments, articleRef) => {};
