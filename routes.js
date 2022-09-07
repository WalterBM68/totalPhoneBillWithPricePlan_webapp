const express = require("express");
const app = express();
const flash = require('express-flash');
const session = require('express-session');

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());

module.exports = Routes = (databaseFunction) => {
    //Home route
    async function showHomeScreen(req, res){
        res.render('index')
    }
    //Calculate bill
    async function calculationBill(req, res){
        const name = req.body.name;
        databaseFunction.storeUsersName(name);
        if(name == Number(name)){
            req.flash('info', 'Please enter the valid name');
        }
    }
    //Showing price plan screen
    async function showPricePlan(req, res){
        res.render('price_plans')
    }
    //Show allocate user screen
    async function allocatePricePlan(req, res){
        res.render('link_user')
    }
    //Show many users have been allocated
    async function usersWithPlan(req, res){
        res.render('price_plan')
    }
    return{
        showHomeScreen,
        showPricePlan,
        allocatePricePlan,
        usersWithPlan,
        calculationBill
    }
}