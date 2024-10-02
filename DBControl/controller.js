const {TicketFull} = require("./ticketFull")
const {Ticket} = require("./ticket");

class Controller {
    constructor() {
        this.ticketArr = []
    }

    createTicket(name, desc) {
        const ticket = new TicketFull(name, desc);
        this.ticketArr.push(ticket)
        return this.getAllTickets()
    }

    getAllTickets() {  
        const allTicket = this.ticketArr.map(e => new Ticket(e))
        return allTicket
    }

    getTicketById(id) {
        const ticket = this.ticketArr.find(e => e.id == id)
        if (ticket) {
            return [ticket]
        } else {
            throw new Error('Invalid ID')
        }
    }

    updateTicket(id, name = null, desc = null) {
        const ticket = this.ticketArr.find(e => e.id == id);
        if (ticket) {
            if (name != null) {
                ticket.name = name
            }
            if (desc != null) {
                ticket.description = desc
            }
            ticket.created = TicketFull.setCreatedDate()
            return this.getAllTickets()
        } else {
            throw new Error('Invalid ID')
        }
    }

    deleteTicket(id) {
        this.ticketArr = this.ticketArr.filter(e => e.id != id)
        return this.getAllTickets()
    }

    changeStatusTicket(id) {
        const ticket = this.ticketArr.find(e => e.id == id)
        ticket.status = ticket.status ? false : true
        return this.getAllTickets()
    }
}

module.exports = Controller