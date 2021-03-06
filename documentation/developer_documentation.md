# DEVELOPER DOCUMENTATION

## DIRECTORY LAYOUT
- __documentation/:__ app guides and info
- __librocast-app/:__ application code
    - __public/:__ supplemental files
    - __src/:__ frontend, backend, and tests
        - __backend/:__ code and tests related to server and database functionality
            - __src/:__
                - __controllers/:__ handles user request
                - __data/:__ data files
                - __routers/:__ express routers and endpoints
        - __components/:__ code and tests related to react components
        - __util/:__ configuration
- __reports/:__ weekly status reports

## HOW TO INSTALL AND RUN SOFTWARE
#### Prerequisites
  
#### Source Code
To obtain the source code, clone the repository. Run the command in your terminal: 
```
Git clone https://github.com/abbybatinga/librocast.git
```    

For information on installing and using npm please visit [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

#### Install Dependencies
Before building, testing, or running the system, first install dependencies in the librocast/librocast-app/src/backend directory:
```
npm install
```
Then, install dependencies again in the librocast/librocast-app directory:
```
npm install
```

#### Run the App
To run the app and the server, navigate to the librocast/:
```
npm start
```
The app can then be opened in your browser at localhost:3000

#### Testing
To run all tests, run tests in librocast/ directory:
```
npm test
```
#### Build


To build the app for deployment, build in librocast/ directory:
```
npm run build
```


## ADDING TESTS
To add a new test to the code base, create a ‘component_name.test.js’ file. Within this test file, create a “describe” block (provided by Jest) to hold the test suite
>Frontend:  
>add test cases using the “test” block.
>```javascript
>describe('my function or component', () => {
>  test('does the following', () => {
>
>  });
>})
>```

>Backend:  
>add test cases using SuperTest
>```javascript
>const app = require("./app")
>const supertest = require("supertest")
>const request = supertest(app)
>
>describe("/test endpoint", () => {
>  it("should retrun a response", async () => {
>    const reponse = await request.get("/test")
>    expect(response.status).toBe(200)
>    expect(response.text).toBe("Hello World");
>
>  })
>})
>```
