// The value of the 'required' is a function that returns a boolean
// Don't just set 'required': true or get mongoose validation errors

const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema({
   
    employee_name: {
        type: String,
        required: function(){ return this.length > 0; }
    },
    badge: {
        type: String,
        required: function(){ return this.length > 0; }
    },
    sun_date: {
        type: String
    },
    sun_location: {
        type: String
    },
    mon_date: {
        type: String
    },
    mon_location: {
        type: String
    },
    tue_date: {
        type: String
    },
    tue_location: {
        type: String
    },
    wed_date: {
        type: String
    },
    wed_location: {
        type: String
    },
    thu_date: {
        type: String
    },
    thu_location: {
        type: String
    },
    fri_date: {
        type: String
    },
    fri_location: {
        type: String
    },
    sat_date: {
        type: String
    },
    sat_location: {
        type: String
    },
    ee_phone_sun: {
        type: Number
    },
    ee_phone_mon: {
        type: Number
    },
    ee_phone_tue: {
        type: Number
    },
    ee_phone_wed: {
        type: Number
    },
    ee_phone_thu: {
        type: Number
    },
    ee_phone_fri: {
        type: Number
    },
    ee_phone_sat: {
        type: Number
    },
    ee_phone_subtotal: {
        type: Number
    },
    ee_bus_sun: {
        type: Number
    },
    ee_bus_mon: {
        type: Number
    },
    ee_bus_tue: {
        type: Number
    },
    ee_bus_wed: {
        type: Number
    },
    ee_bus_thu: {
        type: Number
    },
    ee_bus_fri: {
        type: Number
    },
    ee_bus_sat: {
        type: Number
    },
    ee_bus_subtotal: {
        type: Number
    },
    ee_tools_sun: {
        type: Number
    },
    ee_tools_mon: {
        type: Number
    },
    ee_tools_tue: {
        type: Number
    },
    ee_tools_wed: {
        type: Number
    },
    ee_tools_thu: {
        type: Number
    },
    ee_tools_fri: {
        type: Number
    },
    ee_tools_sat: {
        type: Number
    },
    ee_tools_subtotal: {
        type: Number
    },
    com_rental_sun: {
        type: Number
    },
    com_rental_mon: {
        type: Number
    },
    com_rental_tue: {
        type: Number
    },
    com_rental_wed: {
        type: Number
    },
    com_rental_thu: {
        type: Number
    },
    com_rental_fri: {
        type: Number
    },
    com_rental_sat: {
        type: Number
    },
    com_rental_subtotal: {
        type: Number
    },
    com_phone_sun: {
        type: Number
    },
    com_phone_mon: {
        type: Number
    },
    com_phone_tue: {
        type: Number
    },
    com_phone_wed: {
        type: Number
    },
    com_phone_thu: {
        type: Number
    },
    com_phone_fri: {
        type: Number
    },
    com_phone_sat: {
        type: Number
    },
    com_phone_subtotal: {
        type: Number
    },
    com_plane_sun: {
        type: Number
    },
    com_plane_mon: {
        type: Number
    },
    com_plane_tue: {
        type: Number
    },
    com_plane_wed: {
        type: Number
    },
    com_plane_thu: {
        type: Number
    },
    com_plane_fri: {
        type: Number
    },
    com_plane_sat: {
        type: Number
    },
    com_plane_subtotal: {
        type: Number
    },
    other_expenses: {
        type: String
    },
    confirmed: {
        type: String,
        required: function(){ return this.length > 0; }
    },
    total_expenses: {
        type: Number,
        required: function(){ return this.value >= 0; }
    },
    company_paid: {
        type: Number,
        required: function(){ return this.value >= 0; }
    },
    due_employee: {
        type: Number,
        required: function(){ return this.value >= 0; }
    }

});

module.exports = mongoose.model('Expense', expenseSchema);