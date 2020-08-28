/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/redirect', 'N/ui/serverWidget'],
/**
 * @param{record} record
 * @param{redirect} redirect
 * @param{serverWidget} serverWidget
 */
function(record, redirect, serverWidget) {
   
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     * @param {ServerRequest} context.request - Encapsulation of the incoming request
     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
     * @Since 2015.2
     */
    function onRequest(context) {

        var request=context.request;
        var response=context.response;

        if(request.method=='GET'){
            var orderNum=request.parameters.sdr_ordernum;
            var customer=request.parameters.sdr_customer;
            var total=request.parameters.sdr_total;
            var financePrice=request.parameters.sdr_financeprice;
            var orderId=request.parameters.sdr_orderid;

            var form=serverWidget.createForm({
                title: 'Sales Order Financing'
            });

            var helpFld=form.addField({
                id:'custpage_sdr_financing_help',
                type: serverWidget.FieldType.HELP,
                label: 'Please assign a price to the financing of this sales order, then click Submit Financing.'
            });

            var ordernumFld=form.addField({
                id:'custpage_sdr_order_number',
                type: serverWidget.FieldType.TEXT,
                label:'Order #'
            });

            var customerFld=form.addField({
                id: 'custpage_sdr_customer',
                type:serverWidget.FieldType.TEXT,
                label: 'Customer'
            });

            var totalFld=form.addField({
                id:'custpage_sdr_total',
                type: serverWidget.FieldType.CURRENCY,
                label:'Total'
            });

            var financepriceFld=form.addField({
                id:'custpage_sdr_financing_price',
                type: serverWidget.FieldType.TEXT,
                label: 'Financing Price'
            });

            var orderidFld=form.addField({
                id:'custpage_sdr_order_id',
                type:serverWidget.FieldType.TEXT,
                label: 'Sales Order ID'
            });

            ordernumFld.defaultValue=orderNum;
            customerFld.defaultValue=customer;
            totalFld.defaultValue=total;
            financepriceFld.defaultValue=financePrice;
            orderidFld.defaultValue=orderId;

            ordernumFld.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.INLINE
            });

            customerFld.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.INLINE
            });

            totalFld.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.INLINE
            });

            orderidFld.updateDisplayType({
                displayType:serverWidget.FieldDisplayType.HIDDEN
            });

            form.addSubmitButton('Save Finance Info');

            response.writePage(form);
        }else{
            var orderId=request.parameters.custpage_sdr_order_id;
            var financePrice=request.parameters.custpage_sdr_financing_price;

            var salesOrder=record.load({
               type:record.Type.SALES_ORDER,
               id: orderId
           });

            salesOrder.setValue('custbody_sdr_financing_price',financePrice);
            salesOrder.save();

            redirect.toRecord({
                type:record.Type.SALES_ORDER,
                id: orderId
            });

        }

    }

    return {
        onRequest: onRequest
    };
    
});
