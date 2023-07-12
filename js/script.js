// Business Logic for MovieCart ---------
function MovieCart() {
    this.tickets = {};
    this.currentId = 0;
}

MovieCart.prototype.assignId = function () {
    this.currentId += 1;
    return this.currentId;
};

MovieCart.prototype.addTickets = function (ticket) {
    ticket.id = this.assignId();
    this.tickets[ticket.id] = ticket;
};


MovieCart.prototype.findTicket = function (id) {
    if (this.tickets[id] != undefined) {
        return this.tickets[id];
    }
    return false;
};

MovieCart.prototype.deleteTicket = function (id) {
    if (this.tickets[id] === undefined) {
        return false;
    }
    delete this.tickets[id];
    return true;
};



// Business Logic for Tickets ---------
function Ticket(name, date, time, type, seats) {
    this.name = name;
    this.date = date;
    this.time = time;
    this.type = type;
    this.seats = seats;
    this.price = 0;
}

// Ticket.prototype.ticketName = function () {
//     return this.name;
// };

function calculatePrice (ticket) {
    let integer = parseInt(ticket.seats);
    const string = ticket.type
    if (string === "VIP Ticket") {
        ticket.price = integer * 5500;
        return ticket.price;
    } else if (string === "Senior Ticket") {
        ticket.price = integer * 3500;
        return ticket.price;
    } else {
        ticket.price = integer * 4000;
        return ticket.price;
    }
}



// User Interface Logic ---------
let movieCart = new MovieCart();

function displayTicketDetails(movieCartToDisplay) {
    let ticketsList = $("ul#ticket-list");
    let htmlForTicketInfo = "";
    Object.keys(movieCartToDisplay.tickets).forEach(function (key) {
        const ticket = movieCartToDisplay.findTicket(key);
        htmlForTicketInfo += "<li id=" + ticket.id + ">" + ticket.name +"  </li> ";
    });
    ticketsList.html(htmlForTicketInfo);
}


function showTicket(ticketId) {
    const ticket = movieCart.findTicket(ticketId);
    const price = calculatePrice(ticket);
    $(".ticket-shown").show(1000);
    $(".movie-name").html(ticket.name);
    $(".viewing-date").html(ticket.date);
    $(".viewing-time").html(ticket.time);
    $(".ticket-type").html(ticket.type);
    $(".seats").html(ticket.seats);
    $(".total-price").html(price);
    let buttons = $("#buttons");
    buttons.empty();
    buttons.append("<button class='deleteButton' id=" +  ticket.id + ">Remove From Cart</button>");

}

function attachTicketListeners() {
    $("ul#ticket-list").on("click", "li", function () {
        showTicket(this.id);
    });


    $("#buttons").on("click", ".deleteButton", function () {
        movieCart.deleteTicket(this.id);
        $(".ticket-shown").hide();
        displayTicketDetails(movieCart);
    });
}




$(document).ready(function () {
    attachTicketListeners();
    $("form#formOne").submit(function (event) {
        event.preventDefault();
        const inputtedName = $("select#name-of-movie").val();
        const inputtedDate = $("input#date-of-viewing").val();
        const inputtedTime = $("select#time-of-viewing").val();
        const inputtedType = $("select#type-of-ticket").val();
        const inputtedNumber = $("select#number-of-seats").val();

        $("select#name-of-movie").val("");
        $("input#date-of-viewing").val("");
        $("select#time-of-viewing").val("");
        $("select#type-of-ticket").val("");
        $("select#number-of-seats").val("");

        let newTicket = new Ticket(inputtedName, inputtedDate, inputtedTime, inputtedType, inputtedNumber);
        movieCart.addTickets(newTicket);
        displayTicketDetails(movieCart);
        console.log(price);
    });
});
