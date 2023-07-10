/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */
define(['N/error','N/currentRecord','N/url'],
    function(error,currentRecord,url) {
        function pageInit(context) {
            
        }
       function CallforSuiteletPage(woTranId,woProdStartDate){
        
       var record = currentRecord.get();
       var recId = record.id;
       var recType = record.type
	   var woDate = woProdStartDate
       var woID = woTranId;
       //getValue({fieldId: 'custpage_textfield'});
       var suiteletURL = url.resolveScript({
        scriptId:'customscript_scm_su_printtraveler',//Please make sure to replace this with the script ID of your Suitelet
        deploymentId: 'customdeploy_scm_su_printtraveler',//Please make sure to replace this with the deployment ID of your Suitelet
        params: {
	'recId':recId,
       	'custparam_scm_workorder':woID,
		'custparam_scm_startdate' :woDate
        }

        });
       
     //document.location=suiteletURL;
         window.open(suiteletURL, '_blank')
    	}
        return {
 		CallforSuiteletPage : CallforSuiteletPage,
            pageInit: pageInit
        };
    }); 

        