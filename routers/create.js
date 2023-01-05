const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Quote = require('../models/Quote');
const Expense = require('../models/Expense');

// Show Create New Quote Service Page
router.get('/quote', ensureAuthenticated, (req, res)=>{
    res.render('quote');
});

// Show Create New Expense Report Page
router.get('/expense', ensureAuthenticated, (req, res)=>{
    res.render('expense');
});

// Create New Service Quote Handler ( when submit button is clicked )
router.post('/quote', ensureAuthenticated, (req, res)=>{

    const { quote, date, valid_until, prepared_by, 
            customer_id, company_name, address, contact, 
            model_no, serial_no, mfg_code, payment_terms, special_terms, 
            work_to_be_performed, confirmed, subtotal, discount, total} = req.body;

    let errors = [];
   
    // Check all required fields
    if (!quote || !date || !valid_until || !prepared_by || 
        !customer_id || !company_name || !address || !contact ||
        !model_no || !serial_no || !mfg_code || !payment_terms ||
        !work_to_be_performed || !confirmed || 
        !subtotal || !discount || !total){
        errors.push({msg: 'Please enter all required fields'});
    }

    if (errors.length > 0){
        res.render('quote', {errors, quote, date, valid_until, prepared_by,
                                     customer_id, company_name, address, contact,
                                     model_no, serial_no, mfg_code, payment_terms, special_terms,
                                     work_to_be_performed, confirmed, 
                                     subtotal, discount, total });  // ES6 Syntax
    } else {  

        // Pass basic validations; check to see if quote no. already exists before saving to database
  
        Quote.findOne({quote: quote})
        .then((quote)=>{ // this is a quote object

            if(quote){ // quote object already exists
 
                errors.push({msg: `Duplicate Quote ${req.body.quote}`});
                res.render('quote', {
                    errors, 
                    quote: quote.quote,
                    date, 
                    valid_until, 
                    prepared_by,
                    customer_id, 
                    company_name, 
                    address, 
                    contact,
                    model_no, 
                    serial_no, 
                    mfg_code, 
                    payment_terms, 
                    special_terms,
                    work_to_be_performed, 
                    confirmed, 
                    subtotal, 
                    discount, 
                    total });  // ES6 Syntax   

            } else {  // quote does not exist; quote object is set to null so must use quoteNo

                const newQuote = new Quote(req.body); // req.body is an object, so no need for curly braces
                newQuote.save() // Save to database
                .then((quote)=>{
                    req.flash('success', `Quote ${req.body.quote} Created`);
                    res.redirect('/create/quote');
                })
                .catch((err)=>{
                    console.log(err);
                });
            } // end of if
        })
        .catch((err)=>{
            console.log(err);
        }); // end of findOne

    }  // end of if-else
  
});

// Create New Expense Handler ( when submit button is clicked )
router.post('/expense', (req, res)=>{

    const { employee_name, badge, 
            sun_date, sun_location, mon_date, mon_location, 
            tue_date, tue_location, wed_date, wed_location, 
            thu_date, thu_location, fri_date, fri_location, 
            sat_date, sat_location, 
            ee_phone_sun, ee_phone_mon, ee_phone_tue, ee_phone_wed, 
            ee_phone_thu, ee_phone_fri, ee_phone_sat, ee_phone_subtotal,
            ee_bus_sun, ee_bus_mon, ee_bus_tue, ee_bus_wed, ee_bus_thu, 
            ee_bus_fri, ee_bus_sat, ee_bus_subtotal,
            ee_tools_sun, ee_tools_mon, ee_tools_tue, ee_tools_wed, 
            ee_tools_thu, ee_tools_fri, ee_tools_sat, ee_tools_subtotal,
            com_rental_sun, com_rental_mon, com_rental_tue, com_rental_wed,
            com_rental_thu, com_rental_fri, com_rental_sat, com_rental_subtotal,
            com_phone_sun, com_phone_mon, com_phone_tue, com_phone_wed, 
            com_phone_thu, com_phone_fri, com_phone_sat, com_phone_subtotal,
            com_plane_sun, com_plane_mon, com_plane_tue, com_plane_wed, 
            com_plane_thu, com_plane_fri, com_plane_sat, com_plane_subtotal,
            other_expenses, confirmed, 
            total_expenses, company_paid, due_employee } = req.body;
 
    let errors = [];

    // Check all required fields
    if (!employee_name || !badge || !total_expenses || !company_paid || !due_employee ){
        errors.push({msg: 'Please enter all required fields'});
    }

    if (errors.length > 0 ){
        res.render('expense', {errors, employee_name, badge, 
                                       sun_date, sun_location, mon_date, mon_location, 
                                       tue_date, tue_location, wed_date, wed_location, 
                                       thu_date, thu_location, fri_date, fri_location, 
                                       sat_date, sat_location, 
                                       ee_phone_sun, ee_phone_mon, ee_phone_tue, ee_phone_wed, 
                                       ee_phone_thu, ee_phone_fri, ee_phone_sat, ee_phone_subtotal,
                                       ee_bus_sun, ee_bus_mon, ee_bus_tue, ee_bus_wed, ee_bus_thu, 
                                       ee_bus_fri, ee_bus_sat, ee_bus_subtotal,
                                       ee_tools_sun, ee_tools_mon, ee_tools_tue, ee_tools_wed, 
                                       ee_tools_thu, ee_tools_fri, ee_tools_sat, ee_tools_subtotal,
                                       com_rental_sun, com_rental_mon, com_rental_tue, com_rental_wed,
                                       com_rental_thu, com_rental_fri, com_rental_sat, com_rental_subtotal,
                                       com_phone_sun, com_phone_mon, com_phone_tue, com_phone_wed, 
                                       com_phone_thu, com_phone_fri, com_phone_sat, com_phone_subtotal,
                                       com_plane_sun, com_plane_mon, com_plane_tue, com_plane_wed, 
                                       com_plane_thu, com_plane_fri, com_plane_sat, com_plane_subtotal,
                                       other_expenses, confirmed, 
                                       total_expenses, company_paid, due_employee
                                      });
    } else {
        // Pass basic validations; save to database
        const newExpense = new Expense(req.body); // req.body is an object, so no need for curly braces
        newExpense.save()
        .then((expense)=>{
            req.flash('success', `Expense Report for ${req.body.employee_name} Submitted`);
            res.redirect('/create/expense')
        })
        .catch((err)=>{
            console.log(err);
        });

    } // end of if-else
});

module.exports = router;