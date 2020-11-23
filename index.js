var readlineSync= require("readline-sync");
var chalk= require("chalk");
var monthDays=[31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var isLeapYearFlag = false;


console.log(chalk.cyanBright("******Welcome******\n\n"));
var userName = readlineSync.question(chalk.greenBright("Hey! May i know your name?\n"));

console.log(chalk.cyanBright(`\nHi ${userName}, I will tell you if you are born in a leap year\n`));

takeDate();

if(isLeapYearFlag){
  console.log(chalk.cyanBright("\nAha! you are born in a Leap Year"))
}
else{
  console.log(chalk.cyanBright("\nCool! you are not born in a Leap Year"))
}

//function to take input untill valid date is entered
function takeDate(){
  var inputDate = readlineSync.question(chalk.greenBright("Please enter your birthdate in the format 'DD/MM/YYYY'\n"));

  //checking if date is valid
  var dateArray= inputDate.split('/');
  var YY=dateArray[2];
  var MM=dateArray[1];
  var DD=dateArray[0];
  
  //to check if the input date is not string
  if(isNaN(YY) || isNaN(MM) || isNaN(DD)){
    console.log(chalk.redBright("\nYou have entered invalid date"))
    takeDate();
  }
  //to check if the input date is not fractions
  else if(!Number.isInteger(Number(`${MM}`)) || !Number.isInteger(Number(`${DD}`)) || !Number.isInteger(Number(`${YY}`))){
    console.log(chalk.redBright("\nYou have entered invalid date"))
    takeDate();
  }
  //to check if the input date is not valid
  else if(MM>12 || DD>31 || YY>=2020 || MM<=0 ||DD<=0 ||YY<=0){
    console.log(chalk.redBright("\nYou have entered invalid date"))
    takeDate();
  }
  //to check if the input days is not valid
  else if(DD>monthDays[MM-1]){
   console.log(chalk.redBright("\nYou have entered invalid date"))
   takeDate();
  }

  else{
    //to check if feb(non-leap year) and entered date greater than 28
    if(MM==2){
      if(!isLeapYear(YY) && DD>28){
        console.log(chalk.redBright("\nYou have entered invalid date"))
        takeDate();
      }
      else{
        isLeapYearFlag = isLeapYear(YY);
      }
    }
    //finding: leap year or not
    else{
      isLeapYearFlag = isLeapYear(YY);
    }
    
  }
}

//leap year finding function
function isLeapYear(Year){
  if(Year%4===0){  
    if(Year%100===0){
      if(Year%400===0){
        return true;
      }
      else{
        return false;
      }
    }

    else{
      return true;
    }
  }
  return false;
}
