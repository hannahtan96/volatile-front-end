# Volatile: volatile-front-end

Volatile is a full-stack application and analytical tool that merges quantitative and qualitative analysis to derive a sentiment score of your overall stock portfolio. This repository holds the frontend code for the project, which must be deployed alongside its associated [back-end repository](https://github.com/hannahtan96/volatile-back-end).

## Usage

After pulling the repo to your local machine, install the relevant dependencies via npm or yarn.

```javascript
yarn install
```

## Deployment

To connect to a different backend URL, edit the API_URL shown below:

```javascript
export const API_URL = '***YOUR_BACKEND_URL***/api'
```


This front-end repository can be hosted via Firebase Hosting. To do so, first run a yarn run build, which will compile the TypeScript code into Javascript in a ***static*** folder. Copy all of the files from the ***build*** folder into the ***public*** folder.

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
