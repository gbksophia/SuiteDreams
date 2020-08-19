/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define([],

function() {
    
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
        var employee=context.currentRecord;
        var perfRevCount=employee.getLineCount({
            sublistId: 'recmachcustrecord_sdr_perf_subordinate'
        });
        var notes ='This employee has '+ perfRevCount + ' performance reviews. \n';

        var fRatingCount =0;
        for(var i=0; i<perfRevCount; i++){
            var ratingCode=employee.getSublistValue({
                sublistId: 'recmachcustrecord_sdr_perf_subordinate',
                fieldId: 'custrecord_sdr_perf_rating_code',
                line: i
            });

            if(ratingCode == 'F'){
                fRatingCount +=1;
            }
        }
        notes += 'This employee has ' + fRatingCount + ' F-rated reviews';
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
        var employee=context.currentRecord;
        if(context.fieldId=='phone'){
            var fax=employee.getValue('fax');
            if(!fax){
                var phone=employee.getValue('phone');
                employee.setValue('fax',phone);
            }
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
        var employee = context.currentRecord;
        if(context.sublistId == 'recmachcustrecord_sdr_perf_subordinate'){
            var reviewType=employee.getCurrentSublistValue({
                sublistId : 'recmachcustrecord_sdr_perf_subordinate',
                fieldId : 'custrecord_sdr_perf_review_type'
            });
            if(!reviewType){
                employee.setCurrentSublistValue({
                    sublistId : 'recmachcustrecord_sdr_perf_subordinate',
                    fieldId : 'custrecord_sdr_perf_review_type',
                    value: 1 //Salary Change
                });
                /*
                employee.setCurrentSublistText({
                    sublistId : 'recmachcustrecord_sdr_perf_subordinate',
                    fieldId : 'custrecord_sdr_perf_review_type',
                    value: 'Salary Change'
                });
                */

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
        var employee=context.currentRecord;
        if(context.fieldId=='custentity_sdr_employee_code'){
            var empCode=employee.getValue('custentity_sdr_employee_code');
            if(empCode=='x'){
                alert('Invalid Employee Code value. Please try again.');
                empCode=employee.setValue('custentity_sdr_employee_code','');
                return false;
            }
        }
        return true;
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
        var employee =context.currentRecord;
        if(context.sublistId== 'recmachcustrecord_sdr_perf_subordinate'){
            var increaseAmount=employee.getCurrentSublistValue({
                sublistId : 'recmachcustrecord_sdr_perf_subordinate',
                fieldId : 'custrecord_sdr_perf_sal_incr_amt'
            });
            if(increaseAmount > 5000) {
                alert('Salary increased amount cannot be greater than 5,000.');
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
        var employee=context.currentRecord;
        var empCode=employee.getValue('custentity_sdr_employee_code');

        if(empCode=='x'){
            alert('Invalid Employee Code value. Please try again.');
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
        validateDelete: validateDelete,
        */

        saveRecord: saveRecord
    };
    
});
