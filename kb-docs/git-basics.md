# Git basics

## What it is

Git is a distributed version control system: it tracks changes to a set of files over time, letting you save named checkpoints, see exactly what changed and when, branch off to try something without disturbing the main line of work, and merge changes back together — including changes made by multiple people working on the same files.

"Distributed" means every copy of a repository has the full history, not just a pointer to a central server — which is why Git works offline and why services like GitHub are a hosting convenience on top of Git, not a requirement for Git itself.

## The core concepts

- **Repository** — a project folder Git is tracking, including its full history.
- **Commit** — a saved checkpoint: a snapshot of the files at that moment, with a message describing what changed and why.
- **Branch** — an independent line of development. The default branch (often `main`) is usually the "current working version"; a new branch lets you experiment or build a feature without touching it until you're ready to merge back.
- **Merge** — combining changes from one branch into another.
- **Remote** — a copy of the repository hosted elsewhere (e.g. GitHub), used for backup and collaboration. `push` sends your commits there; `pull` brings down others' commits.
- **Diff** — the actual line-by-line difference between two versions of a file, which is how you (or a reviewer) see exactly what a commit changed.

## Why it's the default starting point

- **Reversibility.** Almost anything can be undone — a bad change, an accidental deletion, an experiment that didn't work out — because the history is preserved.
- **Collaboration without stepping on each other.** Branches let multiple people (or an AI assistant and a person) work on the same codebase without directly overwriting each other's in-progress work.
- **A real audit trail.** "What changed, when, and why" is answerable months later, not just something someone half-remembers.

## A minimal everyday workflow

```
git status          # what's changed since the last commit
git add <files>      # stage specific changes to include
git commit -m "..."  # save a checkpoint with a description
git push              # send commits to the remote (e.g. GitHub)
git log --oneline    # see recent history
```

This alone — status, add, commit, push — covers the large majority of day-to-day Git usage. Branching, merging, and rebasing become relevant once you're regularly working on more than one thing at a time or collaborating with others.
