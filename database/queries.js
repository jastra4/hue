const knex = require('./index');

const user = (name) => {
  return knex('users').where({name: name})
}

const entries = () => {
  return knex('entries')
  .join('users', 'entries.userid', '=', 'users.id')
  .select('entries.id', 'entries.url', 'entries.title', 'entries.text', 'users.name');
}

const entry = (entryid) => {
  return knex('entries')
  .where({'entries.id': entryid})
  .join('users', 'entries.userid', '=', 'users.id')
  .select('entries.id', 'entries.url', 'entries.title', 'entries.text', 'users.name');
}

const comments = (entryid) => {
  return knex('comments')
  .where({entryid: entryid})
  .join('users', 'comments.userid', '=', 'users.id')
  .select('comments.id', 'comments.text', 'users.name');
}

const entriesByUser = name => {
  let userid = knex('users').where({name: name}).select('id');
  return knex('entries')
  .where({userid: userid})
  .join('users', 'entries.userid', '=', 'users.id')
  .select('entries.id', 'entries.url', 'entries.title', 'entries.text', 'users.name');  
}

const commentsByUser = (name) => {
  let userid = knex('users').where({name: name}).select('id');
  return knex('comments')
  .where({userid: userid})
  .join('users', 'comments.userid', '=', 'users.id')
  .select('comments.id', 'comments.text', 'users.name', 'comments.entryid');
}

/************************************************************/
// Prestige (karma) queries
/************************************************************/

const getEntryVotes = (entryid) => {
  console.log('getEntryVotes query ran')
  return knex('entries')
  .where({'entries.id': entryid})
  .select('entries.up_votes', 'entries.down_votes');
}

const getCommentVotes = (commentid) => {
  return knex('comments')
  .where({'comments.id': commentid})
  .select('comments.up_votes', 'comments.down_votes');
}
// query db to see if user has voted
const checkEntryVote = (userid, entryid) => {
  return knex('entries_votes')
  .where({userid: userid, entryid: entryid})
  .select('entries_votes.voted')
}

const checkCommentVote = (userid, commentid) => {
  console.log('checkCommentVote: ', userid, commentid);
  return knex('comments_votes')
  .where({userid: userid, commentid: commentid})
  .select('comments_votes.voted')
}

/************************************************************/
/************************************************************/

module.exports = {
  user,
  entries,
  entry,
  comments,
  entriesByUser,
  commentsByUser,
  getEntryVotes,
  getCommentVotes,
  checkEntryVote,
  checkCommentVote
};