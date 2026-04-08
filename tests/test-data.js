export const users = {
  validUser: {
    email: 'tester@example.com',
    password: 'test1234',
  },
  invalidUser: {
    email: 'invalid@example.com',
    password: 'wrongpass',
  },
};

export const registerData = {
  name: 'テスト花子',
  email: 'sample@example.com',
  password: 'sample1234',
};

export const posts = {
  normal: '自動テスト用の投稿です',
  longText: 'あ'.repeat(300),
};

export const searchWords = {
  hit: 'mika',
  noHitBug: 'hanako',
};

export const dmText = '自動テストDMです';
export const commentText = '自動テストコメントです';