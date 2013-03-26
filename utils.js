(function (window, document) {

    //------------------------------------
    // GLOBAL VARIABLES
    //------------------------------------
    var location = window.location;
    var navigator = window.navigator;
    var userAgent = navigator.userAgent;

    //------------------------------------
    // UTILS METHODS
    //------------------------------------
    var Utils = {};

    /**
     * Pega o valor de uma propriedade css
     *
     * @param { Element } element Element html
     * @param { String } Propriedade css
     *
     * @example Utils.getCss(mydiv, "width");
     *
     * @return Retorna o valor de uma propriedade css
     */
    Utils.getCss = function (element, property) {
        var result;

        if( !window.getComputedStyle ) {
            if( document.defaultView && document.defaultView.getComputedStyle ) {
                result = document.defaultView.getComputedStyle.getPropertyValue( property );
            } else {
                if( element.currentStyle ) {
                    result = element.currentStyle[property];
                } else {
                    result = element.style[property]
                }
            }
        } else {
            result = window.getComputedStyle(element).getPropertyValue( property );
        }

        return result;
    };

    /**
     * Query selector css elements
     *
     * @param { String | Element } selector Query selector css element to be verified
     * @return { Element } Return element html
     *
     * @example Utils.query('.myclass'); or Utils.query('div'); // return element
     */
    Utils.query = function (selector) {
        var element;
        
        if (document.querySelector) {
           return document.querySelector(selector);
        }

        if (selector === window || selector === document || selector === "body" || selector === "html, body") {
            return document.body;
        }
        
        if (typeof selector === 'string' || selector instanceof String) {
            var expression = {
                    id : /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
                    classname : /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/, 
                    tag : /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/
            };

            var element = null;
            var selectors = selector.split(" ");
            var match = [];
            var token = [];

            for(var i = 0, len = selectors.length; i < len; i++) {
                // Verifica o selector é um id
                if (selectors[i].match(expression.id)) {
                    token = selector.match( expression.id );
                    match = token[1];

                    element = document.getElementById( match );

                    continue;
                } 
                // Verifica o selector é uma classe
                else if (selectors[i].match( expression.classname)) {
                    var tags = document.getElementsByTagName('*'), count = tags.length, founds = [];

                    token = selectors[i].match(expression.classname);
                    match = token[1];

                    for (var k = 0; k < count; k++) {
                        if( tags[k].className && tags[k].className.match(new RegExp("(^|\\s)" + match + "(\\s|$)" ))) {
                            element = tags[k];
                        }
                    }

                    continue;
                } 
                // Verifica o selector é uma tag
                else if (selectors[i].match( expression.tag)) {
                    token = selectors[i].match(expression.tag);
                    match = token[1];

                    if(match === 'body' || match === 'html' || match === 'body, html' || match === 'document') {
                        element = document.body;
                    } else {
                        element = document.getElementsByTagName(match);
                    }
                }
            }
            
            return Utils.isArray(element) ? element[0] : [element][0];
           
        } 
        // if a jQuery element
        else if (Utils.isJquery(selector)) {
            return selector[0];
        } 
        // if a html element
        else {
            return selector;
        }
    };
    
    /**
     * Adds the fix last class
     * 
     * @author Yeremi Loli (https://gist.github.com/yeremi)
     * 
     * @param { Element } element Array List of elements
     * @param { Number } number Amount of items for line
     * @param { String } name Class for the last item
     * 
     * @example 
     * var array = document.getElementById('mylist).getElementsByTagName('li');
     * Utils.fixlast( array, 3, last-child ); // adds class last-child in a 3 item <li class="last-child"></li>
     * 
     * HTML
     * <ul id="mylist">
     *  <li></li>
     *  <li></li>
     *  <li></li>
     *  <li></li>
     *  <li></li>
     *  <li></li>
     * </ul>
     */
    Utils.fixlast = function (element, number, name) {
        var len = element.length;
        
        for (var i = 1; i < len; i++) {
            if ((i % number) === 0) {
                if (name === undefined || name === null) {
                    element[i].style.marginRight = "0px !important";
                } else {
                    Utils.addClass(element[i], name);
                }
            }
        }
    };
    
    /**
     * Check if the class name exist
     * 
     * @param { Element } element Selected elements
     * @param { String } name Class names
     * @return { Boolean } Return true if class name exist
     * 
     * @example Utils.hasClass( document.getElementById('el'), 'myclass' );
     */
    Utils.hasClass = function (element, name) {
        var regex = new RegExp('(\\s|^)' + name + '(\\s|$)');
        
        return (element.className.match(regex) === null) ? false : true;
    };
    
    /**
     * Adds one or more class names to the selected elements
     * 
     * @param { Element } element Selected elements
     * @param { String } name Class names to the selected elements
     * 
     * @example Utils.addClass( document.getElementById('el'), 'myclass' );
     */
    Utils.addClass = function (element, name) {
        if (!Utils.hasClass(element, name)) {
            element.className += (element.className ? ' ' : '') + name;
        }
    };
    
    /**
     * Remobe one or more class names to the selected elements
     * 
     * @param { Element } element Selected elements
     * @param { String } name Class names to the selected elements
     * 
     * @example Utils.removeClass( document.getElementById('el'), 'myclass' );
     */
    Utils.removeClass = function (element, name) {
        var regexp = new RegExp('(\\s|^)' + name + '(\\s|$)');
        
        if (Utils.hasClass(element, name)) {
            element.className = element.className.replace(regexp,' ').replace(/^\s+|\s+$/g, '');
        }
    };
    
    /**
     * Verifica se é um objeto de um determinado tipo e retorna true ou false
     * 
     * @param { Object | Array | Function | String | Boolean | Number } obj Objeto a ser verificado
     * @param { String } type Tipo de objeto para a verificação
     * 
     * @return True caso o objeto passado seja igual ao tipo passado
     * @example Utils.is({}, "object"); //  retorna true
     */
    Utils.is = function (obj, type) {
        return typeof obj === type;
    };
    
    /**
     * Check if argument is a jQuery object.
     * 
     * @param { String } object Value to be verified
     * @return { Boolean } Return true if the object is a jQuery
     * 
     * @example Utils.isJquery($(this)); // return true
     */
    Utils.isJquery = function (object) {
        return (object instanceof jQuery)
    };

    /**
     * Check if argument is a String.
     * 
     * @param { String } object Value to be verified
     * @return { Boolean } Retorna true caso o valor seja uma <strong>String</strong>
     *
     * @example Utils.isString("oi"); // return true
     */
    Utils.isString = function (object) {
        return object && {}.toString.call(object) === '[object String]';
    };
    
    /**
     * Check if argument is an Array.
     * 
     * @param { String } object Value to be verified 
     * @return { Boolean } Retorna true caso o valor seja um <strong>Array</strong>
     *
     * @example Utils.isArray([1, 2, 3]); // return true
     */
    Utils.isArray = function (object) {
        return object && {}.toString.call(object) === '[object Array]';
    };
    
    /**
     * Check if argument is an Objeto.
     *
     * @param { String } object Value to be verified
     * @return { Boolean } Retorna true caso o valor seja um <strong>Objeto</strong>
     *
     * @example Utils.isObject({name: 'roger'}); // return true
     */
    Utils.isObject = function (object) {
        return object && {}.toString.call(object) === '[object Object]';
    };
    
    /**
     * Check if argument is a function
     * 
     * @param { String } object Value to be verified
     * @return { Boolean } Retorna true caso o valor seja uma <strong>Function</strong>
     *
     * @example Utils.isFunction(function(){}); // return true
     *          Utils.isFunction(myfunc); function myfunc(){}; // return true
     */
    Utils.isFunction = function (object) {
        return object && {}.toString.call(object) === '[object Function]';
    };
    
    /**
     * Retorna o tipo do objeto
     * 
     * @param { Object | Array | Function | String | Boolean | Number } obj Objeto a ser verificado
     * 
     * @return Retorna o tipo do objeto
     * @example Utils.type({}) //  retorna "object"
     */
    Utils.type = function (obj) {
        switch (obj.constructor) {
            case Array:
                return "array";
            break;

            case Object:
                return "object";
            break;

            case String:
                return "string";
            break;

            case Function:
                return "function";
            break;

            case Number:
                return "number";
            break;

             case Date:
                return "date";
            break;
        }
    };
    
    /**
     * Get url Variables
     * 
     * @param { String } variable Name of the variable to get value
     * 
     * @example
     * Example URL: http://www.example.com/index.php?id=1&image=awesome.jpg
     * Utils.getQueryVars("id") - would return "1".
     * Utils.getQueryVars("image") - would return "awesome.jpg".
     */
    Utils.getQueryVars = function (variable) {
        var query = window.location.search.substring(1),
            vars = query.split('&'),
            i = 0,
            len = vars.length;
            
        for (; i < len; i++) {
            var pair = vars.split("=");
            if (pair[0] === variable) {
                return pair[1];
            }
        }
    };

    /**
     * Make querystring outof object or array of values
     * @param { Object | Array } object Keys/values
     * @return { String } The querystring
     */
    Utils.setQueryParams = function (object) {
        var array = [];

        for (var key in object) {
            array.push(encodeURIComponent(key) + '=' + encodeURIComponent( object[key]));
        }

        return array.join('&');
    }

    /**
     * ForEach pega um objeto ou array e retorna a posição e o valor em um loop
     *
     * @param { Object | Array } object Array ou Object para o loop
     * @param { Function } callback Função de retorno
     *
     * @example var arr = ["lion", "goat", "snake"];
     * Utils.each(arr, function(i, value) {
     *   console.log("The ", i, " of a ", value, ".");
     * });
     */
    Utils.each = function (object, callback) {
        for (property in object) {
            if (Object.prototype.hasOwnProperty.call(object, property)) {
                callback(property, object[property])
            }
        }

        /*
        var results = [], i = 0;
        for( ; i < object.length; i++) {
            results[i] = callback.call( object, i, object[i] );
        }
        return results;*/
    };

    
    /**
     * Serialize
     *
     * @param { Object | Array | String } obj Objeto a ser serializado
     * @return Retorna uma string do objeto serializado
     *
     * @example Utils.serialize(['utils', 'roger']); // retorna uma string ["utils", "roger"]
     */
    Utils.serialize = function (obj) {
        var result;

        if (!Utils.is(obj, "undefined")) {
            switch (Utils.type(obj)) {
                case "array":
                    result = "[";
                    for (var i = 0; i < obj.length; i++) {
                        if (i > 0) {
                            result += ", ";
                        }

                        result += Utils.serialize(obj[i]);
                    }

                    result += "]";

                    return result;
                break;

                case "string":
                    return '"' + obj + '"';
                break;

                case "number":
                    return isFinite(obj) ? obj.toString() : null;
                break;

                default:
                    if (Utils.is(obj, "object")) {
                        result = [];

                        for (attr in obj) {
                            if (!Utils.is(obj[attr], "function")) {
                                result.push('"' + attr + '": ' + Utils.serialize(obj[attr]));
                            }
                        }

                        return (result.length > 0) ? "{" + result.join(", ") + "}" : "{}";
                    } else {
                        return obj.toString();
                    }
                break;
            }
        }
    };

    Utils.include = function (source) {
        source = (Utils.is(source, "string")) ? [source] : source;

        var i = 0, len = source.length, head = document.getElementsByTagName("head")[0];

        for (; i < len; i++) {
            var script = document.createElement('script');
                script.setAttribute('type', 'text/javascript');
                script.setAttribute('src', source[i]);
            
            head.appendChild(script);
        }
    };

    //------------------------------------
    // AJAX METHODS
    //------------------------------------
    var Ajax = {};
    
    /**
     * Ajax call
     * @param { Object } options Optional, overwrite the default settings, see ajaxSettings
     */
    Ajax.call = function (options) {
        // Default ajax settings
        var settings = {
            url: '',
            type: 'GET',
            async: true,
            cache: true,
            data: null,
            datatype: null,
            contentType: 'application/x-www-form-urlencoded',
            success: null,
            error: null,
            complete: null
        };

        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var opts = Objects.merge(settings, options);

        function ready() {
            if (xhr.readyState === 4) {
                if (xhr.status == 200) {
                    if (Utils.isFunction(opts.success)) {
                        if(opts.datatype === "json") {
                            opts.success.call(opts, JSON.parse(xhr.responseText));
                        } else {
                             opts.success.call(opts, xhr.responseText);
                        }
                    }
                } else {
                    if (Utils.isFunction(opts.error)) {
                        opts.error.call(opts, xhr, xhr.status);
                    }
                }

                if (Utils.isFunction(opts.complete)) {
                    if(opts.datatype === "json") {
                        opts.complete.call(opts, JSON.parse(xhr.responseText));
                    } else {
                        opts.complete.call(opts, xhr.responseText);
                    }
                    
                }
            }
        }

        // prepare options
        if (!opts.cache) {
            opts.url += ((opts.url.indexOf('?') > -1) ? '&' : '?') + '_nocache=' + (new Date()).getTime();
        }

        if (opts.data) {
            if (opts.type === 'GET') {
                opts.url += ((opts.url.indexOf('?') > -1 ) ? '&' : '?') + Utils.setQueryParams(opts.data);
                opts.data = null;
            } else {
                opts.data = Utils.setQueryParams(opts.data);
            }
        }

        // set request
        xhr.open(opts.type, opts.url, opts.async);
        xhr.setRequestHeader('Content-type', opts.contentType);

        if (opts.async) {
            xhr.onreadystatechange = ready;
            xhr.send(opts.data);
        } else {
            xhr.send(opts.data);
            ready();
        }
    };

    /**
     * Ajax GET request
     * @param {string} url
     * @param {string|object} data Containing GET values
     * @param {function} success Callback when request was succesfull
     */
    Ajax.get = function (options) {
        var settings = {
            url: null,
            data: null,
            datatype: null,
            success: null,
            complete: null
        }

        settings = Objects.merge(settings, options);

        if (Utils.isFunction(settings.data)) {
            settings.success = settings.data;
            settings.data = null;
        }

        return Ajax.call({
            url: settings.url,
            type: 'GET',
            datatype: settings.datatype,
            data: settings.data,
            success: settings.success,
            complete: settings.complete
        });
    };

    /**
     * Ajax GET request
     * @param {string} url
     * @param {string|object} data Containing GET values
     * @param {function} success Callback when request was succesfull
     */
    Ajax.getJSON = function (options) {
        var settings = {
            url: null,
            data: null,
            datatype: "json",
            success: null,
            complete: null
        }

        settings = Objects.merge(settings, options);
        
        if (Utils.isFunction(settings.data)) {
            settings.success = settings.data;
            settings.data = null;
        }

        return Ajax.call({
            url: settings.url,
            type: 'GET',
            datatype: settings.datatype,
            data: settings.data,
            success: settings.success,
            complete: settings.complete
        });
    };

    /**
     * Ajax POST request
     * @param {string} url
     * @param {string|object} data Containing post values
     * @param {function} success Callback when request was succesfull
     */
    Ajax.post = function (url, data, success) {
        if (Utils.isFunction(data)) {
            success = data;
            data = null;
        }

        return Ajax.call({
            url: url,
            type: 'POST',
            data: data,
            success: success
        });
    };

    /**
     * Set content loaded by an ajax call
     * @param { Element | String } element Can contain an element or the id of the element
     * @param { Object } options { 
     *     url: The url of the ajax call ( include GET vars in querystring )
     *     type: Optional, the POST data, when set method will be set to POST
     *     complete: ptional, callback when loading is completed
     * }
     */
    Ajax.load = function (element, options) {
        if (Utils.isString(element)) {
            element = Utils.query(element);
        }

        if (typeof options.type === undefined) {
            options.type = "GET";
        }

        Ajax.call({
            url: options.url,
            type: options.type ? 'POST' : 'GET',
            data: options.type || null,
            complete: options.complete || null,
            success: function (data) {
                try {
                    element.innerHTML = data;
                } catch(e) {

                    var ph = document.createElement( 'div' );
                    ph.innerHTML = data;
                    // set new html content
                    for (var x = 0, max = ph.childNodes.length; x < max; x++) {
                        element.appendChild(ph.childNodes[x]);
                    }
                }
            }
        });
    };

    //------------------------------------
    // STRINGS METHODS
    //------------------------------------
    var Strings = {};
    
    /**
     * Remove todos os espaços em brancos
     * 
     * @param { String } str
     * @return Retorna a string com os espaços corretos
     * 
     * @example Strings.trim(" olá   eu    sou uma string com     espaços   "); // retorno olá eu sou uma string com espaços
     */
    Strings.trim = function (str) {
        //return str.replace(/^\s+|\s+$/g, '');
        return str.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' ');
    };

    Strings.trimLeft = function (str) {
        return str.replace(/^\s+/, '');
    };

    Strings.trimRight = function (str) {
        return str.replace(/\s+$/, '');
    };

    /**
     * Verifica se na string passada tem a substring
     *
     * @param { String } str String onde sera feita a pesquisa
     * @param { String } value Grupo de caracteres para a pesquisa
     *
     * @return Retorna true caso o valor exista na pesquisa
     */
    Strings.contains = function ( str, value ) {
        // !!~ transforma o resultado em boolean, < 0 false > 0 true
        return !!~('' + str).indexOf(value);
    };
    
    //------------------------------------
    // BROWSER METHODS
    //------------------------------------
    var Browser = {};
    
    /**
     * Check version
     *
     * @return Return the version of browser
     */
    Browser.version = (userAgent.match(/.+(?:rv|it|ra|ie|me|ve)[\/: ]([\d.]+)/) || [])[1];
    
    Browser.app = {
        chrome: /Chrome/.test(userAgent),
        safari: /Webkit/.test(userAgent) && !/Chrome/.test(userAgent),
        opera: /Opera/.test(userAgent),
        firefox: /Firefox/.test(userAgent),
        msie: /msie/.test(userAgent) && !/Opera/.test(userAgent),
        
        android: /Android/.test(userAgent),
        androidVersion: (userAgent.match(/.+(?:Android)[\/: ]([\d.]+)/) || [0, 0] )[1],
        
        iphone: /iPhone|ipod/.test(userAgent),
        iphoneVersion: (userAgent.match(/.+(?:iPhone\ os)[\/: ]([\d_]+)/ ) || [0,0])[1].toString().split('_').join('.'),
        
        ipad: /iPad/.test(userAgent),
        ipadVersion: (userAgent.match(/.+(?:cpu\ os)[\/: ]([\d_]+)/ ) || [0,0])[1].toString().split('_').join('.'),
        
        blackberry: /Browser.app/.test(userAgent),
        
        winMobile: /Windows\ Phone/.test(userAgent),
        winMobileVersion: (userAgent.match(/.+(?:Windows\ Phone\ os)[\/: ]([\d_]+)/ ) || [0,0])[1],
    }
    
    /**
     * Check is mobile device
     *
     * @return Return true if a mobile browser
     */
    Browser.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|ZuneWP7/i.test(userAgent);
    
    //------------------------------------
    // NUMBERS METHODS
    //------------------------------------
    var Numbers = {};
    
    /**
     * Retorna um numero decimal com o numero de casas fixo
     *
     * @param { Number } value Valor a arrendondar
     * @param { Number } decimals Quantidade de casas depois da vírgula
     *
     * @return Retorna o numeto arrendondado
     * @example Numbers.decimal(0.23344533, 2, true); // return 0.23
     */
    Numbers.decimal = function (value, decimals) {
        var rounded;

        if (value.toFixed) {
            rounded = value.toFixed(parseInt(decimals))
        } else {
            rounded = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
        }
        
        return rounded;
    };
    
    //------------------------------------
    // ARRAY METHODS
    //------------------------------------
    var Arrays = {};

    //------------------------------------
    // OBJECTS METHODS
    //------------------------------------
    var Objects = {};

    /**
     * Pega dois objetos e junta o valor do segundo com o valor do primeiro
     *
     * @param { Object } first Objeto com valores default
     * @param { Object } second Objeto com novos valores para passar ao prineiro objeto 
     * @return Retorna o valor combinado dos dois objetos
     *
     * @example var settings = { name : "Roger", last: null };
     *          var options = { last: "Luiz" }
     *          Objects.merge(settings, options); // retorno { name: "Roger", last: "Luiz" }
     */
    Objects.merge = function (first, second) {
        var options = {};
        for (var key in first) {
            options[key] = Utils.is(second[key], 'undefined') ? first[key] : second[key];
        }

        return options;
    }

    /**
     * It takes two objects and copies all properties from the second object onto the first
     * Pega dois objetos e copia todas as propriedades do segundo objeto para o primeiro
     * 
     * @param { Object } destination Primeito objeto que tera as propriedades do segundo
     * @param { Object } parameters Propriedades novas para o primeiro objeto
     * 
     * @example Objects.extend(options, { sourceElement: 'names_list' });
     */
    Objects.extend = function (destination, parameters) {
        for (var property in parameters) {
            if (Utils.is(parameters[property], "object")) {
                destination[property] = destination[property] || {};
                arguments.callee(destination[property], parameters[property]);
            } else {
                destination[property] = parameters[property];
            }
        }
        
        return destination;
    };
    
    //------------------------------------
    // VALIDATES METHODS
    //------------------------------------
    var Valida = {};
    
    /**
     * Validates formulário
     * 
     * @param { Element } form Elemento form
     * @return Returna true caso tados os campos sejam diferentes de branco
     * 
     * @example <form onsubmit="return Valida.fields(this);"></form>
     */
    Valida.fields = function (form) {
        var required = [];

        for (var i = 0; i < form.length; i++) {
            if (form[i].getAttribute("data-required")) {
                required.push(form[i]);

                if (form[i].value === "") {
                    if (form[i].getAttribute("data-msg")) {
                        alert(form[i].getAttribute("data-msg"));
                    } else {
                        alert("O campo " + form[i].name + " é obrigatório.");
                    }

                    form[i].focus();

                    return false;
                }
            }
        }

        return true;
    };

    /**
     * Validates email
     * 
     * @param { String } value Address of email in the string format
     * @return Returns true if an e-mail validates
     * 
     * @example Valida.mail('mail@gmail.com') return true
     */
    Valida.mail = function (value) {
      var regexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
      
      return regexp.test(value);
    };
    
    /**
     * Validates a cpf
     * 
     * @param { String | Number } value Number or string of CPF
     * @return Returns true if an CPF validates
     * 
     * @example Valida.cpf('000-000-000-00') return false
     */
    Valida.cpf = function (value) {
        value = value.toString().replace(/\.|\-/g, "");
        
        var typed = eval( value.charAt(9) + value.charAt(10) );
        var one = 0, two = 0, digit = 11;
        
        for (var i = 0; i < 9; i++) {
            one += eval( value.charAt(i) * ( digit - 1 ) );
            two += eval(  value.charAt(i) * digit );
            digit--;
        }
        
        one = (((one * 10) % 11) === 10 ? 0 : ((one * 10) % 11));
        two = (((two + (2 * one)) * 10) % 11);
        
        var generated = (one * 10) + two;
        
        return (generated !== typed) ? false : true;
    };
    
    //------------------------------------
    // EVENT METHODS
    //------------------------------------
    var Event = {};
    
    Event.onlyNumber = function (element, callback) {
        Event.bind(element, 'keypress', function (event) {
            
            callback.call(this);
            
            return Event.isNumber(event);
        });
    };
    
    /**
     * Check if key pressed is a number
     * 
     * @param { Event } event Specifies the event type
     * @return { Boolean } Return true if key is a number false if not
     * 
     * @see Event.onlyNumber();
     */
    Event.isNumber = function (event) {
        var key = (window.event) ? event.keyCode : event.which;
        
        return ((key > 47 && key < 58)) ? true : ((key === 8 || key === 0) ? true : false);
    };
    
    /**
     * Adding event listeners to/from elements
     * 
     * @param { Element } element HTML element
     * @param { String } etype The name of the event
     * @param { Function } callback Event handler function object
     */
    Event.bind = function (element, etype, callback) {
        var mousewheel = (Browser.app.firefox) ? "DOMMouseScroll" : "mousewheel";
        
        if (element.addEventListener) {
            if (etype === "mousewheel") {
                element.addEventListener(mousewheel, callback, false);
            } else {
                element.addEventListener(etype, callback, false);
            }
        } else if (element.attachEvent) {
            element.attachEvent("on" + etype, callback);
        } else {
            element["on" + etype] = callback;
        }
    };
    
    /**
     * Removing event listeners to/from elements
     * 
     * @param { Element } element HTML element
     * @param { String } etype The name of the event
     * @param { Function } callback Event handler function object
     */
    Event.unbind = function (element, etype, callback) {
        var mousewheel = (Browser.app.firefox) ? "DOMMouseScroll" : "mousewheel";
         
        if (element.addEventListener) {
            if (etype === "mousewheel") {
                element.removeEventListener(mousewheel, callback, false);
            } else {
                element.removeEventListener(etype, callback, false);
            }
        } else if (element.attachEvent) {
            element.detachEvent("on" + etype, callback);
        } else {
            element["on" + etype] = null;
        } 
    };

    /**
     * Normaliza eventos, reseta e define eventos padrões de eventos
     *
     * @param { Event } event Specifies the event type
     * @example Event.bind(element, 'click');
     * event.preventDefault() ou event.stopPropagation()
     * event.target, event.relatedTarget, event.pageX, event.pageY
     * no lugar de event.charCode fica event.character
     *
     */
    Event.normalise = function (event) {
        if (!event.stopPropagation) {
            event.stopPropagation = function () {
                this.cancelBubble = true;
            };

            event.preventDefault = function () {
                this.returnValue = false;
            };
        }

        if (!event.stop) {
            event.stop = function() {
                this.stopPropagation();
                this.preventDefault();
            };
        }

        if (event.srcElement && !event.target)
            event.target = event.srcElement;

        if ((event.toElement || event.fromElement) && !event.relatedTarget)
            event.relatedTarget = event.toElement || event.fromElement;

        if (event.clientX !== undefined && event.pageX === undefined) {
            event.pageX = event.clientX + document.body.scrollLeft;
            event.pageY = event.clientY + document.body.scrollTop;
        }

        if (event.type === "keypress") {
            if (event.charCode === 0 || event.charCode === undefined)
                event.character = String.fromCharCode(event.keyCode);
            else
                event.character = String.fromCharCode(event.charCode);
        }

        return event;
    };

    /**
     * Prevent default event 
     * 
     * @param { Event } event Specifies the event type
     */
    Event.preventDefault = function (event) {
        (event.stopPropagation) ? event.stopPropagation() : event.cancelBubble = true;
        
        (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
    };
    
    //------------------------------------
    // INITIALIZING
    //------------------------------------
    window.Utils = Utils;
    window.Ajax = Ajax;
    window.Browser = Browser;
    window.Strings = Strings;
    window.Numbers = Numbers;
    window.Objects = Objects;
    window.Arrays = Arrays;
    window.Valida = Valida;
    window.Event = Event;


    window.include = Utils.include;
})(window, document);
