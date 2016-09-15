# caterchimp
## A catering app for your local caterer to cater

# Tech Stack
  * React/Redux
  * React-Native
  * Node/Express
  * RESTful API
  * Neo4j (or MongoDB)
  * ESLint
  * Jasmine Testing Suite

# Git Workflow

```bash
    git clone repo_address
    git checkout -b BRANCH
    git add -p
    git commit
    git pull --rebase origin master
     |                      |
no conflict              conflict
     |                      |
     |                git mergetool
     |                      |
     |            git rebase --continue
     |                      |
git push origin BRANCH <----
```

