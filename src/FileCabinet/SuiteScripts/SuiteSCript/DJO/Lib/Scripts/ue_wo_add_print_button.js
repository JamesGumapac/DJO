/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(["../lib_print_traveler.js"],

    (lib_helper) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (context) => {
            const csScriptId = "cs_wo_print_traveler.js"
            const form = context.form
            const record = context.newRecord
            const recId = record.id
            try {
                if (context.type === context.UserEventType.EDIT || context.type === context.UserEventType.VIEW) {
                    form.clientScriptFileId = lib_helper.getFileId(csScriptId)
                    form.addButton({
                        id: 'custpage_printtraveller_pdf',
                        label: 'Print Traveler PDF',
                        functionName: `CallforSuiteletPage(${recId})`
                    });

                }
            } catch (e) {
                log.error("beforeLoad", e.message)
            }
        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    })
;
