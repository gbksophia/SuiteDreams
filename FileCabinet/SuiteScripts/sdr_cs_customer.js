/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/https', 'N/url'],
/**
 * @param {https} https
 * @param {url} url
 */
function(https, url) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(context) {
        /*
        var customer=context.currentRecord;
        var applyCoupon=customer.getValue('custentity_sdr_apply_coupon');
        log.debug('Checkbox at Reset/Refresh/First',applyCoupon);
         */

        var customer=context.currentRecord;
        var prodRefCount=customer.getLineCount({
            sublistId: 'recmachcustrecord_sdr_prod_pref_customer'
        });

        var notes= 'This customer has ' + prodRefCount + ' product preferences. \n';

        alert(notes);
    }

    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */
    function fieldChanged(context) {
        //debugger;
        var customer=context.currentRecord;

        if(context.fieldId=='custentity_sdr_apply_coupon'){
            var couponCode=customer.getField({
                fieldId:'custentity_sdr_coupon_code'
            });

            var applyCoupon=customer.getValue('custentity_sdr_apply_coupon');
            log.debug('Checkbox click so it changed',applyCoupon);

            couponCode.isDisabled=!customer.getValue(context.fieldId);
            if(couponCode.isDisabled==false){
                customer.setValue(couponCode.id,'');
                log.debug('Coupon Code Enabled()',couponCode.isDisabled);
            }else if(couponCode.isDisabled==true){
                log.debug('Coupon Code Disabled(value=true)',couponCode.isDisabled);
            }

            /* 내가 초기에 작성한 실행안되는 코드.
            if(applyCoupon=='true'){
                couponCode.isDisabled=false;
                couponCode.setValue('custentity_sdr_coupon_code','');
                log.debug('Coupon Code Enabled',couponCode.isDisabled);
            }else if(applyCoupon=='false'){
                couponCode.isDisabled=true;
                log.debug('Coupon Code Disabled',couponCode.isDisabled);
            }
            */

            /*  https://stackoverflow.com/questions/44183708/netsuite-suitescript-2-0-disable-field-based-on-checkbox

            Turns out that, and I never found this in the documentation, that once you get the field from currentRecord.currentRecord,
            you can set it to disabled via field.isDisabled. Took me forever to find out that isDisabled was a property of field,
            and then took a complete guess to see that isDisabled was a get/set call for ClientSide Scripts.
            Below is the code that ended up working.    Answered by Godrules499 on May 25,2017 at 17:36

            function fieldChanged(scriptContext) {
                var customer = scriptContext.currentRecord;
                if(scriptContext.fieldId == "custentity_sdr_apply_coupon"){
                    debugger;
                    var field = customer.getField("custentity_sdr_coupon_code");

                    field.isDisabled = !customer.getValue(scriptContext.fieldId);
                    if(field.isDisabled){
                        customer.setValue(field.id, "");
                    }
                }
            }
            */

        }
   }

    /**
     * Function to be executed when field is slaved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     *
     * @since 2015.2
     */
    function postSourcing(scriptContext) {

    }

    /**
     * Function to be executed after sublist is inserted, removed, or edited.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    function sublistChanged(scriptContext) {

    }

    /**
     * Function to be executed after line is selected.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    function lineInit(context) {
        var customer=context.currentRecord;
        if(context.sublistId == 'recmachcustrecord_sdr_prod_pref_customer'){
            var qty=parseInt(customer.getCurrentSublistValue({
                sublistId: 'recmachcustrecord_sdr_prod_pref_customer',
                fieldId: 'custrecord_sdr_prod_pref_qty'
            }));
            if(isNaN(qty)){
                customer.setCurrentSublistValue({
                    sublistId: 'recmachcustrecord_sdr_prod_pref_customer',
                    fieldId: 'custrecord_sdr_prod_pref_qty',
                    value: 1
                })
            }
        }
    }

    /**
     * Validation function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @returns {boolean} Return true if field is valid
     *
     * @since 2015.2
     */
    function validateField(context) {
        var customer=context.currentRecord;
        var applyCoupon = customer.getValue('custentity_sdr_apply_coupon');
        var couponCode = customer.getValue('custentity_sdr_coupon_code');
        if(applyCoupon == true && couponCode.length != 5){
            alert('Coupon code must be at least 5 characters long.');
            return false;
        }
    }

    /**
     * Validation function to be executed when sublist line is committed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateLine(context) {
        var customer=context.currentRecord;
        if(context.sublistId == 'recmachcustrecord_sdr_prod_pref_customer'){
            var prefQty=parseInt(customer.getCurrentSublistValue({
                sublistId: 'recmachcustrecord_sdr_prod_pref_customer',
                fieldId: 'custrecord_sdr_prod_pref_qty'
            }));
            if(prefQty>10){
                alert('You have selected a preferred quantity that exceeds the limit of 10.');
                return false;
            }
        }
        return true;
    }

    /**
     * Validation function to be executed when sublist line is inserted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateInsert(scriptContext) {

    }

    /**
     * Validation function to be executed when record is deleted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateDelete(scriptContext) {

    }

    /**
     * Validation function to be executed when record is saved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @returns {boolean} Return true if record is valid
     *
     * @since 2015.2
     */
    function saveRecord(context) {
        var customer=context.currentRecord;
        var applyCoupon = customer.getValue('custentity_sdr_apply_coupon');
        var couponCode = customer.getValue('custentity_sdr_coupon_code');
        if(applyCoupon == true && couponCode.length != 5){
            alert('Coupon code must be at least 5 characters long.');
            return false;
        }

        var sublistId='recmachcustrecord_sdr_prod_pref_customer';
        var prodPrefCount=customer.getLineCount({
            sublistId: sublistId
        });
        for(var i=0, sumProdPrefQty=0; i<prodPrefCount; i++){
            var prodPrefQty=parseInt(customer.getSublistValue({
                sublistId: sublistId,
                fieldId: 'custrecord_sdr_prod_pref_qty',
                line: i
            }));
            sumProdPrefQty= sumProdPrefQty + parseInt(prodPrefQty);
        }
        if(sumProdPrefQty > 25){
            alert('The total preferred quantity across all product preferences has exceeded the limit of 25.');
            return false;
        }
        return true;
    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
/*
        postSourcing: postSourcing,
        sublistChanged: sublistChanged,
*/
        lineInit: lineInit,
        validateField: validateField,
        validateLine: validateLine,
/*
        validateInsert: validateInsert,
        validateDelete: validateDelete,*/
        saveRecord: saveRecord
    };
    
});
