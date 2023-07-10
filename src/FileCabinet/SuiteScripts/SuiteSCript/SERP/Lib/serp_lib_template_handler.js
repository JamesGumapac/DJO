/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */

define(['N/file', 'N/xml', 'N/render'],
    /**
     * @param{file} file
     * @param{xml} xml
     */
    function (file, xml, render) {

        /**
         * Build XMLDoc file from template with content Data
         * @param {*} objFile
         * @param {*} content
         * @returns
         */
        function buildFileFromTemplate(templateID, content, fileName, outputFolder) {
            try {

                var objRender = render.create();
                var xmlTmpFile = file.load(templateID);
                objRender.templateContent = xmlTmpFile.getContents();

                objRender.addCustomDataSource({
                    format: render.DataSource.OBJECT,
                    alias: "record",
                    data: content,
                });

                const PDF = objRender.renderAsPdf();

                PDF.name = fileName
                PDF.folder = outputFolder;
                return PDF.save()



            } catch (e) {
                log.error("buildFileFromTemplate", e.message)
            }
        }

        return {
            buildFileFromTemplate: buildFileFromTemplate
        };

    });