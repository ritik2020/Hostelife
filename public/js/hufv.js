function formValidator(form) {
	let x = document.getElementsByClassName("details-type");
	for(let i=0; i<x.length; i++){x[i].click();}

	let errors = [];
	let pricesArray = [form["non-ac-one-seater-price"], form["non-ac-two-seater-price"], form["non-ac-three-seater-price"], form["ac-one-seater-price"], form["ac-two-seater-price"], form["ac-three-seater-price"]];
	if(!validateHostelName(form.name.value)){ errors.push("Name is Invalid");}
	if(!validateAddress(form.addressLine1.value)){errors.push("Address Line 1 is invalid");}
	if(!validateAddress(form.addressLine2.value)){errors.push("Address Line 2 is invalid");}
	if(!validatePhone(form.phoneNumber.value)){errors.push("Phone is invalid");}
	if(!validatePrices(pricesArray)){
		errors.push("All the prices cannot be empty");
	}

	if(validatePrices(pricesArray)){
		for(let i=0; i<pricesArray.length; i++) {
			if(!pricesArray[i].disabled) {
			if(!validatePrice(pricesArray[i].value)){
				errors.push(`Price no ${i+1} is invalid`);
			}
		}
		}
	}

	if(!validatePhone(form.alternativephoneNumber.value)){errors.push("alternativephoneNumber is invalid");}
	if(!validateImages(form.hostelImages.files)){errors.push("Images length are invalid");}
	if(!validateDescription(form.description.value)){errors.push("Description is invalid");}
	for(let i=0; i<form.facilityName.length; i++) {
		if(!validateFacility(form.facilityName[i].value)){
			errors.push(`Facility No. ${i+1} is invalid`);
		}
	}

	if(!validateColleges(form.college)){
		errors.push("Maximum 3 Nearby colleges can be selected.")
	}

	if(errors.length>0) {
		for(let i=0; i<errors.length; i++) {
			alert(errors[i]);
		}
		return false;
	}

	if(errors.length===0) {
		return true;
	}
}

function validateHostelName(name) {
	let trimmedName = name.trim();
	var exp = /^[A-Za-z0-9@_ ]{1,40}$/;
	if(exp.test(trimmedName)) {
		return true;
	}
	return false;
}

function validateAddress(address) {
let trimmedAddress = address.trim();
var exp = /^[a-zA-Z0-9\-\,_\./ ]{0,100}$/;
if(exp.test(trimmedAddress)) {
	return true;
}
return false;
}

function validatePhone(phone) {
	let trimmedPhone = phone.trim();
	var exp = /^[0-9]{10}$/;
	if(exp.test(trimmedPhone)) {
		return true;
	}
	return false;
}

function validatePrices(prices) {
	let count = 0;
	for(let i=0; i<prices.length; i++) {
		if(prices[i].disabled) {
			count++;
		}
	}

	if(count<prices.length) {
		return true;
	}
	return false;
}

function validatePrice(price) {
	let trimmedPrice = price.trim();
	var exp = /^[0-9]{1,7}$/;
	if(exp.test(trimmedPrice)) {
		return true;
	}
	return false;
}

function validateImages(images) {
	if(images.length>10) {
		return false;
	}
	return true;
}

function validateDescription(description) {
	let trimmedDescription = description.trim();
	var exp = /^.{1,500}$/;
	if(exp.test(trimmedDescription)){
		return true;
	}
	return false;
}

function validateFacility(facility) {
	let trimmedFacility = facility.trim();
	var exp = /^[a-zA-Z0-9 ]{1,50}$/;
	if(exp.test(trimmedFacility)){
		return true;
	}

	return false;
}

function validateColleges(colleges) {
	let checked = 0;
	for(let i=0; i<colleges.length; i++) {
		if(colleges[i].checked) {
			checked++;
		}
	}
	if(checked>3) {
		return false;
	}

	return true;
}


















