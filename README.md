# chive

## Workflow

1. Make a branch from chive/dev for your feature
2. clone and `npm install`
3. Develop Feature and associated testing
4. Make a PR into /dev from feature when `npm run test` and `npm run build` are both passing
5. Merge into /dev for CI/CD (no deployment)
6. Once /dev is in safe state make a PR into /master from /dev (`npm run test` and `npm run build` should both be passing)
7. Merge into /master for CI/CD (with deployment)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
