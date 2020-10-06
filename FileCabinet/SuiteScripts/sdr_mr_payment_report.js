/**
 * @NApiVersion 2.0
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define(['N/search', 'N/runtime'],
/**
 * @param {search} search
 * @param {runtime} runtime
 */
function(search, runtime) {
   
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

        //sdr_ue_customer에서 전달받은 파라미터값 변수에 저장.
        var customerId=runtime.getCurrentScript().getParameter({
            name: 'custscript_sdr_customer_id'
        });

        //log.debug('Customer Id (Script Parameter)', customerId);

        var paymentSearch=search.create({
            type: search.Type.TRANSACTION,
            filters: [['type', search.Operator.ANYOF, 'CustPymt'], 'and',
                      ['mainline', search.Operator.IS, true], 'and',
                      ['entity', search.Operator.ANYOF, customerId]  //entity=name
                     ],
            columns: ['entity', 'statusref', 'amount'] // 'amountpaid']
        });

        return paymentSearch;


        /*
        return{
            type: 'search',
            id: 153
        };
        */

    }

    /**
     * Executes when the map entry point is triggered and applies to each key/value pair.
     *
     * @param {MapSummary} context - Data collection containing the key/value pairs to process through the map stage
     * @since 2015.1
     */
    function map(context) {
        var paymentResult=JSON.parse(context.value);

        //log.debug('context.value (map)', context.value);

/*

{
  "recordType": "customerpayment",
  "id": "49",
  "values": {
    "entity": {
      "value": "22",
      "text": "Bay Media Research"
    },
    "statusref": {
      "value": "deposited",
      "text": "Deposited"
    },
    "amountpaid": ".00"
  }
}

{
  "recordType": "customerpayment",
  "id": "51",
  "values": {
    "entity": {
      "value": "30",
      "text": "Jenning Financial"
    },
    "statusref": {
      "value": "notDeposited",
      "text": "Not Deposited"
    },
    "amountpaid": ".00"
  }
}

*/

        //var customer=paymentResult.values.entity.text;
        //var status=paymentResult.values.statusref.value;
        //var amount=paymentResult.value.amountpaid;

        context.write({
            key: paymentResult.values.entity.text,
            value: {
                status: paymentResult.values.statusref.value,
                amount: paymentResult.values.amount //amountpaid
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
            var value=JSON.parse(context.values[i]);

            //log.debug('context.values[i].status',value.status);
            //log.debug('context.values[i].amount',value.amount);

            if(value.status =='deposited'){
                depositedT += parseFloat(value.amount);
            }
            if(value.status =='notDeposited'){
                undepositedT += parseFloat(value.amount);
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
        log.audit(type + ' Usage Consumed ', summary.usage);
        log.audit(type + ' Number of Queues used ', summary.concurrency);
        log.audit(type + ' Number of Yields done ', summary.yields);


    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    };
    
});
