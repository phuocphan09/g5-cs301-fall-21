## Requirements

For development, you will need Node.js and at least JDK 17.0.1 installed in your environement.\
Please use the appropriate [Editorconfig](http://editorconfig.org/) plugin for your Editor (not mandatory).

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v0.10.24

    $ npm --version
    1.3.21

#### Node installation on Mac OS

You will need to use a Terminal. On Mac OS, you can find the default terminal in
`/Applications/Utilities/Terminal.app`.

Please install [Homebrew](http://brew.sh/) if it's not already done with the following command.

    $ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

If everything when fine, you should run

    brew install node

#### Node installation on Linux

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

#### Node installation on Windows

Just go on [official Node.js website](http://nodejs.org/) & grab the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it.

### react-script

If the project frontend failed to start and required [react-scripts](https://www.npmjs.com/package/react-scripts),
follow the link to learn more or type in the node terminal in your desired IDE to install react-scripts:

    npm i react-scripts

### Java

Head on to [Java Downloads](https://www.oracle.com/java/technologies/downloads/) and follow the instructionso to get JDK up and running on your machine.\
Be sure that you have set the `JAVA_HOME` variable on your machine.
#### Set JAVA_HOME on Linux
- For Korn and bash shells, run the following commands:
        `export JAVA_HOME=jdk-install-dir`
        `export PATH=$JAVA_HOME/bin:$PATH`
 - For the bourne shell, run the following commands:
    `JAVA_HOME=jdk-install-dir`
    `export JAVA_HOME`
    `PATH=$JAVA_HOME/bin:$PATH`
    `export PATH`
 - For the C shell, run the following commands:
    `setenv JAVA_HOME jdk-install-dir`
    `setenv PATH $JAVA_HOME/bin:$PATH`
    `export PATH=$JAVA_HOME/bin:$PATH`

#### Set JAVA_HOME on Windows

- Open the default installation path for the JDK:
    `C:\Program Files\Java`
- There should be a subdirectory like:
    `C:\Program Files\Java\jdk1.8.0_172`
- Once you have the JDK installation path:
    1. Right-click the My Computer icon on your desktop and select Properties.
    2. Click the Advanced tab, then click the Environment Variables button.
    3. Under System Variables, click New.
    4. Enter the variable name as JAVA_HOME.
    5. Enter the variable value as the installation path for the Java Development Kit.
    6. Click OK.
    7. Click Apply Changes (you might need to restart)

#### Set JAVA_HOME on Mac OS
- Find out your macOS version.
- Find out which shell you are using, bash or zsh?
    - For zsh shell, 
    `export $JAVA_HOME at ~/.zshenv or ~/.zshrc.`
    - For bash shell, 
    `export $JAVA_HOME at ~/.bash_profile or ~/.bashrc.`
---

### To start the backend

This project was built using Spring Boot

#### Available Scripts

Change directory to the backend folder
`cd backend`\
 and execute the included mvnw executable\
`.\mvnw spring-boot:run`

On first run, the **maven** executable will automatically download all required libraries and plugins. After executing **mvnw**, you should get the following output:

```
2022-01-05 11:57:51.400  INFO 9436 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2022-01-05 11:57:51.416  INFO 9436 --- [           main] com.ahhp.notifier.NotifierApplication    : Started NotifierApplication in 8.748 seconds (JVM running for 9.583)
```

#### Additional Functionality

This application is configured to be able to send email directly from the app using credentials supplied in `application.properties`\

By default, the credentials are left empty. Populate the following entries with the **smtp server** of your choice, as well as your credentials:
```
spring.mail.host=smtp.server.com
spring.mail.port=portNumber
spring.mail.username=your.email@server.com
spring.mail.password=yourPassword
```
After this, execute `.\mvnw spring-boot:run` again from the `backend` folder, if everything is set up correctly, the application should be able to send emails, using your credentials.

---

### To start the frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Available Scripts

In the project frontend directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
To learn more about React, please read the frontend README provided by React App

## Folder Structure

After cloning, the full directory tree should look like this:

```
│   README.md
│
├───.idea
│       .gitignore
│       g5-cs301-fall-21.iml
│       misc.xml
│       modules.xml
│       runConfigurations.xml
│       vcs.xml
│       workspace.xml
│
├───backend
│   │   .gitignore
│   │   HELP.md
│   │   mvnw
│   │   mvnw.cmd
│   │   pom.xml
│   │
│   ├───.idea
│   │   │   .gitignore
│   │   │   compiler.xml
│   │   │   encodings.xml
│   │   │   jarRepositories.xml
│   │   │   jpa-buddy.xml
│   │   │   misc.xml
│   │   │   runConfigurations.xml
│   │   │   uiDesigner.xml
│   │   │   vcs.xml
│   │   │   workspace.xml
│   │   │
│   │   ├───libraries
│   │   │       sun_mail_jakarta.xml
│   │   │
│   │   └───shelf
│   │       │   Uncommitted_changes_before_Checkout_at_02_01_2022_10_08__Changes_.xml
│   │       │   Uncommitted_changes_before_Checkout_at_28_12_2021_21_32__Changes_.xml
│   │       │
│   │       ├───Uncommitted_changes_before_Checkout_at_02_01_2022_10_08_[Changes]
│   │       │       shelved.patch
│   │       │
│   │       ├───Uncommitted_changes_before_Checkout_at_02_01_2022_10_08_[Changes]1
│   │       │       shelved.patch
│   │       │
│   │       └───Uncommitted_changes_before_Checkout_at_28_12_2021_21_32_[Changes]
│   │               database.mv.db
│   │               shelved.patch
│   │
│   ├───.mvn
│   │   └───wrapper
│   │           maven-wrapper.jar
│   │           maven-wrapper.properties
│   │           MavenWrapperDownloader.java
│   │
│   ├───data
│   │       database.mv.db
│   │       database.trace.db
│   │
│   ├───src
│   │   ├───main
│   │   │   ├───java
│   │   │   │   └───com
│   │   │   │       └───ahhp
│   │   │   │           └───notifier
│   │   │   │               │   NotifierApplication.java
│   │   │   │               │
│   │   │   │               ├───controller
│   │   │   │               │       MailingController.java
│   │   │   │               │       NotifierController.java
│   │   │   │               │
│   │   │   │               ├───entity
│   │   │   │               │       Interest.java
│   │   │   │               │       Post.java
│   │   │   │               │       User.java
│   │   │   │               │       UserInterest.java
│   │   │   │               │
│   │   │   │               ├───input
│   │   │   │               │       InfoPackage.java
│   │   │   │               │       Manipulation.java
│   │   │   │               │       PostInput.java
│   │   │   │               │
│   │   │   │               ├───mailingService
│   │   │   │               │       MailingService.java
│   │   │   │               │
│   │   │   │               ├───repository
│   │   │   │               │       InterestRepository.java
│   │   │   │               │       PostRepository.java
│   │   │   │               │       UserInterestRepository.java
│   │   │   │               │       UserRepository.java
│   │   │   │               │
│   │   │   │               ├───response
│   │   │   │               │       AccountValidationResponse.java
│   │   │   │               │       EmailValidationResponse.java
│   │   │   │               │       InterestListResponse.java
│   │   │   │               │       InterestManipulationResponse.java
│   │   │   │               │       PostSubmissionResponse.java
│   │   │   │               │
│   │   │   │               └───utils
│   │   │   │                       SecurityUtils.java
│   │   │   │
│   │   │   └───resources
│   │   │       │   application.properties
│   │   │       │
│   │   │       ├───static
│   │   │       └───templates
│   │   └───test
│   │       └───java
│   │           └───com
│   │               └───ahhp
│   │                   └───notifier
│   │                           NotifierApplicationTests.java
│   │
│   ├───target
│   │   ├───classes
│   │   │   │   application.properties
│   │   │   │
│   │   │   └───com
│   │   │       └───ahhp
│   │   │           └───notifier
│   │   │               │   NotifierApplication.class
│   │   │               │
│   │   │               ├───controller
│   │   │               │       MailingController.class
│   │   │               │       NotifierController.class
│   │   │               │
│   │   │               ├───entity
│   │   │               │       Interest.class
│   │   │               │       Post.class
│   │   │               │       User.class
│   │   │               │       UserInterest.class
│   │   │               │
│   │   │               ├───input
│   │   │               │       InfoPackage.class
│   │   │               │       Manipulation.class
│   │   │               │       PostInput.class
│   │   │               │
│   │   │               ├───mailingService
│   │   │               │       MailingService.class
│   │   │               │
│   │   │               ├───repository
│   │   │               │       InterestRepository.class
│   │   │               │       PostRepository.class
│   │   │               │       UserInterestRepository.class
│   │   │               │       UserRepository.class
│   │   │               │
│   │   │               ├───response
│   │   │               │       AccountValidationResponse.class
│   │   │               │       EmailValidationResponse.class
│   │   │               │       InterestListResponse.class
│   │   │               │       InterestManipulationResponse.class
│   │   │               │       PostSubmissionResponse.class
│   │   │               │
│   │   │               └───utils
│   │   │                       SecurityUtils.class
│   │   │
│   │   ├───generated-sources
│   │   │   └───annotations
│   │   ├───generated-test-sources
│   │   │   └───test-annotations
│   │   ├───maven-status
│   │   │   └───maven-compiler-plugin
│   │   │       ├───compile
│   │   │       │   └───default-compile
│   │   │       │           createdFiles.lst
│   │   │       │           inputFiles.lst
│   │   │       │
│   │   │       └───testCompile
│   │   │           └───default-testCompile
│   │   │                   createdFiles.lst
│   │   │                   inputFiles.lst
│   │   │
│   │   └───test-classes
│   │       └───com
│   │           └───ahhp
│   │               └───notifier
│   │                       NotifierApplicationTests.class
│   │
│   └───testJsonFiles
│           notifier.postman_collection.json
│
└───frontend
    │   .gitignore
    │   package-lock.json
    │   package.json
    │   README.md
    │
    ├───public
    │       favicon.ico
    │       index.html
    │       logo192.png
    │       logo512.png
    │       manifest.json
    │       robots.txt
    │
    └───src
        │   App.css
        │   App.js
        │   App.test.js
        │   auth.service.js
        │   get.addable.js
        │   index.css
        │   index.js
        │   post.service.js
        │   reportWebVitals.js
        │   setupTests.js
        │
        ├───assets
        │       added_icon.svg
        │       add_icon.svg
        │       arrow.svg
        │       avatar.svg
        │       home_blue.svg
        │       home_grey.svg
        │       Line 1.svg
        │       new_tag.svg
        │       personal_blue.svg
        │       personal_grey.svg
        │       remove_icon.svg
        │       search_icon.svg
        │       success_icon.svg
        │
        └───pages
            │   Feed.js
            │   ProtectedRoute.jsx
            │
            ├───InterestConfig
            │       ActiveInterest.js
            │       AddInterest.js
            │       Test.js
            │
            ├───Login
            │       CreateAccount.js
            │       InputEmail.js
            │       InputPassword.js
            │       SuccessAuth.js
            │       SuccessCreate.js
            │       SuccessLogout.js
            │       Welcome.js
            │
            └───Post
                    AddPost.js
                    HomePage.js
                    PersonalPage.js
                    ResultAddPost.js
                    SearchBar1.js
                    ViewPost.js
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, or Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.
