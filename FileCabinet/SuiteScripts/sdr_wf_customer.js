/**
 * @NApiVersion 2.0
 * @NScriptType workflowactionscript
 */
define(['N/record', 'N/runtime'],
/**
 * @param{record} record
 * @param{runtime} runtime
 */
function(record, runtime) {
   
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @Since 2016.1
     */
    function onAction(context) {
        var orderDate=runtime.getCurrentScript().getParameter({
            name: 'custscript_sdr_order_date'
        });

        var salesOrder=context.newRecord; //신규 생성 또는 편집된 Sales Order.
        var countItems=salesOrder.getLineCount({sublistId:'item'}); // SO의 Items('item') sublist 라인 수.
        var notes='Last Order Date: ' + orderDate + '\n' +
                   'Unique items ordered: ' + countItems;
        var customerId=salesOrder.getValue('entity'); // SO의 Customer('entity') field 값.

        // "Go To Record" Action으로 customerId와 동일한 Customer record로 이동.
        var customer=record.load({
            type: record.Type.CUSTOMER,
            id: customerId
        });

        //Sales Order에서 정보(notes)를 Comments field에 저장.
        customer.setValue('comments', notes);
        customer.save();
    }
    return {
        onAction : onAction
    };
    
});
