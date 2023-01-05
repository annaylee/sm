const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Quote = require('../models/Quote');
const Expense = require('../models/Expense');

// Currency Formatter
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

// Assign field values of the expense form to record before updating the expense report shown
function assignRecord(record, req){

    record.employee_name = req.body.employee_name;
    record.badge = req.body.badge;

    record.sun_date = req.body.sun_date;
    record.sun_location = req.body.sun_location;
    record.mon_date = req.body.mon_date;
    record.mon_location = req.body.mon_location;
    record.tue_date = req.body.tue_date;
    record.tue_location = req.body.tue_location;
    record.wed_date = req.body.wed_date;
    record.wed_location = req.body.wed_location;
    record.thu_date = req.body.thu_date;
    record.thu_location = req.body.thu_location;
    record.fri_date = req.body.fri_date;
    record.fri_location = req.body.fri_location;
    record.sat_date = req.body.sat_date;
    record.sat_location = req.body.sat_location;

    record.ee_phone_sun = req.body.ee_phone_sun;
    record.ee_phone_mon = req.body.ee_phone_mon;
    record.ee_phone_tue = req.body.ee_phone_tue;
    record.ee_phone_wed = req.body.ee_phone_wed;
    record.ee_phone_thu = req.body.ee_phone_thu;
    record.ee_phone_fri = req.body.ee_phone_fri;
    record.ee_phone_sat = req.body.ee_phone_sat;
    record.ee_phone_subtotal = req.body.ee_phone_subtotal;

    record.ee_bus_sun = req.body.ee_bus_sun;
    record.ee_bus_mon = req.body.ee_bus_mon;
    record.ee_bus_tue = req.body.ee_bus_tue;
    record.ee_bus_wed = req.body.ee_bus_wed;
    record.ee_bus_thu = req.body.ee_bus_thu;
    record.ee_bus_fri = req.body.ee_bus_fri;
    record.ee_bus_sat = req.body.ee_bus_sat;
    record.ee_bus_subtotal = req.body.ee_bus_subtotal;

    record.ee_tools_sun = req.body.ee_tools_sun;
    record.ee_tools_mon = req.body.ee_tools_mon;
    record.ee_tools_tue = req.body.ee_tools_tue;
    record.ee_tools_wed = req.body.ee_tools_wed;
    record.ee_tools_thu = req.body.ee_tools_thu;
    record.ee_tools_fri = req.body.ee_tools_fri;
    record.ee_tools_sat = req.body.ee_tools_sat;
    record.ee_tools_subtotal = req.body.ee_tools_subtotal;

    record.com_rental_sun = req.body.com_rental_sun;
    record.com_rental_mon = req.body.com_rental_mon;
    record.com_rental_tue = req.body.com_rental_tue;
    record.com_rental_wed = req.body.com_rental_wed;
    record.com_rental_thu = req.body.com_rental_thu;
    record.com_rental_fri = req.body.com_rental_fri;
    record.com_rental_sat = req.body.com_rental_sat;
    record.com_rental_subtotal = req.body.com_rental_subtotal;

    record.com_phone_sun = req.body.com_phone_sun;
    record.com_phone_mon = req.body.com_phone_mon;
    record.com_phone_tue = req.body.com_phone_tue;
    record.com_phone_wed = req.body.com_phone_wed;
    record.com_phone_thu = req.body.com_phone_thu;
    record.com_phone_fri = req.body.com_phone_fri;
    record.com_phone_sat = req.body.com_phone_sat;
    record.com_phone_subtotal = req.body.com_phone_subtotal;

    record.com_plane_sun = req.body.com_plane_sun;
    record.com_plane_mon = req.body.com_plane_mon;
    record.com_plane_tue = req.body.com_plane_tue;
    record.com_plane_wed = req.body.com_plane_wed;
    record.com_plane_thu = req.body.com_plane_thu;
    record.com_plane_fri = req.body.com_plane_fri;
    record.com_plane_sat = req.body.com_plane_sat;
    record.com_plane_subtotal = req.body.com_plane_subtotal;

    record.other_expenses = req.body.other_expenses;
    record.confirmed = req.body.confirmed;

    // convert currency string to number string by removing dollar sign & comma beforing saving to database
    record.total_expenses = req.body.total_expenses.replace(/[^\d.]/g, '');
    record.company_paid = req.body.company_paid.replace(/[^\d.]/g, '');
    record.due_employee = req.body.due_employee.replace(/[^\d.]/g, '');
}

// Show Modify Search Quote Page ( show all choices in dropdown )
router.get('/search_quote', ensureAuthenticated, async (req, res)=>{
   
    try{
        // only select 'quote' and no '_id'; sort result in ascending order
        const choices = await Quote.find({}, {quote: 1, _id: 0}).sort({quote: 1});
        res.render('search_quote', {choices: choices});
    } catch (err){
        console.log(err);
    }
});

// Show Modify Expense Report Page ( show all expense reports in table )
router.get('/search_expense', ensureAuthenticated, async (req, res)=>{

    try{
        // render search_expense page with a list of all expense reports
        // formatter is passed to the view to format currency with dollar sign & comma
        const allExp = await Expense.find({}).sort({employee_name: 1});
        res.render('search_expense', {allExp: allExp, formatter: formatter});
    } catch {
        req.flash('error', 'Unable to Load Expense Reports');
        res.redirect('/modify/search_expense');
    }
});

// Delete Expense Report Handler ( when a trashcan button is clicked )
router.delete('/search_expense/:_id', (req,res)=>{

    Expense.findByIdAndDelete(req.params._id)
    .then((result)=>{
        res.json({redirect: '/modify/search_expense'});
    })
    .catch((err)=>{
        console.log(err);
    });
});

// Update Expense Report Handler ( show record when a pencil button is clicked )
router.put('/search_expense/:_id', (req,res)=>{

    Expense.findById(req.params._id)
    .then((record)=>{
       res.json(record); // return record as a json
    })
    .catch((err)=>{
        console.log(err);
    });
});

// Update Expense Report Handler for Form ( update/modify the record that is shown in form )
router.put('/update_expense', async (req, res)=>{

   try{
    // req.body._id is hidden in form ( not req.params._id because we are not passing the _id param )
     const record = await Expense.findById(req.body._id); 
     assignRecord(record, req); // assign field values on form before saving to database
     await record.save();
     req.flash('success', `Expense Report for ${req.body.employee_name} Updated`)
     res.redirect('/modify/search_expense');  
   }catch(err){
        console.log(err);
        req.flash('error', `Unable to Update Expense Report for ${req.body.employee_name}`);
        res.redirect('/modify/search_expense');
   }

});

// Show Service Quote Handler for Form ( search & show the quote that is selected in dropdown on screen )
router.post('/search_quote', async (req, res)=>{

    try{
        // only select 'quote' and no '_id'; sort result in descending order
        const choices = await Quote.find({}, {quote: 1, _id: 0}).sort({quote: 1});
        // req.body.choices is the selected quote in dropdown
        const quote = await Quote.findOne({quote: req.body.choices}); // this will return a quote object
        // show selected quote on screen
        res.render('search_quote', {

            choices: choices,
            formatter: formatter,
            _id: quote._id,
            quote: quote.quote, 
            date: quote.date.toISOString().split('T')[0],
            valid_until: quote.valid_until.toISOString().split('T')[0],
            prepared_by: quote.prepared_by,
            customer_id: quote.customer_id,
            company_name: quote.company_name,
            address: quote.address,
            contact: quote.contact,
            model_no: quote.model_no,
            serial_no: quote.serial_no,
            mfg_code: quote.mfg_code,
            payment_terms: quote.payment_terms,
            special_terms: quote.special_terms,
            work_to_be_performed: quote.work_to_be_performed,
            confirmed: quote.confirmed,
            subtotal: quote.subtotal,
            discount: quote.discount,
            total: quote.total
         });

    } catch (err){
        req.flash('error', 'Please Select a Quote');
        res.redirect('/modify/search_quote');
    }
});

// Update Service Quote Handler ( when update button is clicked to update the quote )
router.put('/update_quote/:_id', async (req, res)=>{
 
    try{
        const quote = await Quote.findById(req.params._id);
        quote.date = new Date(req.body.date);
        quote.valid_until = new Date(req.body.valid_until);
        quote.prepared_by = req.body.prepared_by;
        quote.customer_id = req.body.customer_id;
        quote.company_name = req.body.company_name;
        quote.address = req.body.address;
        quote.contact = req.body.contact;
        quote.model_no = req.body.model_no;
        quote.serial_no = req.body.serial_no;
        quote.mfg_code = req.body.mfg_code;
        quote.payment_terms = req.body.payment_terms;
        quote.special_terms = req.body.special_terms;
        quote.work_to_be_performed = req.body.work_to_be_performed;
        quote.confirmed = req.body.confirmed;
        // convert currency string to number string by removing dollar sign & comma beforing saving to database
        quote.subtotal = req.body.subtotal.replace(/[^\d.]/g, '');
        quote.discount = req.body.discount.replace(/[^\d.]/g, '');
        quote.total = req.body.total.replace(/[^\d.]/g, '');

        await quote.save();
        req.flash('success', `Quote ${quote.quote} Updated`)
        res.redirect('/modify/search_quote');  
    } catch(err){
        console.log(err);
        req.flash('error', `Unable to Update Quote ${req.body.quote}`);
        res.redirect('/modify/search_quote');
    }
});

module.exports = router;