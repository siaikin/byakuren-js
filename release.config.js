export default {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/github',
    '@semantic-release/git',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md'
      }
    ]
  ],
  repositoryUrl: 'https://github.com/siaikin/byakuren-js.git'
};
