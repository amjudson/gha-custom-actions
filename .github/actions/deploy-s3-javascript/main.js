const core = require('@actions/core');
// const github = require('@actions/github');
const exec = require('@actions/exec');

async function run() {
  const bucket = core.getInput('bucket', { required: true });
  const bucketRegion = core.getInput('bucket-region', { required: true });
  const distFolder = core.getInput('dist-folder', { required: true });

  await exec.exec(`aws s3 sync ${distFolder} s3://${bucket} --region ${bucketRegion}`)

  const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;

  core.setOutput('website-url', websiteUrl);
}

await run();
