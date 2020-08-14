/**
 * @NScriptType UserEventScript
 * @NAPIVersion 2.0
 */

define([],

    function() {

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
           }

        };

    });
