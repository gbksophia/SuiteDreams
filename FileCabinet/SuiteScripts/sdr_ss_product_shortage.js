/**
 * @NApiVersion 2.0
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define(['N/search','N/record'],
    /**
     * @param {search} search
     * @Param {record} record
     */
    function(search, record) {

    /**
     * Definition of the Scheduled script trigger point.
     *
     * @param {Object} scriptContext
     * @param {string} scriptContext.type - The context in which the script is executed. It is one of the values from the scriptContext.InvocationType enum.
     * @Since 2015.2
     */

    return {
        execute: function (context) {

            /*
            var prodPrefSearch=search.load({
                id: 'customsearch_sdr_prod_shortage'
            });
            */

            var prodPrefSearch=search.create({
                type: 'customrecord_sdr_prod_pref',
                filters:
                    [
                        search.createFilter({
                            name:'custrecord_sdr_prod_pref_qty',
                            operator: search.Operator.GREATERTHANOREQUALTO,
                            values:2
                        }),
                        search.createFilter({
                            name: 'subsidiary',
                            join: 'custrecord_sdr_prod_pref_customer',
                            operator:search.Operator.ANYOF,
                            values: 1
                        })
                    ],
                columns:
                    [
                        search.createColumn({name: 'custrecord_sdr_prod_pref_customer'}),
                        search.createColumn({name:'email', join: 'custrecord_sdr_prod_pref_customer'}),
                        search.createColumn({name: 'subsidiary', join: 'custrecord_sdr_prod_pref_customer'}),
                        search.createColumn({name: 'custrecord_sdr_prod_pref_item'}),
                        search.createColumn({name:'custrecord_sdr_prod_pref_qty'}),
                        search.createColumn({name: 'quantityavailable', join: 'custrecord_sdr_prod_pref_item'})
                    ]
            });

            var searchResults=prodPrefSearch.run().getRange({
                start:0,
                end:999
            });

            for(var i=0; i<searchResults.length; i++){
                var customerName=searchResults[i].getText({name: 'custrecord_sdr_prod_pref_customer'});
                var email=searchResults[i].getValue({name:'email', join: 'custrecord_sdr_prod_pref_customer'});
                var subsidiary=searchResults[i].getValue({name: 'subsidiary', join: 'custrecord_sdr_prod_pref_customer'});
                var item=searchResults[i].getText({ name:'custrecord_sdr_prod_pref_item'});
                var preferredQty=parseInt(searchResults[i].getValue({name: 'custrecord_sdr_prod_pref_qty'}));
                var available=parseInt(searchResults[i].getValue({name: 'quantityavailable', join: 'custrecord_sdr_prod_pref_item'}));

                log.debug('Product Shortage Info', 'Customer : ' + customerName + '\n' +
                                                    'Customer Email : ' + email + '\n' +
                                                    'Customer Subsidiary : ' + subsidiary + '\n' +
                                                    'Item : ' + item + '\n' +
                                                    'Preferred Quantity : ' + preferredQty+ '\n' +
                                                    'Quantity Available : ' + available);

                if(available<preferredQty){
                    var supportCase=record.create({
                        type: record.Type.SUPPORT_CASE
                    });
                    var company=searchResults[i].getValue({name:'custrecord_sdr_prod_pref_customer'});
                    supportCase.setValue('title', 'Item low for customer');
                    supportCase.setValue('company', company);
                    supportCase.setValue('incomingmessage', 'This company prefers to purchase ' + preferredQty + ' '+ item +
                        ' each time they create a sales order, but only ' + available + ' are left in stock.');
                    supportCase.save();
                }
            }

            //var x=0;
            //var stop='this is a stopper line';
        }
    };

});



//require(['N/search'],
    /**
     * @param {search} search
     */


    //function(search) {

        /*
        var prodPrefSearch=search.load({
            id: 'customsearch_sdr_prod_shortage'
        });
        */

        /*
        var prodPrefSearch=search.create({
            type: 'customrecord_sdr_prod_pref',
            filters:
            [
                search.createFilter({
                    name:'custrecord_sdr_prod_pref_qty',
                    operator: search.Operator.GREATERTHANOREQUALTO,
                    values:2
                }),
                search.createFilter({
                    name: 'subsidiary',
                    join: 'custrecord_sdr_prod_pref_customer',
                    operator:search.Operator.ANYOF,
                    values: 1
                })
            ],
            columns:
            [
                search.createColumn({name: 'custrecord_sdr_prod_pref_customer'}),
                search.createColumn({name:'email', join: 'custrecord_sdr_prod_pref_customer'}),
                search.createColumn({name: 'subsidiary', join: 'custrecord_sdr_prod_pref_customer'}),
                search.createColumn({name: 'custrecord_sdr_prod_pref_item'}),
                search.createColumn({name:'custrecord_sdr_prod_pref_qty'}),
                search.createColumn({name: 'quantityavailable', join: 'custrecord_sdr_prod_pref_item'})
            ]
        });

            var searchResults=prodPrefSearch.run().getRange({
                start:0,
                end:999
            });

            for(var i=0; i<searchResults.length; i++){
                var customerName=searchResults[i].getText('custrecord_sdr_prod_pref_customer');
                var email=searchResults[i].getValue({name:'email', join: 'custrecord_sdr_prod_pref_customer'});
                var subsidiary=searchResults[i].getValue({name: 'subsidiary', join: 'custrecord_sdr_prod_pref_customer'});
                var item=searchResults[i].getValue('custrecord_sdr_prod_pref_item');
                var preferredQty=searchResults[i].getValue('custrecord_sdr_prod_pref_qty');
                var available=searchResults[i].getValue({name: 'quantityavailable', join: 'custrecord_sdr_prod_pref_item'});

                log.debug('Product Shortage Info', 'Customer : ' + customerName + '\n' +
                                                    'Customer Email : ' + email + '\n' +
                                                    'Customer Subsidiary : ' + subsidiary + '\n' +
                                                    'Item : ' + item + '\n' +
                                                    'Preferred Quantity : ' + preferredQty+ '\n' +
                                                    'Quantity Available : ' + available);
            }

            //var x=0;
            var stop='this is a stopper line';

    });
    */
