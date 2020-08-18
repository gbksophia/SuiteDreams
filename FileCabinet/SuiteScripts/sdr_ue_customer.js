/**
 * @NScriptType UserEventScript
 * @NAPIVersion 2.0
 */

define(['N/record'],
    /**
     * @param {record} record
     */
    function(record) {

        return {
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
                        type:record.Type.TASK
                    });
                    task.setValue('title','New Customer Follow-up.');
                    task.setValue('message','Please take care of this customer and follow-up with them soon.');
                    task.setValue('priority','HIGH');
                    task.setValue('company',customer.id);
                    task.save();
                }

           }

        };

    });
