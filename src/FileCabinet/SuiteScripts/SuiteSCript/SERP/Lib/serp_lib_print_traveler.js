/**
 * @NApiVersion 2.1
 */
define(['N/record', 'N/redirect', 'N/render', 'N/runtime', 'N/search'],
    /**
     * @param{record} record
     * @param{redirect} redirect
     * @param{render} render
     * @param{runtime} runtime
     * @param{search} search
     */
    (record, redirect, render, runtime, search) => {
        /**
         * Get the existing operation of the work order
         * @param {int} woId work order Id
         * @returns {object}
         */
        function getExistingOperations(woId) {
            try {
                let operationsObj = []
                const manufacturingoperationtaskSearchObj = search.create({
                    type: "manufacturingoperationtask",
                    filters:
                        [
                            ["workorder", "anyof", woId]
                        ],
                    columns:
                        [
                            search.createColumn({name: "sequence", label: "Operation Sequence"}),
                            search.createColumn({name: "name", label: "Operation Name"}),
                            search.createColumn({name: "predecessor", label: "Predecessor"}),
                            search.createColumn({name: "manufacturingworkcenter", label: "Manufacturing Work Center"}),
                            search.createColumn({name: "inputquantity", label: "Input Quantity"}),
                            search.createColumn({name: "startdatetime", label: "Start Date"}),
                            search.createColumn({name: "enddatetime", label: "End Date"}),
                            search.createColumn({name: "runrate", label: "Run Rate (Min/Unit)"}),
                            search.createColumn({name: "setuptime", label: "Setup Time (Min)"}),
                            search.createColumn({name: "runtime", label: "Run Time"}),
                            search.createColumn({
                                name: "formulatext",
                                formula: "{message}",
                                label: "Comments"
                            })
                        ]
                });
                manufacturingoperationtaskSearchObj.run().each(function (result) {
                    let runtime = result.getValue({name: "runtime"})
                    let runrate = result.getValue({name: "runrate"})
                    runtime = parseFloat(runtime)
                    runrate = parseFloat(runrate)
                    operationsObj.push({
                        sequence: result.getValue({name: "sequence"}),
                        name: result.getValue({name: "name"}),
                        manufacturingworkcenter: result.getText({name: "manufacturingworkcenter"}),
                        predecessor: result.getText({name: "predecessor"}),
                        inputquantity: result.getValue({name: "inputquantity"}),
                        startdate: result.getValue({name: "startdatetime"}),
                        enddate: result.getValue({name: "enddatetime"}),
                        setuptime: result.getValue({name: "setuptime"}),
                        runtime: runtime.toFixed(2),
                        runrate: runrate.toFixed(2),
                        comments: result.getValue({
                            name: "formulatext",
                            formula: "{message}",
                        }),
                    })
                    return true;
                });
                return operationsObj
            } catch (e) {
                log.error("getExistingOperations", e.message)
            }

        }

        /**
         * Get the Work Order MAIN Fields
         * @param {int} woId work order Id
         * @param {string} companyName
         * @return {{tranid: *, item: *, dateCreated: *, printDate: string, location: *}}
         */
        function getMainFields(woId, companyName) {
            try {
                const workOrderRec = record.load({
                    type: record.Type.WORK_ORDER,
                    id: woId
                })
                const date = new Date();

                let day = date.getDate();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();
                var time = date.getHours() + ":" + date.getMinutes()
                const printDate = `${month}/${day}/${year} ${time} `
                return {
                    tranid: workOrderRec.getValue("tranid"),
                    location: workOrderRec.getText("location"),
                    dateCreated: workOrderRec.getText("trandate"),
                    item: workOrderRec.getText("assemblyitem"),
                    printDate: printDate,
                    lotNumber: workOrderRec.getText("custbody_lot_format"),
                    companyName: workOrderRec.getText("custbody_serp_company")
                }
            } catch (e) {
                log.error("getMainFields", e.message)
            }
        }

        /**
         * Return file Id based on filename
         * @param fileName
         * @returns {number}
         */
        function getFileId(fileName) {
            const fileSearch = search
                .create({
                    type: "file",
                    filters: [["name", "is", fileName]],
                })
                .run()
                .getRange({start: 0, end: 1});
            return fileSearch[0].id;
        }

        return {getFileId, getExistingOperations, getMainFields}

    });
