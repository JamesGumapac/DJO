/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(["N/record","N/runtime","N/https", "../serp_lib_template_handler", "../serp_lib_print_traveler"],
    /**
     * @param record
     * @param runtime
     * @param https
     * @param lib_template_helper
     * @param lib_print_helper
     */
    (record,runtime,https, lib_template_helper, lib_print_helper) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (context) => {
            const objRequest = context.request;
            const workOrderId = parseInt(objRequest.parameters.recId);
            const XMLTemplate = "serp_traveler_xml.xml"
            if (context.request.method === "GET") {
                try {
                    let data = {}

                    const companyRec = record.load({
                        type: "customrecord_serp_company",
                        id: runtime.getCurrentScript().getParameter("custscript_serp_company_name")
                    })
                    const companyName = companyRec.getValue("custrecord_serp_company_name")
                    const operationColumns = lib_print_helper.getExistingOperations(workOrderId)
                    data.mainFields = lib_print_helper.getMainFields(workOrderId,companyName)
                    data.operations = operationColumns
                    const xmlFileId = lib_print_helper.getFileId(XMLTemplate)
                    if(!data.operations.length < 0){
                        context.response.write(`<html><h1>No Opearations</h1></html>`)
                        return
                    }
                    let fileName = `WO_${data.mainFields.tranid}`
                    let folderId = -15
                    const XMLCOntent = lib_template_helper.buildFileFromTemplate(xmlFileId, data, fileName, folderId)

                    context.response.sendRedirect({
                        type: https.RedirectType.MEDIA_ITEM,
                        identifier: XMLCOntent
                    })
                } catch (e) {
                    context.response.write(`Cannot Print PDF error message:"${e.message.toUpperCase()}"`)
                }
            }
        }

        return {onRequest}

    });
