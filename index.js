class bookingPlatform {
    constructor(name, listings, bookings) {
        this.name = name;
        this.listings = [];
        this.bookings = [];
    }
}

addListing(listing) {
    this.listings.push(listing);
}

removeListing(listingId) {
    this.listings = this.listings.filter((listing) => listingId !== listingId);
}

listListings() {
    return this.listings;
}

searchListings(location, startDate, endDate){
    return this.listings.filter((listing) => listing.isAvailable(startDate, endDate) && listing.location === location);
}

createBooking(booking) {
    this.bookings.push(booking);
}

cancelBooking (bookingId) {
    this.bookings = this.bookings.filter((booking) => booking !== bookingId);
}

listBookings(){
    return this.bookings;
}

class propertyListing{
    contructor(id, title, location, description, price, availability) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.description = description;
        this.price = price;
        this.availability = [];
    }
addAvailability(startDate, endDate) {
    this.availability.push(startDate,endDate);
}

isAvailable(startDate, endDate) {
    let parsedStartDate = startDate.split("/");
    let parsedEndDate = endDate.split("/");
    parsedStartDate = new Date(parsedStartDate[2], parseInt(parsedStartDate[1]) - 1, parsedStartDate[0]);
    parsedEndDate = new Date(parsedEndDate[2], parseInt(parsedEndDate[1]) - 1, parsedEndDate[0]);
    return this.availability.some(
      (availableDates) => {
        let parsedAvailableStartDate = availableDates.startDate.split("/");
        let parsedAvailableEndDate = availableDates.endDate.split("/");
        parsedAvailableStartDate = new Date(parsedAvailableStartDate[2], parseInt(parsedAvailableStartDate[1]) - 1, parsedAvailableStartDate[0]);
        parsedAvailableEndDate = new Date(parsedAvailableEndDate[2], parseInt(parsedAvailableEndDate[1]) - 1, parsedAvailableEndDate[0]);
        console.log(parsedAvailableStartDate <= parsedStartDate  &&
            parsedAvailableEndDate >= parsedEndDate);
    }
    );
  }

}

class hotelListing extends propertyListing {
    constructor(id, title, location, description, price, availability, roomCount, amenities, rating){
        super(id, title, location, description, price, availability);
        this.roomCount = roomCount;
        this.amenities = [];
        this.rating = rating; 

    }
}

class vacationRentalListing extends propertyListing {
    constructor (id, title, location, description, price, availability, bedroomCount, bathroomCount, hasSwimmingPool){
        super(id, title, location, description, price, availability);
        this.bedroomCount = bedroomCount;
        this.bathroomCount = bathroomCount;
        this.hasSwimmingPool = hasSwimmingPool;
    }
}

class booking {
    constructor(id, propertyId, guestName, startDate, endDate, totalPrice){
        this.id = id;
        this.propertyId = propertyId;
        this.guestName = guestName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalPrice = totalPrice;
    }

    calculateTotalPrice(property){
        const startDate = new Date(this.startDate);
        const endDate = new Date(this.endDate);
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        this.totalPrice = diffDays * property.price;
    }

}

//BookingPlatform class

class BookingPlatform {
    constructor(name) {
        this.name = name;
        this.listings = [];
        this.bookings = [];
    }
}

// Usage example
const bookingPlatform = new BookingPlatform('My Booking Platform');

const hotelListing1 = new HotelListing('hotel1', 'Hotel A', 'City A', 'Luxurious hotel', 150, 50, ['WiFi', 'Swimming Pool'], 4.5);
const hotelListing2 = new HotelListing('hotel2', 'Hotel B', 'City B', 'Cozy hotel', 100, 30, ['WiFi'], 4.2);

const vacationRental1 = new VacationRentalListing('rental1', 'Vacation Home 1', 'Beach Town', 'Beautiful vacation rental', 200, 3, 2, true);
const vacationRental2 = new VacationRentalListing('rental2', 'Vacation Home 2', 'Mountain Resort', 'Charming vacation rental', 180, 4, 3, false);

bookingPlatform.addListing(hotelListing1);
bookingPlatform.addListing(hotelListing2);
bookingPlatform.addListing(vacationRental1);
bookingPlatform.addListing(vacationRental2);

hotelListing1.addAvailability('2023-07-10', '2023-07-15');
hotelListing2.addAvailability('2023-07-12', '2023-07-20');
vacationRental1.addAvailability('2023-08-01', '2023-08-10');
vacationRental2.addAvailability('2023-09-05', '2023-09-15');

const booking1 = new Booking('booking1', 'hotel1', 'John Doe', '2023-07-12', '2023-07-14');
booking1.calculateTotalPrice(hotelListing1);
bookingPlatform.createBooking(booking1);

const booking2 = new Booking('booking2', 'rental1', 'Jane Smith', '2023-08-02', '2023-08-07');
booking2.calculateTotalPrice(vacationRental1);
bookingPlatform.createBooking(booking2);

console.log('All property listings:', bookingPlatform.listListings());
console.log('Search results:', bookingPlatform.searchListings('City B', '2023-07-10', '2023-07-18'));
console.log('All bookings:', bookingPlatform.listBookings());

bookingPlatform.cancelBooking('booking1');
console.log('All bookings after cancellation:', bookingPlatform.listBookings());