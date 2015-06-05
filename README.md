daemon-setup
===
Configurable setup for daemon processes.

Usage
---
### Basic
1.  Install: None.
2.  Run: None.
3.  Require: In the setup script for a service that will
    be run as a daemon, include the following lines:

        var daemonSetup = require('@optbot/daemon-setup');
        daemonSetup.init({
            service: 'myservice',
            // other configuration parameters
        });
       
### Details
#### Create a new service
To create a new service called `myservice`:

    $ cd $HOME/workspace
    $ MY_SERVICE=myservice
    $ mkdir $MY_SERVICE && cd $MY_SERVICE
    $ git clone git@github.com:optbot/template.git .
    $ rm -rf .git/
    $ git init

Then set up the connection to a blank remote repo on GitHub.

#### Configure a service
An example of how to use configurations is provided in `lib/show.js`.
Call this script with:

    $ npm run show

Detailed documentation in the [Quichean wiki](http://quichean.wikidot.com/wiki:configuring-services).

#### Dependent code
To confirm that you are picking up `@optbot` packages in
dependent code, add the following line to the "dependencies"
declaration in `package.json` in the dependent service:

    "dependencies": {
        ...,
        "@optbot/template": "git://github.com/optbot/template.git"
    }

Now you can test that the dependency is getting picked up properly
by writing in the JavaScript managing the dependent service:

    var template = require('@optbot/template');
    template.foo();

Testing
---
### Functionality
    $ npm test

### Code conformity
    $ jshint lib test
    $ jscs .

Connects to
---
No connections
