# Comment to PR action

This action will add a comment to a PR. If `exclusive` flag is not explicitly set to false, the comment will only be created if there is not already an identical comment present.

## Inputs

### `comment`

**Required** The text of the comment.

### `repo-token`

**Required** The token to access the repo, same one as is available in the action.

### `exclusive`

**Optional** Do not comment if there is already an identical comment. Default true.

## Example usage

```yaml
uses: smartlyio/comment-to-pr-action@v1
with:
  repo-token: ${{ secrets.GITHUB_TOKEN }}
  comment: 'The kittens have decreed that this PR is acceptable!'
```
## Development

### Development scripts

- Run typescript: `npm run compile`
- Run test: `npm run test`
- Run linters: `npm run lint`

Run all the above: `npm run all`

### Release new version

Follow these steps to release a new version

1. Create release branch: `git checkout -b v{next-version}`
1. Release the version: `npm run release`
1. Add the built package to version control: `git add dist`
1. Push the new branch: `git push origin/v{next-version}`
