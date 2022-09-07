
module.exports = function databaseFunction(db){

    //storing the name to the user table
    async function storeUsersName(name){
        const results = await db.manyOrNone('select * from theUser where name = $1;', [name]);
        if(results === ''){
            await db.manyOrNone('insert into theUser (name) values ($1);', [name]);
        }else{
            await db.manyOrNone('update theUser set name = $1 where name = $1;', [name]);
        }
    }

    async function getStoredUsersNames(){
        const names = await db.many('select * from theUser;');
        return names;
    }

    //insert values into the price plan table
    async function setPricePlan(name){
        const users = await db.manyOrNone('select * from price_plan where id = $1;', [name]);
        if(users){
            await db.manyOrNone('insert into price_plan (plan_name, sms_price, call_price) values ($1, $2, $3);', [name, 1, 1]);
        }else{
            await db.manyOrNone('update price_plan set id = $1 where id = $1;', [name]);  
        }
    }

    async function deleteAllUsers(){
        const clearTable = await db.none('delete from greet;');
        return clearTable;
    }

    return{
        storeUsersName,
        getStoredUsersNames,
        deleteAllUsers,
        setPricePlan
    }
}