/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/url'],
/**
 * @param{currentRecord} currentRecord
 * @param{url} url
 */
function(currentRecord, url) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {

    }
    function CallforSuiteletPage(woId){


        var suiteletURL = url.resolveScript({
            scriptId:'customscript_sl_print_traveler_pdf',//Please make sure to replace this with the script ID of your Suitelet
            deploymentId: 'customdeploy_sl_print_traveler_pdf',//Please make sure to replace this with the deployment ID of your Suitelet
            params: {
                'recId':woId,

            }

        });

        //document.location=suiteletURL;
        window.open(suiteletURL, '_blank')
    }


    return {
        pageInit: pageInit,
        CallforSuiteletPage: CallforSuiteletPage

    };
    
});
