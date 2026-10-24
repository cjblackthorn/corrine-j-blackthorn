# Astro personal site: build, deploy, verify, and rollback

**Repository:** `cjblackthorn/corrine-j-blackthorn`  
**Site:** `https://corrinejblackthorn.com/`  
**Workflow:** [`.github/workflows/pages.yml`](../.github/workflows/pages.yml)  
**Hosting:** GitHub Pages via GitHub Actions  
**Last reviewed:** 2026-10-24 (PDT)

## Deployment contract

- The workflow runs for pushes to `main`, pull requests targeting `main`, and manual `workflow_dispatch` invocations.
- The build job checks out the repository, sets up Node.js 24 with npm caching, executes `npm ci --no-audit --no-fund`, then executes `npm run build`.
- On **non-PR runs only**, the build job uploads the `dist/` directory as the `github-pages` artifact using `actions/upload-pages-artifact@v5`.
- The separate deploy job is **disabled on pull requests**. It runs only after a successful build and uses `actions/deploy-pages@v5` in the `github-pages` environment.
- The workflow grants the build job `contents: read`; only the deployment job receives `pages: write` and `id-token: write`. Keep this separation.
- The October 24, 2026 baseline also uses `actions/checkout@v7` and `actions/setup-node@v7`. Review future action or dependency updates separately.

The source site is configured in `astro.config.mjs`. `public/CNAME` contains the custom domain and is copied to `dist/CNAME`. The public résumé is `public/resume/Corrine-J-Blackthorn-Resume.pdf`, served at `/resume/Corrine-J-Blackthorn-Resume.pdf`.

## Before merging a site or dependency change

1. Check the PR diff for unexpected changes, especially `package.json`, `package-lock.json`, `astro.config.mjs`, `public/`, and `.github/workflows/`.
2. Require a green locked-install and Astro build check; inspect individual job steps, not only the overall run result.
3. Check that the generated output contains at least `dist/index.html`, `dist/CNAME`, and `dist/resume/Corrine-J-Blackthorn-Resume.pdf`.
4. If the change touches GitHub Pages artifact packaging or hidden-file handling, use a non-deploying branch-scoped validation workflow. Exercise the proposed artifact-upload action and inspect the downloaded `github-pages` archive. Do **not** grant `pages: write` to the test.
5. If the change touches `deploy-pages`, remember that ordinary PR checks deliberately skip deployment. GitHub Pages does not offer a generally available nonproduction preview for this repository. Review the upstream release, deployed artifact contract, environment, and permissions; identify residual first-production-deploy risk before accepting the PR.
6. Confirm review requirements, then merge one infrastructure change at a time and verify the exact merged SHA in the subsequent `main` deployment.

### Local build (if a local Node.js 24 environment is available)

```bash
npm ci --no-audit --no-fund
npm run build
test -s dist/index.html
test -s dist/CNAME
test -s dist/resume/Corrine-J-Blackthorn-Resume.pdf
```

An Astro build establishes static-output generation, **not** successful artifact packaging or publication.

## Verify production after merging

1. Open [the Pages workflow runs](https://github.com/cjblackthorn/corrine-j-blackthorn/actions/workflows/pages.yml) and locate the `push` run whose `head_sha` matches the merged `main` commit.
2. Confirm both jobs completed successfully. In the build job, ensure the `Upload Pages artifact` step actually **ran** and succeeded (not `skipped`). Check that the `github-pages` artifact exists.
3. In the deploy job, ensure `Deploy Pages artifact` actually succeeded, and note the reported page URL and commit.
4. Independently verify the public pages when an external browser/network is available: homepage returns HTTP 200; navigation/major links render; `/resume/Corrine-J-Blackthorn-Resume.pdf` returns a PDF; HTTPS and custom-domain redirects behave as intended. A blocked fetch tool is **unverified availability**, not proof of downtime.
5. Record the exact PR, commit, Actions run, pass/fail/not-testable result, and residual risk in the [six-phase website tracker](https://github.com/cjblackthorn/blackthorn-enterprises/issues/2).

Example HTTP checks (run from a network with access to the domain):

```bash
curl --location --fail --silent --show-error --output /dev/null \
  --write-out 'Homepage: %{http_code} %{url_effective}\n' \
  https://corrinejblackthorn.com/
curl --location --fail --silent --show-error --output /dev/null \
  --write-out 'Resume: %{http_code} %{content_type}\n' \
  https://corrinejblackthorn.com/resume/Corrine-J-Blackthorn-Resume.pdf
```

For the résumé, check that the response is actually a PDF rather than an HTML error page; a 200 status alone is insufficient.

## Incident response and rollback

**First determine the failure stage:**

- **Dependency installation/build failed:** review the Node version, npm lockfile, errors and toolchain warnings. Correct on a reviewable branch before retry.
- **Artifact upload failed or was skipped on a push:** inspect the action version, `dist/` contents, path, hidden files, symlinks, size, and event condition. PR uploads are expected to be skipped.
- **Deployment failed:** review the deploy job logs, artifact name/availability, GitHub Pages environment protection, `pages: write` and `id-token: write` permissions, and GitHub service status. Do not report a failed publish as a successful release.
- **Actions green but site is unavailable:** independently check DNS, TLS, GitHub Pages configuration, custom-domain routing, caching and the actual URL from more than one network. A workflow success does not independently verify browser reachability.

**Rollback without rewriting history:**

1. Identify the last successful `main` deployment and the exact suspect merge commit.
2. Create a new branch from current `main`. Revert only the suspect commit or restore the previous known-good workflow/action reference in a small, reviewable PR. Avoid force-pushing `main`.
3. Validate the revert's PR build; merge through normal review. Confirm the new `main` build, artifact upload and GitHub Pages deployment succeed.
4. If the issue is urgent and the previous working workflow is already on `main`, GitHub's `workflow_dispatch` can rerun a deployment **of that branch's current content**. Do not assume dispatch selects an older historical artifact.
5. Re-check public URLs and log the incident, mitigation, evidence and any remaining issues in the tracker.

**Known successful baseline:** [2026-10-24 production run #40074823604](https://github.com/cjblackthorn/corrine-j-blackthorn/actions/runs/40074823604), commit `931930b9d41ae2ce721d8dfd725b0356f0f3a498`: Astro build, upload-pages-artifact v5, and deploy-pages v5 succeeded. Independent public-domain HTTP verification was not established by the available external fetcher at the time.
