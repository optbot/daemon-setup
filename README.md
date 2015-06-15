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
            user: 'myservice',
            service: 'lib/start.js',
            command: 'node',
            pathToFiles: path.join(__dirname, '..')
            // other optional parameters
        });
       
### Details
#### Required configuration parameters
-   `user`: normally just the name of the service. `daemon-setup` will
    create this user and group and will use this name when creating the log
    directory and the path to the executable service files.
-   `service`: Argument to be passed to `command`. This argument
    should be a path such as `lib/start.js` *relative* to the root of
    the directory into which the service files are copied, namely
    `/usr/local/lib/quichean/myservice/`.
-   `pathToFiles`: Absolute path to root of directory from which all files
    will be copied into the directory which will contain the files used by 
    the daemon service. For node daemons, the path will normally
    be the root of the service. For Python daemons, the required
    files should be placed in a separate `src` directory, and the value
    of `pathToFiles` should be something like `path.join(__dirname, '../src')`.

#### Optional configuration parameters
-   `command`: Executable command for starting the service. If no value
    is provided, `command` defaults to `node`. Examples:
    
        node
        python
        /var/local/.virtualenvs/myservice/bin/python

-   `upstart`: If set to `false`, no upstart file will be written.
    This option will normally only be used during development. Once
    a dependent service is fully functional, it should normally start whenever the
    server is restarted. But you may not want this behavior while the
    service is being developed. Defaults to `true`.

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
