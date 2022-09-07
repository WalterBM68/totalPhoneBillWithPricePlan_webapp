const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const pgPromise = require('pg-promise');
const pgp = pgPromise();
const Routes = require('./routes');
const DatabaseFunction = require('./database');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:pg123@localhost:5432/phone_bill';
const config = {
  connectionString: DATABASE_URL
}
if (process.env.NODE_ENV == 'production') {
	config.ssl = { 
		rejectUnauthorized : false
	}
}
const db = pgp(config);

app.engine("handlebars", exphbs.engine({ extname: "handlebars", layoutsDir: __dirname + '/views/layouts' }));
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());
  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const databaseFunction = DatabaseFunction(db);
const routes = Routes(databaseFunction);

app.get('/', routes.showHomeScreen);
app.post('/calc_bill');
app.get('/price_plans', routes.showPricePlan);
app.get('/price_plan/:name', routes.usersWithPlan);
app.get('/link_user', routes.allocatePricePlan);
app.post('/link_user');

const PORT = process.env.PORT || 2000;
app.listen(PORT, function(){
  console.log("The app started at port:", PORT);
});