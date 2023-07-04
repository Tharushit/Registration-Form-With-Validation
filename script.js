var firstName = document.getElementById("FirstName");
var lastName = document.getElementById("LastName");
var dob = document.getElementById("DOB");
var age = document.getElementById("Age");
var address = document.getElementById("Address");
var email = document.getElementById("email");
var username = document.getElementById("Username");
var password = document.getElementById("password");
var conPassword = document.getElementById("conPassword");
var create= document.getElementById("Create");
var form = document.getElementById("form");
var agreement = document.getElementById("agreement");
//var check = document.getElementById("check");

var validates = [validFirstName,validLastName,validAge,validaddress,validemail,validuser,validpassword,validcpassword,termCheck];

firstName.addEventListener("focusout",validFirstName);
lastName.addEventListener("focusout",validLastName);
dob.addEventListener("focusout",validAge);
address.addEventListener("focusout",validaddress);
email.addEventListener("focusout",validemail);
username.addEventListener("focusout",validuser);
password.addEventListener("focusout",validpassword);
conPassword.addEventListener("focusout",validcpassword);
agreement.addEventListener("change",termCheck);

form.addEventListener("Create",function(event){
    if(!validateForm()){
        event.preventDefault();
    }
});

form.addEventListener("Create",function(event){
    if(!validateForm()){
        event.preventDefault();
    }else{
        sub.stop();
        sub.play();
        sub.parentElement.style.display = "block";
        const show = sub.parentElement;
        show.className = 'Create';
    }
});
 

function validateForm(){
    var valid=1;
    validates.forEach(function(a){
        if(!a()){
            valid = 0;
        }
    });
    return valid;
}

function termCheck(){
    removeErrorTerm(agreement);
    if (agreement.checked){
        sub.disabled=false;
        return true;
    }
    else{
        printErrorTerm("Please agree to our terms and conditions",agreement.nextElementSibling);
        return false;
    }
}


function termCheck(){
    //removeErrorTerm(agreement);
    if (agreement.checked){
        sub.disabled=false;
        return true;
        //console.log("checked");
    }
    else{
        //printErrorTerm("Please agree to our terms and conditions",agreement.nextElementSibling);
        //console.log("not checked");
    }
}


agreement.onchange=function(){
    if (this.checked ){
        create.disabled=false;
    } else{
        create.disabled=true;
    }
}


function validFirstName(){
    firstName.value = firstName.value.trim(); 
    removeError(firstName);
    if (!firstName.value){
        printError("First Name cannot be empty",firstName);
        return false;
    }
    var count = firstName.value.length;
    if (count>30){
        printError("Characters Limit exceed [30]",firstName);
        return false;
    }
    printSuccess(firstName);
    return true;
}

function validLastName(){
    lastName.value = lastName.value.trim();
    removeError(lastName);
    if (!lastName.value){
        printError("Last name cannot empty",lastName);
        return false;
    }
    var count = lastName.value.length;
    if (count > 30){
        printError("Characters Limit exceed [30]");
        return false;
    }
    printSuccess(lastName);
    return true;
}

function validAge(){
    dob.value = dob.value.trim();
    removeError(dob);
    if (!dob.value){
        printError("DOB can not be empty",dob);
        return false;
    }
    calAge();
    //printSuccess(DOB);
    return true;    
}

function calAge(){
    let inputDate = new Date(dob.value);
    let date = inputDate.getDate();
    let month = inputDate.getMonth() +1;
    let year = inputDate.getFullYear();
    
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() +1;
    let yyyy = today.getFullYear();

    if (
        year > yyyy || 
        (month > mm && year == yyyy) || 
        (date > dd && month == mm && year == yyyy)
    ){
        printError("Invalid BirthDate",dob);
    } else if (year <= (yyyy -16)) {
        if (month > mm){
            let age = yyyy - year;
            document.getElementById("Age").setAttribute('value',age + ' Years');
        }
        else if (month < mm) {
            let Age = (yyyy - year) - 1;
            document.getElementById("Age").setAttribute('value',Age + ' Years');
        }
        else{
            if (date < dd){
                let Age = yyyy - year;
                document.getElementById("Age").setAttribute('value',Age + ' Years');
            }else {
                let Age = (yyyy - year) -1;
                document.getElementById("Age").setAttribute('value',Age + ' Years');
            }
        }
        printSuccess(dob);
        printSuccess(AgeVal);
    }
    else {
        printError("You must be at least 16 years old",dob);
    }    
}

function validaddress(){
    address.value = address.value.trim();
    removeError(address);
    if(address.value){
        printError("Address can not be empty",address);
        return false;
    }
    printSuccess(address);
    return true;
}

function validemail(){
    email.value = email.value.trim();
    removeError(email);
    if (!email.value){
        printError("E-mail should be filled",email);
        return false;
    }
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.value.match(pattern)){
        printError("please enter a valid E-mail",email);
        return false;
    }
    printSuccess(email);
    return true;    
}

function validuser(){
    username.value = username.value.trim();
    removeError(username);
    if (!username.value){
        printError("User name can not be empty",username);
        return false;
    }
    var uPattern = /^[a-z]+$/; //edit the pattern
    var ulen = username.value.length;
    if (!(username.value.match(uPattern) && ulen <=10)){
        printError("Please enter a valid Username",username);
        return false;
    }
    printSuccess(username);
    return true;
}

function validpassword(){
    password.value = password.value.trim();
    removeError(password);
    if (!password.value){
        printError("Password can not be empty",password);
        return false;
    }
    var char = /^[a-zA-Z0-9]+$/g;
    var num = /\d/g;
    var len = password.value.length;
    if (!(password.value.match(char))){
        printError("At least one letter should be included",password);
        return false;
    }
    if (!(password.value.match(num))){
        printError("At least one number should be included",password);
        return false;
    }
    if (len < 6){
        printError("At least 6 characters must be included",password);
        return false;
    }
    if (len > 15){
        printError("You cannot exceed 20 characters",password);
        return false;
    }
    printSuccess(password);
    return true;
}

function validcpassword() {
    conPassword.value = conPassword.value.trim();
    removeError(conPassword);
    var password = document.getElementById("password");
    password.value = password.value.trim();
    if (!conPassword.value){
        printError("Password can not be empty",conPassword);
        return false;
    }
    if (conPassword.value != password.value){
        printError("Password not matched",conPassword);
        return false;
    }
    printSuccess(conPassword);
    return true;    
}

function printError(text,element){
    removeError(element);
    errorElement = document.createElement("span");
    errorElement.classList.add("validation");
    errorElement.textContent = text;
    element.after(errorElement);
    const inputfeild = element.parentElement;
    inputfeild.className = 'input-feild error';
}

function printErrorTerm(text,element){
    removeError(element);
    errorElement = document.createElement("span");
    errorElement.classList.add("validationTerm");
    errorElement.innerHTML = text;
    element.after(errorElement);
}

function printSuccess(element){
    const inputfeild = element.parentElement;
    inputfeild.className = 'input-feild success';
}

function removeError(element){
    if(element.nextElementSibling){
        if(element.nextElementSibling.classList.contains("validation")){
            element.nextElementSibling.remove();
        }
    }
}

function removeErrorTerm(element){
    if(element.nextElementSibling){
        if(element.nextElementSibling.classList.contains("validationTerm")){
            element.nextElementSibling.remove();
        }
    }
}