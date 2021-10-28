if ($.cookie("signedupcookie") == undefined)
{
    inituser = [
        {
            username: "admin",
            password: "admin"
        }
    ]

    $.cookie("userscookie", JSON.stringify(inituser))
    $.cookie("signedupcookie", false);
    console.log("first time?");
}

function showloginpw()
{
    if (document.getElementById("loginform").elements["pwd"].type == "password")
    {
        document.getElementById("loginform").elements["pwd"].type = "text";
        return 0;
    }
    else document.getElementById("loginform").elements["pwd"].type = "password";
    return 0;
}

function showSignUpPwd(){
    if (document.getElementById("signupform").elements["pwd"].type == "password")
    {
        document.getElementById("signupform").elements["pwd"].type = "text";
        return 0;
    }
    else document.getElementById("signupform").elements["pwd"].type = "password";
    return 0;
}

function showSignUpConfPwd(){
    if (document.getElementById("signupform").elements["confpwd"].type == "password")
    {
        document.getElementById("signupform").elements["confpwd"].type = "text";
        return 0;
    }
    else document.getElementById("signupform").elements["confpwd"].type = "password";
    return 0;
}

function login()
{
    if ($.cookie("signedupcookie")==false)
    {
        document.getElementById("loginerror").innerHTML = "<a href = 'signup.html'>Please Signup First</a>";
    }
    
    users = JSON.parse($.cookie("userscookie"));
    console.log(users);
    console.log($.cookie())
    var loginform = document.getElementById("loginform");
    var usrname = loginform.elements["usrname"].value;
    var pwd = loginform.elements["pwd"].value;

    var user = users.find(user => user.username === usrname);

    if (user == undefined)
    {
        document.getElementById("loginerror").innerHTML = "Username Not Found";
        return 0;
    }

    if (user.password === pwd)
    {
        $.cookie("loggedinuser", usrname)
        window.location.href = "index.html";    
        return 0;
    }
    else{
        document.getElementById("loginerror").innerHTML = "Incorrect password";
    }
    return 0;
}

function signup()
{
    console.log($.cookie("userscookie"))
    users = JSON.parse($.cookie("userscookie"));
    console.log(users)
    var signupform = document.getElementById("signupform");
    var usrname = signupform.elements["usrname"].value;
    var pwd = signupform.elements["pwd"].value;
    var confpwd = signupform.elements["confpwd"].value;


    if (pwd.length < 8)
    {
        document.getElementById("signuperror").innerHTML = "Password too short";
        return 0;
    }

    if (pwd != confpwd)
    {
        document.getElementById("signuperror").innerHTML = "Passwords do not match";
        return 0;
    }

    var user = users.find(user => user.username === usrname);

    if (user != undefined)
    {
        document.getElementById("signuperror").innerHTML = "Username already taken";
        return 0;
    }

    user = {
        username: usrname,
        password: pwd
    }

    users.push(user);
    $.cookie("userscookie", JSON.stringify(users))
    if ($.cookie("signedupcookie")==false) $.cookie("signedupcookie", true)
    console.log(users);
    console.log($.cookie());
    window.location.href = "login.html";
    return 0;
}

function loadindex()
{
    if ($.cookie("loggedinuser") == undefined) return 0;

    document.getElementById("welcome").innerHTML = "Welcome, " + $.cookie("loggedinuser") + "!";
    console.log("logged in");

    document.getElementById("loginbuttons").innerHTML = "<button class=\"btn\" onclick=\"logout();\" height = 75>Logout</button>";
    // document.getElementById("loginarea").style.display = "none";
    return 0;
}

function loadpage()
{
    if ($.cookie("loggedinuser") == undefined) return 0;

    console.log("logged in");

    document.getElementById("loginbuttons").innerHTML = "<button class=\"btn\" onclick=\"logout();\" height = 75>Logout</button>";
    return 0;
}

function addcart(productname, price)
{
    if($.cookie("loggedinuser") == undefined)
    {
        window.location.href = "https://Atlantis.joelajay.repl.co/login.html";
        return 0;
    }

    if($.cookie("cart") == undefined) $.cookie("cart", '[{"productname":"productname","price":"price"}]');

    var cartvar = JSON.parse($.cookie("cart"));
    cartvar.push({productname: productname, price: price})
    console.log(cartvar);
    $.cookie("cart",JSON.stringify(cartvar));
    event.target.innerHTML = "Added to Cart";

    return 0;

}

function loadcart()
{
    loadpage();
    var cartvar = JSON.parse($.cookie("cart"));
    var cartdiv = document.getElementById("cartdiv");
    var total = 0;
    var table = "<table class = \"cart\">";
    table += "<th>";
    table += "<td class = \"product-name\">Item Name</td>";
    table += "<td class = \"price\">Item Price</td>";
    table += "</th>";

    console.log(table);
    for(var i = 1; i < cartvar.length; i++)
    {
        table += "<tr>";
        table += "<td class = \"slno\">" + i.toString() + "</td>";
        table += "<td class = \"product-name\">" + cartvar[i].productname + "</td>";
        table += "<td class = \"price\">" + cartvar[i].price + "</td>";
        table += "</tr>";
    
        total += cartvar[i].price;
    }
    table += "<td class = \"slno\"></td><td class = \"product-name\">Total</td><td class =\"price\">" + total.toString() + "</td>";
    cartdiv.innerHTML = table;
    
    console.log(total);
    return 0;
}

function logout()
{
    console.log("e");
    $.removeCookie("cart");
    $.removeCookie("loggedinuser");
    window.location.reload();
}