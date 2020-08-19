/**
 * @NApiVersion 2.0
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */

require(['N/search'],
    /**
     * @param{search} search
     */
    function(search) {

        /*
        var caseSearch=search.load({
            id: 'customsearch_sdr_escalated_searches'
        });
        */

        var caseSearch=search.create({
            type: search.Type.SUPPORT_CASE,
            filters: [
              search.createFilter({
                  name: 'status',
                  operator: search.Operator.ANYOF,
                  values: 3 // [3,4]  3=Escalated, 4=Re-Opened
              }),
                search.createFilter({
                  name: 'title',
                  join: 'employee',
                  operator: search.Operator.HASKEYWORDS,
                  values: 'Support'
                })
            ],
            columns:[
                search.createColumn({name: 'title'}),
                search.createColumn({name: 'startdate'}),
                search.createColumn({name: 'assigned'}),
                search.createColumn({name: 'status'}),
                search.createColumn({name: 'department', join:'employee'}),
                search.createColumn({name: 'title', join:'employee'}),
            ]
        });

        var searchResults= caseSearch.run().getRange({
            start: 0 ,
            end: 999 //9
        });

        // var x = 0;
        var stop= 'this is a stopper line';

    });




/*
define(['N/search'],
/**
 * @param{search} search
 */

/*
function(search) {
   
    /!**
     * Definition of the Scheduled script trigger point.
     *
     * @param {Object} scriptContext
     * @param {string} scriptContext.type - The context in which the script is executed. It is one of the values from the scriptContext.InvocationType enum.
     * @Since 2015.2
     *!/
    function execute(scriptContext) {
        var caseSearch=search.load({
            id: 'customsearch_sdr_escalated_searches'
        });
        var searchResults= caseSearch.run().getRange({
            start: 0 ,
            end: 9
        });

    }
    return {
        execute: execute
    };

});
*/
