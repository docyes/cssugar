/**
 * CSSugar Constructor.
 *
 * @param {Object} cssjson An object literal representation of CSS folllowing CSS JSON convention (http://featureblend.com/css-json.html).
 *        
 *        Example:
 *        {
 *            "selector-1": {
 *                "property-1" : "value-1",
 *                "property-n" : "value-n"
 *            },
 *            "selector-n": {
 *                "property-1" : "value-1",
 *                "property-n" : "value-n"
 *            }
 *        }
 *
 * @param {Function} selectorEngine
 *        A function to be used to handle the selector matching.
 *        The function gets passed two arguments: 
 *        {String} selector The selector.
 *        {DOMElement} context A DOM element to constrain the selector context, defaults 
 *        to document if not defined in options selectorContext. 
 *        The function should return an Array of matching DOM element references.
 *        If no matches are found, an empty Array is expected.
 * 
 * @param {Object} (Optional) options An object literal representation of options. 
 *        Options:
 *        {DOMElement} selectorContext A DOM element to constrain the selector context.
 *        {Function} processor A function used to handle the processing of 
 *        property/value pairs. The function gets passed one argument:
 *        {Object} An object literal having the following properties:
 *        {String} property The property name.
 *        {String} value The property value.
 *        {String} selector The governing selector.
 *        {Object} cssjson The invoked cssjson object. See constructor argument cssjson documentation.
 *        The function should return an object literal of property/values for replacement.
 *        To remove the property/value completely return and an empty object literal (eg., {})
 */
function CSSugar(cssjson, selectorEngine){
    var options = arguments[2] || {};
    for(var selector in cssjson){
        if(cssjson.hasOwnProperty(selector)){
            var elements = selectorEngine(selector, options.selectorContext || document);
            var properties = cssjson[selector]
            for(var i=0; i<elements.length; i++){
                var element = elements[i];
                for(var property in properties){
                    if(properties.hasOwnProperty(property)){
                        if(options.processor){
                            var processorArguments = {
                                "property": property,
                                "value": properties[property],
                                "selector": selector,
                                "cssjson": cssjson
                            };
                            var processedProperties = options.processor(processorArguments);
                            for(var processedProperty in processedProperties){
                                if(processedProperties.hasOwnProperty(processedProperty)){
                                    element.style[processedProperty] = processedProperties[processedProperty];
                                }
                            }
                        }else{
                            element.style[property] = properties[property];
                        }
                    }
                }
            }
        }
    }
}