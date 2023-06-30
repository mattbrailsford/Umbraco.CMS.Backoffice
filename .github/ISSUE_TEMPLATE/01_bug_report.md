---

name: 🐛 Bug Report
description: "File a bug report, if you've discovered a problem in the Backoffice."
labels: "type/bug"
body:

- type: textarea
  id: "summary"
  attributes:
  label: "Bug summary"
  description: "Write a short summary of the bug."
  placeholder: >
  Try to pinpoint it as much as possible.

      Try to state the actual problem, and not just what you think the solution might be.

  validations:
  required: true

- type: textarea
  attributes:
  label: "Specifics"
  id: "specifics"
  description: "Remember that you can format code and logs nicely with the `<>` button"
  placeholder: >
  Mention the URL where this bug occurs, if applicable

      Please mention if you've checked it in other browsers as well

      Please include full error messages and screenshots, gifs or mp4 videos if applicable

- type: textarea
  attributes:
  label: "Steps to reproduce"
  id: "reproduction"
  description: "How can we reproduce the problem on a clean Umbraco install?"
  placeholder: >
  Please include screenshots, gifs or mp4 videos if applicable
  validations:
  required: true

- type: textarea
  attributes:
  label: "Expected result / actual result"
  id: "result"
  description: "What did you expect that would happen on your Umbraco site and what is the actual result of the above steps?"
  placeholder: >
  Describe the intended/desired outcome after you did the steps mentioned.

      Describe the behaviour of the bug