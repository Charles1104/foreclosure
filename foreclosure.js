'use strict';
var steve;
var stevesLoan;
var month = 0;
var monthsUntilEvicted;

function loan(){

  var account = {
    borrowed : 550000,
    balance : 286000,
    monthlyPayment : 1700,
    defaulted : 0,
    defaultsToForeclose : 5,
    foreclosed : false
  };

    var missPayment = function() {
      account.defaulted ++;
      if (account.defaulted >= account.defaultsToForeclose){
        account.foreclosed = true;
      }
    };

    var getBalance = function(){
      return account.balance;
    };

    var receivePayment = function(amount){
      if (amount < account.monthlyPayment){
        missPayment();
      }
      account.balance -= amount;
    };

    var getMonthlyPayment = function(){
      return account.monthlyPayment;
    };

    var isForeclosed = function(){
      return account.foreclosed;
    };

    return{
      getBalance,
      receivePayment,
      getMonthlyPayment,
      isForeclosed
    };
}

function borrower(loan){
  var account = {
    monthlyIncome : 1350,
    funds : 2800,
    loan : loan
    };

  var getFunds = function (){
    return account.funds;
  };

  var makePayment = function (){
    if (account.funds > loan.getMonthlyPayment()) {
      account.funds -= loan.getMonthlyPayment();
      loan.receivePayment(loan.getMonthlyPayment());
    } else {
      loan.receivePayment(account.funds);
      account.funds = 0;
    }
  };

  var payDay = function(){
    account.funds += account.monthlyIncome;
  };

  return{
    getFunds,
    makePayment,
    payDay
  };
}

stevesLoan = loan();

steve = borrower(stevesLoan);

while(stevesLoan.isForeclosed() === false){

  steve.payDay();
  steve.makePayment();
  month++;

  if (stevesLoan.getBalance <=0){
    break;
  }
}

if (stevesLoan.getBalance() > 0){
  monthsUntilEvicted = month;
}

console.log(monthsUntilEvicted);




