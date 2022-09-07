
module.exports = Routes = () => {
    //Home route
    async function showHomeScreen(req, res){
        res.render('index')
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
        usersWithPlan
    }
}