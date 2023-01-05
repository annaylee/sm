// The value of the 'required' is a function that returns a boolean
// Don't just set 'required': true or get mongoose validation errors

const mongoose = require('mongoose');
const quoteSchema = new mongoose.Schema({
    
    quote: {
        type: String,
        trim: true,
        unique: true,
        required: function(){ return this.length > 0; }
    },
    date: {
        type: Date,
        default: Date.now
    }, 
    valid_until: {
        type: Date
    },
    prepared_by: {
        type: String,
        trim: true,
        required: function(){ return this.length > 0; }
    },
    customer_id: {
        type: String,
        trim: true,
        required: function(){ return this.length > 0; }
    },
    company_name: {
        type: String,
        trim: true,
        required: function(){ return this.length > 0; }
    },
    address: {
        type: String,
        trim: true,
        required: function(){ return this.length > 0; }
    },
    contact: {
        type: String,
        trim: true,
        required: function(){ return this.length > 0; }
    },
    model_no: {
        type: String,
        trim: true,
        required: function(){ return this.length > 0; }
    },
    serial_no: {
        type: String,
        trim: true,
        required: function(){ return this.length > 0; }
    },
    mfg_code: {
        type: String,
        trim: true,
        required: function(){ return this.length > 0; }
    },
    payment_terms: {
        type: String,
        trim: true,
        required: function(){ return this.length > 0; }
    },
    special_terms: {
        type: String,
        trim: true
    },
    work_to_be_performed: {
        type: String,
        trim: true,
        required: function(){ return this.length > 0; }
    },
    confirmed: {
        type: String,
        required: function(){ return this.length > 0; }
    },
    subtotal: {
        type: Number,
        required: function(){ return this.value >= 0; }
    },
    discount: {
        type: Number,
        required: function(){ return this.value >= 0; }
    }, 
    total: {
        type: Number,
        required: function(){ return this.value >= 0; }
    }
   
});

module.exports = mongoose.model('Quote', quoteSchema);