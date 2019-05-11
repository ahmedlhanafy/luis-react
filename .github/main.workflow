workflow "New workflow" {
  on = "push"
  resolves = ["alias"]
}

action "deploy" {
  uses = "actions/zeit-now@master"
  secrets = [
    "ZEIT_TOKEN",
  ]
}

action "alias" {
  needs = ["deploy"]
  uses = "actions/zeit-now@master"
  args = "alias"
  secrets = [
    "ZEIT_TOKEN",
  ]
}
