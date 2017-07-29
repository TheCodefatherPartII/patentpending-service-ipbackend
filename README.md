# patentpending-service-ipbackenp


## Getting started
1. `npm i -g serverless` to install serverless to your global npm
2. Run `yarn` to install all the required modules
3. Add your function(s) into the `functions` folder
4. Add those function(s) to `webpack.config.js` entry
5. Update the `serverless.yml` functions section to match with the changes
6. Run `yarn start` to run all the functions locally
7. Open the browser and navigate to the lambda function (eg. [http://localhost:8000](http://localhost:8000))

## Deploying your functions to AWS
This is currently being setup through circleci to deploy automatically on merge to the dev and master branch
If you however want to manually deploy it, then you'll need the following
1. [AWS credential setup](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)
2. `serverless deploy --stage test --region ap-southeast-1` to deploy.
Alternatively, `yarn bundle` to package the lambda functions into `dist` folder

## Environment variables
```
S3_BUCKET= S3 email template bucket
API_TOKEN= Qantas api token
API_BASE_URL= Qantas api url
REGION=ap-southeast-2
EMAIL_FUNCTION_NAME= lambda email microservice function name
ASSETS_LOCATION= S3 location for images 
```

###### More details can be found at
- [serverless](https://serverless.com/framework/docs/)
- [serverless-webpack](https://github.com/elastic-coders/serverless-webpack)
