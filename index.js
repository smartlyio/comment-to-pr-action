const core = require("@actions/core");
const github = require("@actions/github");

async function getAllComments(client, owner, repo, issue_number) {
  try {
    const allComments = await client.issues.listComments({
      owner,
      repo,
      issue_number,
    });
    const returnComments = allComments.data.map((a) => a.body);
    return returnComments;
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function addComment(client, owner, repo, issue_number, comment) {
  try {
    await client.issues.createComment({
      owner,
      repo,
      issue_number,
      body: comment,
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

function toBoolean(value) {
  const regexp = new RegExp(/^(true|1|on|yes)$/i);
  return regexp.test(value.trim());
}

async function run() {
  // Get client and context
  const client = new github.GitHub(core.getInput("GITHUB_TOKEN"));
  const context = github.context;
  const [owner, repo] = core.getInput("repo_name").split("/");
  const issue_number = core.getInput("pr_number");
  const comment = core.getInput("comment");
  const exclusive = toBoolean(core.getInput("exclusive"));

  const allComments = await getAllComments(client, owner, repo, issue_number);

  if (allComments.includes(comment) && exclusive) {
    console.log("COMMENT ALREADY EXISTS.");
    console.log("Not adding a second time");
  } else {
    addComment(client, owner, repo, issue_number, comment);
  }
}

run();
