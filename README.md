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
