/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define(['N/search'],
    /**
     * @param {search} search
     */
    function(search) {

    /**
     * Definition of the Scheduled script trigger point.
     *
     * @param {Object} scriptContext
     * @param {string} scriptContext.type - The context in which the script is executed. It is one of the values from the scriptContext.InvocationType enum.
     * @Since 2015.2
     */
    function execute(context) {
        var prodPrefSearch=search.load({
            id: 'customsearch_sdr_prod_shortage'
        });
        var searchResults=prodPrefSearch.run().getRange({
            start:0,
            end:999
        });


    }

    return {
        execute: execute
    };

});

require(['N/search'],
    /**
     * @param {search} search
     */
    function(search) {

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

        //var x=0;
        var stop='this is a stopper line';

    });
