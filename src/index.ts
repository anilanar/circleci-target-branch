import * as Lib from "./internal";

export const getTargetBranchName = async () => {
  const {
    GITHUB_TOKEN,
    CIRCLE_PROJECT_USERNAME,
    CIRCLE_PROJECT_REPONAME,
    CIRCLE_PULL_REQUEST
  } = process.env;

  if (!CIRCLE_PROJECT_USERNAME) {
    return;
  }

  if (!CIRCLE_PROJECT_REPONAME) {
    return;
  }

  if (!CIRCLE_PULL_REQUEST) {
    return;
  }

  if (!GITHUB_TOKEN) {
    return;
  }

  return Lib.getTargetBranch({
    owner: CIRCLE_PROJECT_USERNAME,
    repo: CIRCLE_PROJECT_REPONAME,
    token: GITHUB_TOKEN,
    prUrl: CIRCLE_PULL_REQUEST
  });
};
