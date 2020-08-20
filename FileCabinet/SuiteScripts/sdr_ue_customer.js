/**
 * @NScriptType UserEventScript
 * @NAPIVersion 2.0
 */

define(['N/record','N/email','N/runtime'],
    /**
     * @param {record} record
     * @param {email} email
     * @param {rumtime} runtime
     */
    function(record, email, runtime) {

        return {
            beforeSubmit:function (context) {
                var customer=context.newRecord;
                if(context.type == context.UserEventType.CREATE){
                    var salesRep=customer.getValue('salesrep');
                    if(!salesRep){
                        throw 'Save failed. Please make sure that the Sales Rep field is not empty. ';
                    }
                }
            },
            afterSubmit:function (context) {
                //log.debug("hello world");

                var customer=context.newRecord;
                var customerId=customer.getValue('entityid');
                var customerEmail=customer.getValue('email');
                //var salesrepName=customer.getText('salesrep');
                var couponCode=customer.getValue('custentity_sdr_coupon_code');

                log.audit('CUSTOMER ID', customerId);
                log.audit('Customer Email',customerEmail);
                //log.audit('SALES REP Name', salesrepName);
                log.audit('COUPON CODE',couponCode);

                if(context.type==context.UserEventType.CREATE){
                    var task=record.create({
                        type:record.Type.TASK,
                        defaultValues: {
                            customform: -120
                        }
                    });
                    task.setValue('title','New Customer Follow-up.');
                    task.setValue('message','Please take care of this customer and follow-up with them soon.');
                    task.setValue('priority','HIGH');
                    task.setValue('company',customer.id);
                    var salesrep=customer.getValue('salesrep');
                    if(salesrep){
                        task.setValue('salesrep',salesrep);
                    }
                    task.save();
                }

                var user=runtime.getCurrentUser();
                email.send({
                    author: user.id,
                    recipients: customer.id,
                    subject: 'Welcome to SuiteDreams',
                    body: 'Welcome! We are glad for you to be a customer of SuiteDreams.'
                });

                var event=record.create({
                    type: record.Type.CALENDAR_EVENT, //'calendarevent',
                    isDynamic:true
                });

                event.setValue('title','Welcome conversation with '+ customer.getValue('entityid'));
                event.setValue('sendemail',true);
                event.setValue('company',customer.id);

                event.selectNewLine({sublistId: 'attendee'});
                event.setCurrentSublistValue({
                    sublistId:'attendee',
                    fieldId:'attendee',
                    value: customer.id
                });
                event.commitLine({sublistId:'attendee'});

                event.selectNewLine({sublistId:'attendee'});
                event.setCurrentSublistValue({
                    sublistId:'attendee',
                    fieldId:'attendee',
                    value: customer.getValue('salesrep')
                });
                event.commitLine({sublistId:'attendee'});

                event.save();
           }
        };

    });
