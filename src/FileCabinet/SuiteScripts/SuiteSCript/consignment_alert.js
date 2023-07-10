/**
 * @author Jon Olson
 */
function sampleFieldChanged(type, name)
{
	if (name == ('custbody2'))
	{
		var custcat = nlapiGetFieldValue('custbody2');
		if ((custcat) == ("Consignment"))
		{
			alert("This customer has inventory on Consignment.  If the order is for inventory replenishment or addition use Bill and Ship order form.  If invoicing for inventory used from a rep's inventory, proceed with invoice.");
		}
					
	return true;
}}

function sampleSaveRecord()
{

	var shipping = "F";
	var lineNum = nlapiGetLineItemCount('item');
		
	for (i = 1; i <= lineNum; i++) {
		var itname = nlapiGetLineItemValue('item', 'item', i);
		if (itname == 33)
		{
		var shipping = "T";
		}	
	}
	if (shipping != "T")
	{
	alert("Invoice is missing shipping charge")
	return confirm("Save Invoice?")
	}

return true;

}