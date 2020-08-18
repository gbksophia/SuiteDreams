/**
 * @NScriptType UserEventScript
 * @NAPIVersion 2.0
 */

define(['N/record'],
    /**
     *     ['N/module'] varName
     * @param {record} record
     *
     */
    function(record) {

        return {
            afterSubmit:function (context) {
                //log.debug("Hello World");

                var employee=context.newRecord;
                var empCode=employee.getValue('custentity_sdr_employee_code');
                var supervisorName=employee.getText('supervisor');
                var supervisorId=employee.getValue('supervisor');

                //employee.setValue('custentity_sdr_employee_code','EMP002');

                log.debug('Employee Code',empCode);
                log.debug('Supervisor ID',supervisorId);
                log.debug('Supervisior Name',supervisorName);

                //filtering that the user event that is triggered when creating a new record.
                if(context.type==context.UserEventType.CREATE){
                    //creating phoneCall record.
                    var phoneCall=record.create({
                        type:record.Type.PHONE_CALL
                    });

                    phoneCall.setValue('title','Call HR for benefits');

                    //list 그래서 internal id.
                    phoneCall.setValue('assigned', employee.id);

                    phoneCall.save();
                }
           }

        };

    });
