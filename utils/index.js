const serializeWithComments = (results,)=>{
  return results.reduce((serialized, { id, title, year, artist, name, content, comment_id, comments_name, user_id })=>{
    let artWork = serialized.find(({id: foundId})=> id === foundId);
    const comment = comment_id ? {
        id: comment_id,
        content,
        name: name || comments_name,
        userID: user_id 
    } : null
    if (!artWork) {
        artWork = {
            id,
            title,
            year,
            artist,
            comments: []
        }
        serialized.push(artWork);
    };
    if (comment) artWork.comments.push(comment);
    return serialized;
  },[]);
}

module.exports = {
    serializeWithComments
}