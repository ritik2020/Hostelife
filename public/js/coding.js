// Our Models To Interact with the Website
class Hamburger {
	constructor() {
		this.openButton =  document.getElementsByClassName('bars')[0];
		this.menuContent =  document.getElementsByClassName('menu-content-container')[0];
		this.bars = document.getElementsByClassName('bar');
		this.currentState = "close";
		this.form = document.getElementsByClassName('hostel-finder-form-container')[0];
	}

	open() {
		if(this.currentState==="close") {
			this.menuContent.style.transform = "translateX(0px)";
			this.currentState = "open";
			for(let i=0; i<3; i++) {
			this.bars[i].classList.toggle("ham-close");
			}
			this.form.style.left = "60%";
		}

		else { 
			this.menuContent.style.transform = "translateX(-100%)";
			this.currentState = "close";
			for(let i=0; i<3; i++) {
			this.bars[i].classList.toggle("ham-close");
			}
			this.form.style.left = "2px";
		}
		
	}

}

class Scroller {
	constructor(destination) {
		this.scrollTo = document.getElementsByClassName(destination)[0];
		this.scrollDistance = this.scrollTo.getBoundingClientRect();
	}

	action() {
		let x = this.scrollDistance.top;
		window.scrollTo({top: x, left: 0, behavior: 'smooth' });
	}
}



// Our Objects created from the models to inreract with the website
const ourMenu = new Hamburger();
const scrollToFooter = new Scroller('footer');

document.getElementById("menu-option-list-hostel").addEventListener("click", function(){
scrollToFooter.action();
ourMenu.open();	
});

document.getElementById("menu-option-why-choose-us").addEventListener("click", function(){
	ourMenu.open();
	document.getElementById("why-choose-us").style.transform = "translateX(0)";
	document.getElementById("virtual-body").style.overflowY = "hidden";
});

document.getElementById("why-choose-us-close").addEventListener("click", function(){
	document.getElementById("why-choose-us").style.transform = "translateX(100%)";
	document.getElementById("virtual-body").style.overflowY = "visible";
});

document.getElementById("menu-option-contact-us").addEventListener("click", function(){
	scrollToFooter.action();
	ourMenu.open();
});




