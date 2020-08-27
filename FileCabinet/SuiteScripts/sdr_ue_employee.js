/**
 * @NScriptType UserEventScript
 * @NAPIVersion 2.0
 */

define(['N/record', 'N/redirect'],
    /**
     * @param {record} record
     * @param {redirect} redirect
     */
    function(record, redirect) {

        return {
            afterSubmit:function (context) {
                //log.debug("Hello World");

                var employee=context.newRecord;
                var empCode=employee.getValue('custentity_sdr_employee_code');
                //var supervisorName=employee.getText('supervisor');
                var supervisorId=employee.getValue('supervisor');

                //employee.setValue('custentity_sdr_employee_code','EMP002');

                log.debug('Employee Code',empCode);
                log.debug('Supervisor ID',supervisorId);
                //log.debug('Supervisior Name',supervisorName);


               if(context.type == context.UserEventType.CREATE){

                    var phoneCall=record.create({
                        type:record.Type.PHONE_CALL,
                        // SuiteDreams Phone Call Form(phone 필수항목) 사용하지 않고,
                        // Standard Phone Call Form(internal id:-150)을 사용하겠다...
                        defaultValues:{
                            customform: -150
                        }
                    });

                    phoneCall.setValue('title','Call HR for benefits.');
                    phoneCall.setValue('assigned', employee.id);
                    phoneCall.save();

                    var event=record.create({
                        type: record.Type.CALENDAR_EVENT,
                        isDynamic : true
                    });
                    event.setValue('title', 'Welcome meeting with supervisor');
                    event.selectNewLine({
                        sublistId:'attendee'
                    });
                    event.setCurrentSublistValue({
                        sublistId: 'attendee',
                        fieldId: 'attendee',
                        value: employee.id
                    });
                    event.commitLine({ sublistId:'attendee'});
                    event.setCurrentSublistValue({
                        sublistId: 'attendee',
                        fieldId: 'attendee',
                        value: employee.getValue('supervisor')
                    });
                   event.commitLine({ sublistId:'attendee'});
                   event.save();
                }

               redirect.toSuitelet({
                   scriptId: 'customscript_sdr_sl_update_emp_notes',
                   deploymentId: 'customdeploy_sdr_sl_update_emp_notes',
                   parameters: {
                       sdr_name:employee.getValue('entityid'),
                       sdr_notes:employee.getValue('comments'),
                       sdr_empid:employee.id
                   }
               });

           }

        };

    });
