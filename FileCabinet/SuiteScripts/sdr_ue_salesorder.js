/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/redirect'],
/**
 * @param{record} record
 * @param{redirect} redirect
 */
function(record, redirect) {
   
    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {string} scriptContext.type - Trigger type
     * @param {Form} scriptContext.form - Current form
     * @Since 2015.2
     */
    function beforeLoad(scriptContext) {

    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function beforeSubmit(scriptContext) {

    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function afterSubmit(context) {
        var salesOrder=context.newRecord;
        var customer=salesOrder.getText('entity');
        var date=salesOrder.getValue('trandate');
        var orderNum=salesOrder.getValue('tranid');
        var total=salesOrder.getValue('total');
        var financePrice=salesOrder.getValue('custbody_sdr_financing_price');
        var orderId=salesOrder.id;

        //sdr_sl_salesorder_finance.js Suitelet에 URL 파라미터로 값 전달.
        redirect.toSuitelet({
            scriptId:'customscript_sdr_salesorder_finance',
            deploymentId: 'customdeploy_sdr_sl_salesorder_finance',
            parameters: {
                sdr_ordernum:orderNum,
                sdr_customer:customer,
                sdr_total: total,
                sdr_financeprice:financePrice,
                sdr_orderid:orderId
            }
        });

    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});
