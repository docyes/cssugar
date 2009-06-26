/**
 * Constructor.
 *
 * @param {Object} cssjson An object literal representation of CSS folllowing CSS JSON convention (http://featureblend.com/css-json.html).
 *        
 *        Example:
 *        {
 *            "selector-1": {
 *                "property-1" : "value-1",
 *                "property-n" : "value-n"
 *            }
 *        },
 *        {
 *            "selector-n": {
 *                "property-1" : "value-1",
 *                "property-n" : "value-n"
 *            }
 *        }
 *        
 * @param {Function} selectorEngine
 *        A function to be used to handle the selector matching.
 *        
 *        The function gets passed two arguments: 
 *        {String} selector The selector.
 *        {DOMElement} context A DOM element to constrain the selector context, defaults 
 *        to document if not defined in options selectorContext. 
 *        
 *        The function should return an Array of matching DOM element references.
 *        If no matches are found, an empty Array is expected.
 * 
 * @param {Object} (Optional) options An object literal representation of options. 
 *        Options:
 *        {DOMElement} selectorContext A DOM element to constrain the selector context.
 */    
function CSSugar(cssjson, selectorEngine){
    var options = arguments[2] || {};
    for(var selector in cssjson){
        var elements = selectorEngine(selector, options.selectorContext||document);
        var properties = cssjson[selector]
        for(var i=0; i<elements.length; i++){
            var element = elements[i];
            for(var property in properties){
                element.style[property] = properties[property];
            }
        }
    }
}