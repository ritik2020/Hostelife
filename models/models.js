class ListRequest {
	constructor(HostelName, PhoneNumber, City, RequestDate) {
		this.HostelName = HostelName;
		this.PhoneNumber = PhoneNumber;
		this.City = City;
		this.RequestDate = RequestDate;
	}
}

class Hostel {
	constructor(name, address, hostelType, contactDetails, description, prices, images, facilities, nearbyColleges) {
		this.name = name;
		this.address = address;
		this.hostelType= hostelType;
		this.contactDetails = contactDetails;
		this.description = description;
		this.prices = prices;
		this.images = images;
		this.facilities = facilities;
		this.nearbyColleges = nearbyColleges;
	}
}

class BuyHostel {
	constructor(name, phoneNumber, college, city, hostelId, date) {
		this.name = name;
		this.phoneNumber = phoneNumber;
		this.college = college;
		this.city = city;
		this.hostelId = hostelId;
		this.date = date;
	}
}



module.exports = {
	ListRequest: ListRequest,
	Hostel: Hostel,
	BuyHostel: BuyHostel
}