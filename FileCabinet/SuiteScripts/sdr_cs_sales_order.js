/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record'],
/**
 * @param{record} record
 */
function(record) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */

    function promiseCall(id) {
        record.load.promise({
            type:record.Type.SALES_ORDER,
            id: id
        }).then(function(salsesOrder){
            var total=salesOrder.getValue('total');
            console.log('Total',total);
        });
    }

    function nonpromiseCall(id){
        var salesOrder=record.load({
            type:record.Type.SALES_ORDER,
            id:id
        });
        var total=salesOrder.getValue('total');
        console.log('Total',total);

    }

    function pageInit(context) {

        /* 44/171 requests, Finish:1.4 min, Load:5.43 s
        nonpromiseCall(33);
        nonpromiseCall(41);
        nonpromiseCall(55);
        nonpromiseCall(57);
        nonpromiseCall(59);
        nonpromiseCall(88);
        nonpromiseCall(125);
        nonpromiseCall(157);
        nonpromiseCall(159);
        nonpromiseCall(166);
        nonpromiseCall(170);
        nonpromiseCall(184);
        nonpromiseCall(289);
        nonpromiseCall(304);
        nonpromiseCall(306);
        nonpromiseCall(309);
        nonpromiseCall(332);
        nonpromiseCall(336);
        nonpromiseCall(338);
        nonpromiseCall(339);
        */

        /* 42/169, Finish: 10.75 s, Load:4.23 s
        Each promise call runs independently from the main thread.
        This allows the script to make multiple server calls without waiting
        from the previous server call to finish; making this a more efficient
        approach than the nonpromise call.  */
        promiseCall(33);
        promiseCall(41);
        promiseCall(55);
        promiseCall(57);
        promiseCall(59);
        promiseCall(88);
        promiseCall(125);
        promiseCall(157);
        promiseCall(159);
        promiseCall(166);
        promiseCall(170);
        promiseCall(184);
        promiseCall(289);
        promiseCall(304);
        promiseCall(306);
        promiseCall(309);
        promiseCall(332);
        promiseCall(336);
        promiseCall(338);
        promiseCall(339);
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
    function fieldChanged(scriptContext) {

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
    function lineInit(scriptContext) {

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
    function validateField(scriptContext) {

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
    function validateLine(scriptContext) {

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
    function saveRecord(scriptContext) {

    }

    return {
        pageInit: pageInit,
/*        fieldChanged: fieldChanged,
        postSourcing: postSourcing,
        sublistChanged: sublistChanged,
        lineInit: lineInit,
        validateField: validateField,
        validateLine: validateLine,
        validateInsert: validateInsert,
        validateDelete: validateDelete,
        saveRecord: saveRecord*/
    };
    
});
