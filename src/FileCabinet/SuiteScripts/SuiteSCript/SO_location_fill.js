/**
 * @author Jon Olson
 */

function SOPostSourcing()
{
var toploc = nlapiGetFieldValue('location');
var lineNum = nlapiGetLineItemCount('item');

alert('The line item count is: ' + lineNum)

var i=1

for (i = 1; i <= lineNum; i++) {
var loc = nlapiGetLineItemValue('item','location',i);
alert('toploc = ' + toploc + ' line = ' + i);
alert('The line location is : ' + loc);
nlapiSetLineItemValue('item','location',i,toploc);
nlapiSetLineItemValue('item','quantity',i,3);
var loc = nlapiGetLineItemValue('item','location',i)
alert('The line location is : ' + loc)

}

return confirm(toploc);
}

