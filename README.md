# MappDL Command Line Interface (CLI)

MappDL command line interface (CLI) is a unified tool for running MappDL services from the command line.
Our aim is to offer a concise and powerful tool for our developers to use MappDL services and easily script a sequence of
commands that they'd like to execute. You can currently login and view/configure all the apps that you have access to in MappDL.

## Prerequisites

The required Node.js version is 18 or higher, 
Mono and the Android-SDK are required to run the UI test for Android and iOS.

## Installation

```
npm install --location=global mappdl-cli
```

Once installed, use the `mappdl` command. See below for the available commands.

## Getting Help

To get a top level list of the available commands, run `mappdl help`.

To get help on a specific command or category, run `mappdl help command` or pass the `-h` flag to any command or category name.

MappDL provides SDK support directly within the MappDL portal. Any time you need help, just sign in to [MappDL](https://mappdl.com), then choose **'Contact support'** inside the help menu on the upper right of the MappDL portal and our dedicated support team will respond to your questions and feedback. 

## Commands

Below is the list of commands currently supported by MappDL CLI:

| Command                               | Description                                                    |
| ------------------------------------- | -------------------------------------------------------------- |
| `mappdl help`                          | Get help using mappdl commands                                  |
| `mappdl login`                         | Log in                                                         |
| `mappdl logout`                        | Log out                                                        |
| `mappdl list`                          | Get list of configured applications                            |
| `mappdl show`                          | Get the details of an app                                      | 
| `mappdl release-react`                 | Release a React Native update to an app deployment             |
| `mappdl release`                       | Release an update to an app deployment                         | 

Please use the `mappdl help` command to get more information about each one.

## Examples

Upload new release to app using ipa or apk file:

``` 
mappdl release -a owner_name/app_name -f <apk or ipa file path>
```

Build release codepush for React Native app:

``` 
mappdl release-react -a owner_name/app_name -t <target binary version>
```

