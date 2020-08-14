/**
 * @NScriptType UserEventScript
 * @NAPIVersion 2.0
 */

define([],

    function() {

        return {
            afterSubmit:function (context) {
                //log.debug("hello world");

                var customer=context.newRecord;
                var customerId=customer.getValue('entityid');
                var customerEmail=customer.getValue('email');
                var salesrepName=customer.getText('salesrep');
                var couponCode=customer.getValue('custentity_sdr_coupon_code');

                log.audit('CUSTOMER ID', customerId);
                log.audit('Customer Email',customerEmail);
                log.audit('SALES REP Name', salesrepName);
                log.audit('COUPON CODE',couponCode);

           }

        };

    });
