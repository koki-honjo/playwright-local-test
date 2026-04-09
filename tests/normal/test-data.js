const users = {
  validUser: {
    email: 'tester@example.com',
    password: 'test1234',
  },
  invalidUser: {
    email: 'invalid@example.com',
    password: 'wrongpass',
  },
};

const registerData = {
  name: 'テスト花子',
  email: 'sample@example.com',
  password: 'sample1234',
};

const posts = {
  normal: '自動テスト用の投稿です',
  longText: 'あ'.repeat(300),
};

const searchWords = {
  hit: 'mika',
  noHitBug: 'hanako',
};

const dmText = '自動テストDMです';
const commentText = '自動テストコメントです';

module.exports = {
  users,
  registerData,
  posts,
  searchWords,
  dmText,
  commentText,
};