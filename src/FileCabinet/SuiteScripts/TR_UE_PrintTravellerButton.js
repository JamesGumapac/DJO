/**
 *@NApiVersion 2.0
 *@NScriptType UserEventScript
 */
define(['N/record','N/format'], function(record,format) {
    function beforeLoad(context) {
        
        if(context.type == context.UserEventType.EDIT || context.type == context.UserEventType.VIEW){
         try{
         var currentForm = context.form;
         currentForm.clientScriptFileId = 1240792;//Please make sure to replace this with internal ID of 	the Client script file in the File cabinet
		var currentRecord = context.newRecord;
         var wordorderID = currentRecord.getValue('tranid')
         var wordorderProdStartDate = currentRecord.getValue('startdate');
          var wordorderProdStartDate1 = format.format({
            value: wordorderProdStartDate,
            type: format.Type.DATE
        })
         currentForm.addButton({
         id: 'custpage_printtraveller',
         label: 'Print Traveler',
         functionName: 'CallforSuiteletPage("'+wordorderID+'","'+wordorderProdStartDate1+'")'
        });
         }
	catch(e){
	}
        
    }
    
   }
    return {
        beforeLoad: beforeLoad
    };
}); 