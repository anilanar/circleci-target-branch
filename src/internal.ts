import Octokit from "@octokit/rest";

type Props = {
  owner: string;
  repo: string;
  token: string;
  prUrl: string;
};

const getPrNo = (url: string, owner: string, repo: string) => {
  const str = url.match(
    new RegExp(`https://github.com/${owner}/${repo}/pull/(\\d+)`)
  )?.[1];
  if (!str) return null;
  const n = parseInt(str, 10);
  if (!isFinite(n)) return null;
  return n;
}

export const getTargetBranch = async ({
  owner,
  repo,
  token,
  prUrl
}: Props): Promise<string | null> => {
  const prNo = getPrNo(prUrl, owner, repo);
  if (!prNo) return null;
  const octokit = new Octokit({ auth: `token ${token}` });
  const pr = await octokit.pulls.get({
    owner,
    repo,
    pull_number: prNo
  });
  return pr.data.base.ref;
};
