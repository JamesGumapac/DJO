/**
 *@NApiVersion 2.0
 *@NScriptType UserEventScript
 */
define(['N/record','N/format','N/runtime','N/log'], function(record,format,runtime,log) {
    function beforeSubmit(context) {
      log.debug('Context',runtime.executionContext);
        if (context.type !== context.UserEventType.EDIT)
            return;

 	if (runtime.executionContext == runtime.ContextType.CSV_IMPORT)
	{

	log.debug('Context',runtime.executionContext);
	try{
        var locRecord = context.newRecord;
        locRecord.setValue('includeinsupplyplanning',false);
      } catch (e) {
       log.error(e);
    }
    }

        
    }
    return {
        beforeSubmit: beforeSubmit
    };
}); 