- make a new folder and run cmd on it
    - `node -v` is 21.7.1
    - `npm -v` is 10.5.0
- initialize node npm in this folder usin `npm init` command and put in required details
- install axios for makin api calls using `npm i --save axios`
- running the file- use `node <filename-with-extension>`

  # additional information
- 3 methods made
      - one for getting exchange rate for the 2 currencies
      - one for getting countries list for exchanging currencies
      - one for using above 2 functions and using them to actually get converted currency from one to other and printing countries' list
- used printing in different format using back ticks(prevelant in javscript) and using it like ${variable name} to give parameters to the url we were printing and calling
- -used access key of my own account to get urls and the access key is written in the code itself
- identified aprameter of "currency" and used it to modify the url
- performed error checking using if statements and also try-catch blocks
