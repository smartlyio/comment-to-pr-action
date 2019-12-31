const core = require('@actions/core');
const github = require('@actions/github');

async function getAllComments(client, pullRequest, comment) {
    try {
      const allComments = await client.pulls.listReviews({
            owner: pullRequest.owner,
            repo: pullRequest.repo,
            pull_number: pullRequest.number,
        });
      const returnComments = allComments.data.map(a => a.body);
      return returnComments;
    } catch (error) {
      core.setFailed(error.message);
    }
}

async function addComment(client, pullRequest, comment) {
    try {
      await client.pulls.createReview({
            owner: pullRequest.owner,
            repo: pullRequest.repo,
            pull_number: pullRequest.number,
            body: comment,
            event: 'COMMENT'
        });
    } catch (error) {
      core.setFailed(error.message);
    }
}

async function run ()
{
    // Get client and context
    const client = new github.GitHub(core.getInput('repo-token'));
    const context = github.context;
    const pullRequest = context.issue;
    const comment = core.getInput('comment');
    const exclusive = core.getInput('exclusive');

    let allComments;
    await getAllComments(client, pullRequest).then(function(result) { allComments = result;});

    if (allComments.includes(comment) && exclusive) {
        console.log("COMMENT ALREADY EXISTS.")
        console.log("Not adding a second time")
    } else {
        addComment(client, pullRequest, comment);
    }
}

run();
