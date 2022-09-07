
module.exports = Routes = () => {
    //Home route
    async function showHomeScreen(req, res){
        res.render('index')
    }
    return{
        showHomeScreen,
    }
}