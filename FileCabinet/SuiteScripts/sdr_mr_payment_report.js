/**
 * @NApiVersion 2.0
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define(['N/search'],
/**
 * @param{search} search
 */
function(search) {
   
    /**
     * Marks the beginning of the Map/Reduce process and generates input data.
     *
     * @typedef {Object} ObjectRef
     * @property {number} id - Internal ID of the record instance
     * @property {string} type - Record type id
     *
     * @return {Array|Object|Search|RecordRef} inputSummary
     * @since 2015.1
     */
    function getInputData() {
        return{
            type: 'search',
            id: 153
        };
    }

    /**
     * Executes when the map entry point is triggered and applies to each key/value pair.
     *
     * @param {MapSummary} context - Data collection containing the key/value pairs to process through the map stage
     * @since 2015.1
     */
    function map(context) {
        var paymentResult=JSON.parse(context.value);

        log.debug('context.values (map)', context.value);

        /*
        *
{
  "recordType": "customerpayment",
  "id": "21412",
  "values": {
    "entity": {
      "value": "866",
      "text": "Bosch, München"
    },
    "statusref": {
      "value": "deposited",
      "text": "Deposited"
    },
    "amountpaid": ".00"
  }
}
        * */

        var customer=paymentResult.values.entity.text;
        var status=paymentResult.values.statusref.text;
        var amount=paymentResult.value.amountpaid;

        context.write({
            key:customer,
            value: {
                status: status,
                amount: amount
            }
        });

    }

    /**
     * Executes when the reduce entry point is triggered and applies to each group.
     *
     * @param {ReduceSummary} context - Data collection containing the groups to process through the reduce stage
     * @since 2015.1
     */
    function reduce(context) {
        var depositedT=0;
        var undepositedT=0;

        for(var i in context.values){
            var val=JSON.parse(context.values[i]);
            if(val.status=='Deposited'){
                depositedT += parseFloat(val.amount);
            }
            if(val.status=='Not Deposited'){
                undepositedT += parseFloat(val.amount);
            }
        }
        log.debug(context.key,' Deposit Total : ' + depositedT + '\n'+
                                'Undeposited Total :' + undepositedT
        );
    }


    /**
     * Executes when the summarize entry point is triggered and applies to the result set.
     *
     * @param {Summary} summary - Holds statistics regarding the execution of a map/reduce script
     * @since 2015.1
     */
    function summarize(summary) {
        var type=summary.toString();
        log.audit(type + 'Usage Consumed ', summary.usage);
        log.audit(type + 'Number of Queues used', summary.concurrency);
        log.audit(type + 'Number of Yields done ', summary.yields);

    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    };
    
});
