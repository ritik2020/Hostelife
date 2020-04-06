var ck_name = /^[A-Za-z0-9 ]{3,50}$/;
var person_name = /^[A-Za-z ]{2,20}$/;
var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i 
var ck_username = /^[A-Za-z0-9_]{1,20}$/;
var ck_phone = /^[0-9]{10}$/;
var ck_password =  /^[A-Za-z0-9!@#$%^&*()_]{6,20}$/;
var ck_city = /^[a-zA-Z ]{3,15}$/

function listHostelFormValidation(form){
var name ={
	name: form.name.value,
	isInvalid: false,
	errorHome: form.name.nextElementSibling,
	errorMessage:"",
}
var phone = {
	name: form.phone.value,
	isInvalid: false,
	errorHome: form.phone.nextElementSibling,
	errorMessage:""
}

var city = {
	name: form.city.value,
	isInvalid: false,
	errorHome: form.city.nextElementSibling,
	errorMessage:""
}

name.errorHome.innerHTML = "";
phone.errorHome.innerHTML = "";
city.errorHome.innerHTML = "";

 if (!ck_name.test(name.name)) {
 name.isInvalid = true;
 name.errorMessage = "Name should only contain alphanumeric characters and space. Special characters(@ - _ ' etc.) are not allowed";
 }
  
 if (!ck_phone.test(phone.name)) {
  phone.isInvalid = true;
  phone.errorMessage = "Phone number should be of 10 digits. Ex.- 9654546623"
 }
 if (!ck_city.test(city.name)) {
 	city.isInvalid = true;
    city.errorMessage = "City name should only contain alphabets and spaces. Special characters(@ - _ ' etc.) are not allowed";
 }
 
 if(name.isInvalid || city.isInvalid || phone.isInvalid) {
 	if(name.isInvalid) {
 		console.log("name invalid");
 		name.errorHome.innerHTML = name.errorMessage;
 	}

 	if(phone.isInvalid) {
 		console.log("phone invalid");
 		phone.errorHome.innerHTML = phone.errorMessage;
 	}

 	if(city.isInvalid) {
 		console.log("city invalid");
 		city.errorHome.innerHTML = city.errorMessage;
 	}
 	 return false;
 }
 
 console.log("nothing invalid");
 return true;
}


