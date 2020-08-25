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

        // workflow에서 넘겨받은 script parameter
        var workflowTotal=runtime.getCurrentScript().getParameter({
            name: 'custscript_sdr_workflow_total'
        });

        var expRep=context.newRecord; //Script가 deploy되는 곳이 Expense Report!!!
        var expenseCount=expRep.getLineCount({sublistId: 'expense'}); //Expense Report의 Expenses('expense') Sublist
        var employeeId=expRep.getValue('entity'); //Expense Report의 Employee('entity') 필드
        var notes='Workflow Total : ' + workflowTotal + '\n' +
            'Expense Count : ' + expenseCount;

        //employeeId에 해당하는 Employee record 호출.
        var employee=record.load({
            type: record.Type.EMPLOYEE,
            id: employeeId
        });

        employee.setValue('comments', notes); //expense report 생성 후 comments에 정보 등록.
        employeeId=employee.save();  // save()를 호출하면 업데이트한 record의 internal id를 return한다. 실패시 에러를 리턴.
        if(!employeeId){
            return 'failed';
        }
        return 'success';
    }

    return {
        onAction : onAction
    };
    
});
