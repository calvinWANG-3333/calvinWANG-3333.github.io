# Deploy: from this folder to calvinwang-3333.github.io

Every command below is run in the macOS **Terminal**. Copy one block at a time.
The flow: put the site on a branch, open a pull request, merge it, and GitHub Pages publishes `main`.

---

## 0. One-time setup (skip what you already have)

```bash
# git is preinstalled on macOS; this prints its version
git --version

# GitHub CLI, used to create the repo and the pull request
brew install gh

# sign in to GitHub (choose: GitHub.com → HTTPS → Login with a web browser)
gh auth login

# your name and email on commits (only if never set before)
git config --global user.name  "Ruihang Wang"
git config --global user.email "you@example.com"
```

Check the sign-in worked:

```bash
gh auth status
```

---

## 1. Go to the site folder

```bash
cd ~/Documents/Github_mainpage
ls
```

You should see `index.html`, `assets`, `README.md`, `DEPLOY.md`.

---

## 2. Make sure the repository exists

A GitHub user site must live in a repo named exactly `<username>.github.io`.

```bash
gh repo view calvinWANG-3333/calvinWANG-3333.github.io >/dev/null 2>&1 \
  && echo "Repo already exists: go to step 3" \
  || gh repo create calvinWANG-3333.github.io --public --add-readme \
       --description "Ruihang Wang, Paris. Data Analyst, Analytics Engineer."
```

- If it says the repo already exists (for example from an earlier upload), go on.
- Otherwise it creates the repo with a first commit on `main`, so a pull request has something to merge into.

---

## 3. Connect this folder to the repo, on a new branch

```bash
git init -b site/maison
git remote add origin https://github.com/calvinWANG-3333/calvinWANG-3333.github.io.git
git fetch origin
git reset origin/main
```

What this does, in plain words:
- `git init -b site/maison` makes this folder a git project, starting on a branch called `site/maison`.
- `git fetch origin` downloads what is already on GitHub, without touching your files.
- `git reset origin/main` tells git "my starting point is what's on GitHub"; your files stay exactly as they are. Git can now show the difference between GitHub and this folder.

If `git remote add` says `remote origin already exists`, run
`git remote set-url origin https://github.com/calvinWANG-3333/calvinWANG-3333.github.io.git` and continue.

---

## 4. Review and commit

```bash
git add -A
git status
```

`git status` lists new files in green. If an older version of the site was on GitHub, you will also see files marked `deleted:`, which is correct: the new site replaces them.

```bash
git commit -m "Maison redesign: new homepage"
```

---

## 5. Push the branch and open the pull request

```bash
git push -u origin site/maison

gh pr create --base main --head site/maison \
  --title "Maison redesign" \
  --body "New homepage: Paris hero, collection index, one room per project, The House, experience, contact. EN/FR."
```

The last command prints the pull request URL. To look at it in the browser:

```bash
gh pr view --web
```

---

## 6. Merge

```bash
gh pr merge --squash --delete-branch
```

This merges into `main` and deletes the `site/maison` branch on GitHub.
If it asks "Delete local branch?", answer yes.

Then bring your local folder onto `main`:

```bash
git fetch origin
git switch main
git pull
```

---

## 7. Turn on GitHub Pages (first time only)

```bash
gh api -X POST repos/calvinWANG-3333/calvinWANG-3333.github.io/pages \
  -f "source[branch]=main" -f "source[path]=/"
```

If it answers `409` / "already enabled", Pages is already on. That's fine.

Watch the build (run it again until it says `built`, usually under a minute):

```bash
gh api repos/calvinWANG-3333/calvinWANG-3333.github.io/pages/builds/latest --jq .status
```

Then open the site:

```bash
open https://calvinwang-3333.github.io
```

If you still see an old version, press Cmd + Shift + R to reload without cache.

---

## 8. Put it on LinkedIn

1. Profile → **Add section → Recommended → Add featured → Add a link** → `https://calvinwang-3333.github.io`. The preview image comes from `assets/img/og.jpg`.
2. Profile → **Edit intro → Contact info → Website** → the same link, type "Portfolio".

LinkedIn caches previews. If the image doesn't show, paste the link into https://www.linkedin.com/post-inspector/ and click Inspect.

---

## Every later update (a new project, a CV, a typo)

```bash
cd ~/Documents/Github_mainpage
git switch main
git pull
git switch -c update/forecasting          # any short name for this change

# … edit assets/js/content.js, add images to assets/img/ …

python3 -m http.server 8000               # preview at http://localhost:8000, Ctrl + C to stop

git add -A
git commit -m "Add forecasting project"
git push -u origin update/forecasting
gh pr create --fill --base main
gh pr merge --squash --delete-branch
git switch main && git pull
```

---

## If something goes wrong

| Message | What to do |
|---|---|
| `gh: command not found` | Run `brew install gh`. No Homebrew? Install it from https://brew.sh first. |
| `fatal: not a git repository` | You're in the wrong folder: `cd ~/Documents/Github_mainpage`. |
| `fatal: couldn't find remote ref main` | The repo has no `main` yet. Run step 2 again, or check the default branch name on GitHub. |
| `Authentication failed` on push | Run `gh auth login` again, then `gh auth setup-git`. |
| Page shows 404 | Wait a minute after step 7, then check the build status command. |
