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
     * Adiciona style inline ao elemento
     *
     * @param { object } arguments Grupo de paramentros que define o estilo do elemento
     * @example Tools('.my').setCss({ width : '200px' });
     *
     */
    Utils.css = function (element, arguments) {
        for( var prop in arguments ) {
            if( prop === 'opacity' ) {
                
                element.style.filter = 'alpha(opacity=' + (arguments[prop] * 100) + ')';
                element.style.KhtmlOpacity = arguments[prop];
                element.style.MozOpacity = arguments[prop];
                element.style.opacity = arguments[prop];
            } else {
                element.style[prop] = arguments[prop];
            }
        }
    }

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

        
        /*var results = [], i = 0;
        for( ; i < object.length; i++) {
            results[i] = callback( object, i, object[i] );
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

    /**
     * Adiciona um ou mais script na pagina
     *
     * @param { String | Array } source Arquivos a incluir no header .js ou .css
     * @param { Boolean } cache Define se o arquivo var ser adicionado com o no-cache
     *
     * @example Utils.include(['http://code.jquery.com/jquery-1.9.1.min.js'], true);
     */
    Utils.include = function (source, cache) {
        cache = (cache && cache !== undefined) ? "?c=" + new Date().getTime() : "";

        source = (Utils.is(source, "string")) ? [source] : source;

        var i = 0, len = source.length, head = document.getElementsByTagName("head")[0];

        for (; i < len; i++) {
            var ext = source[i].substring(source[i].lastIndexOf(".") + 1).toLowerCase();

            if (ext === "js") {
                var script = document.createElement('script');
                script.setAttribute('type', 'text/javascript');
                script.setAttribute('src', source[i] + cache);

                head.appendChild(script);
            } else {
                var style = document.createElement('link');
                style.setAttribute('type', 'text/css');
                style.setAttribute('rel', 'stylesheet');
                style.setAttribute('href', source[i] + cache);
                head.appendChild(style);
            }
        }
    };

    /**
     * Cria um elemento html de acordo com a tag passada
     *
     * @param { Element } element Lugar onde o novo elemento sera aficionado
     * @param { String } tagName String do tipo de elemeto ex: 'div', 'span'
     * @param { Object } attrs Lista de atributos a serem adicionado na criação do objeto
     *
     * @return Retorna o elemento criado
     */
    Utils.create = function(element, tagName, attrs) {
        var tag = document.createElement(tagName);

        if (attrs) {
            $(attrs).each(function(key) {
                if (attrs.hasOwnProperty(key)) {
                    tag.setAttribute(key, attrs[key]);
                }
            });

            element.appendChild(tag);
        }

        return tag;
    };

    /**
     * Pega o valor de um atributo ou seta um valor
     *
     * @param { string } attr Nome do atributo 
     * @param { string } value Valor do atributo a ser setado
     * @return Retorna o valor do atributo setado
     */
    Utils.attr = function(element, attr, value) {
        // Setter
        if (typeof value !== "undefined") {
            Utils.each(function() {
                element.setAttribute( attr, value );
            });
        } 
        // Getter 
        else {
            return element.getAttribute( attr );
        }
    };

    /**
     * Abri um alerta customizado
     * 
     * @param { String } message Texto que ira ser exibido no alerta
     * @param { Object } settings Lista de opções para o alerta
     *
     * @example Utils.alert("msg");
     * @example Utils.alert("msg", { icon: true });
     * @example Utils.alert("msg", { icon: true, buttons: [{ type: "submit", value: "Ok" }] });
     * @example Utils.alert("msg", { icon: true, buttons: [{ type: "submit", value: "Ok" }], respond: function(value){} });
     * 
     * @see No style.css na linha: 1986, tem o css referente ao alert
     */
    Utils.alert = function (message, settings) {
        settings = settings || {};
        
        this.init = function () {
            if(Utils.is(settings.buttons, "undefined")) {
                settings.buttons = [
                        { type: "submit", value: "Ok" }
                ];
            }

            this.build();
            this.addButton();
            this.listeners();
        };

        this.build = function () {
            // cria overlay
            Utils.create(document.body, "div", {
                'class': 'alert-overflow'
            });

            Utils.css(Utils.query('.alert-overflow'), {
                'top': '0',
                'left': '0',
                'width': '100%',
                'height': '100%',
                'background-color': '#000',
                'opacity': '0.3',
                'position': 'fixed',
                'z-index': '99998'
            });

            // cria o box do alerta
            Utils.create(document.body, "div", {
                'class': 'alert-box'
            });

            Utils.css(Utils.query('.alert-box'), {
                'position': 'fixed',
                'width': '300px',
                'left': '50%',
                'top': '50%',
                'margin-left': '-150px',
                'margin-top': '-100px',
                'background-color': '#fff',
                'box-shadow': '0px 2px 10px rgba(51, 51, 51, 0.3)',
                '-webkit-box-shadow': '0px 2px 10px rgba(51, 51, 51, 0.3)',
                '-moz-box-shadow': '0px 2px 10px rgba(51, 51, 51, 0.3)',
                'z-index': '99999'
            });

            // 
            Utils.query('.alert-box').innerHTML = '<div class="alert-box-message"><span class="alert-box-icon"></span>' + message + '</div>';
            Utils.query('.alert-box').innerHTML += '<br style="clear: both;" />';
            Utils.query('.alert-box').innerHTML += '<div class="alert-box-buttons"></div>';

            

            Utils.css(Utils.query('.alert-box-message'), {
                'padding': '10px 10px 30px',
                'font-size': '13px',
                'min-height': '40px'
            });

            Utils.css(Utils.query('.alert-box-buttons'), {
                'position': 'absolute',
                'width': '290px',
                'padding': '5px',
                'bottom': 0,
                'text-align': 'right',
                'background-color': '#f8f8f8'
            });

            if(!Utils.is(settings.icon, "undefined") && settings.icon === true) {
                Utils.css(Utils.query('.alert-box-icon'), {
                    'width': '55px',
                    'height': Utils.query('.alert-box-message').offsetHeight + 'px',
                    'display': 'block',
                    'float': 'left',
                    'background': 'url('+icon+') no-repeat'
                });
            }
            
        };


        this.addButton = function() {
            var btn = settings.buttons, i = 0, len = btn.length;
            console.log( settings.buttons.length )
            for (; i < len; i++) {
                //btn[i].value
                //btn[i].type

                Utils.query('.alert-box-buttons').innerHTML += '<input type="'+btn[i].type+'" value="' + btn[i].value + '" class="alert-box-button" />';
            }
        };

        this.closeAlert = function() {
            document.body.removeChild(Utils.query('.alert-overflow'));
            document.body.removeChild(Utils.query('.alert-box'));
        };

        this.listeners = function() {
            var _this = this,
                btn = Utils.query('.alert-box-buttons').getElementsByTagName('input'),
                i = 0, len = btn.length;
            
            for (; i < len; i++) {
                Event.bind(btn[i], 'click', function(event) {
                    Event.preventDefault(event);

                    if(!Utils.is(settings.respond, "undefined")) {
                        settings.respond.call(this, this.value.toLowerCase());
                    }

                    _this.closeAlert();
                });
            }
        };


        var icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAkCAYAAAD7PHgWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3ODkzMzRFNjhFNzMxMUUyQjBBN0VBMENCMzU5RERFNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3ODkzMzRFNzhFNzMxMUUyQjBBN0VBMENCMzU5RERFNCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc4OTMzNEU0OEU3MzExRTJCMEE3RUEwQ0IzNTlEREU0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc4OTMzNEU1OEU3MzExRTJCMEE3RUEwQ0IzNTlEREU0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VXxr4gAAAoJJREFUeNrMmM1PE0EYxrulBbW0RT4kRjCc+NBARAUE4gkrCQdEviEiRAIKEZADBM78H9w8cfNi4sngxZDoyXjy4MW/gC+jifhM8pBMJu3uzO5s2Tf5pWn37fTZd2afeadOy8fdmMV4CMrBe1sDJiyKKwU7IAs+gSMbg8YtCnzCCt4BM7YGtSWwGqxJ4y2B+igJHAW90vtWW1W0IbAOvMnzuahiYxQEvgRNBYSvXbTA2+C1y/UXoOeiBDpgE1S45FwC20HsLIjAPjCimfe02AIzYB2kNHIvg1VaUdEEDoB+g3xhQWPF2uqqaCslyuc/wRfwj+uzSzJrhw/TO/Ar7Ao+44+r8YGGPc5q7SvXb9GSQp1iUZGNAteSyowk8+Qsg+YwBYoH44Zm7lmB5bEdlsAO8NxAkFMgbwg8si2wlFZR5ZKTkqZYvKZdLEpsgVdsChR3POyRU8OdI0ZxWZfcx+wfrQhMs3ped1wtCcyyUm4zsgIqbQgc0jTlCv7w+U2lPfK7aVmBBF4FW5rLoFLa+jIeFZRd4XoQgcs0WJ0ol6Ysw/de0cCOyJdAYaivDH2yVprupMHOdN9UoMPq1RkKTEvVND1wlZgIFAt4ysc+fZdd9j3D7w2CnG43U8bOw7R/+82nvZOGfspeULe/XOWB/9irgjmfvdtXMA0WaE0Hht/vz9d5x/NUb8tnn3gCvoNvfD3x0VltqP6pCpxVDuCm8VejWXCLNvWUmFDOsesBxInB34I/tJh2n+MIa9sDP1SBi6bNpBLXwISFPwJu0nZW5CkW/6XMxaIT4kYfnAt0eFaoj5DAGq7FeJy2Mh+LXkwK20lwcX8Ghz6fvDDijJ1R638BBgAj3UiigNqt1AAAAABJRU5ErkJggg==';

        // Inicializa
        this.init();

        return this;
    };

    Utils.placeHolder = function () {
        //
    };

    //------------------------------------
    // AJAX METHODS
    //------------------------------------
    var Ajax = {};
    
    /**
     * Set content loaded by an ajax call
     * @param { Element | String } element Can contain an element or the id of the element
     * @param { Object } options { 
     *     url: The url of the ajax call ( include GET vars in querystring )
     *     type: Optional, the POST data, when set method will be set to POST
     *     complete: ptional, callback when loading is completed
     * }
     */
    Ajax.load = function (options) {
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

        settings = Objects.merge(settings, options);

        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

        function ready() {
            if (xhr.readyState === 4) {
                if (xhr.status == 200) {
                    if (Utils.isFunction(settings.complete)) {
                         if(settings.datatype === "json") {
                            settings.complete.call(settings, JSON.parse(xhr.responseText));
                        } else {
                            settings.complete.call(settings, xhr.responseText);
                        }
                    }
                } else {
                    if (Utils.isFunction(settings.error)) {
                        settings.error.call(settings, xhr, xhr.status);
                    }
                }
            }
        }

        // prepare options
        if (!settings.cache) {
            settings.url += ((settings.url.indexOf('?') > -1) ? '&' : '?') + '_nocache=' + (new Date()).getTime();
        }

        if (settings.data) {
            if (settings.type === 'GET') {
                settings.url += ((settings.url.indexOf('?') > -1 ) ? '&' : '?') + Utils.setQueryParams(settings.data);
                settings.data = null;
            } else {
                settings.data = Utils.setQueryParams(settings.data);
            }
        }

         // set request
        xhr.open(settings.type, settings.url, settings.async);
        xhr.setRequestHeader('Content-type', settings.contentType);

        if (settings.async) {
            xhr.onreadystatechange = ready;
            xhr.send(settings.data);
        } else {
            xhr.send(settings.data);
            ready();
        }
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
            complete: null
        }

        settings = Objects.merge(settings, options);
        
        if (Utils.isFunction(settings.data)) {
            settings.complete = settings.data;
            settings.data = null;
        }

        return Ajax.load({
            url: settings.url,
            type: 'GET',
            datatype: settings.datatype,
            data: settings.data,
            complete: settings.complete
        });
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
            complete: null
        }

        settings = Objects.merge(settings, options);

        if (Utils.isFunction(settings.data)) {
            settings.complete = settings.data;
            settings.data = null;
        }

        return Ajax.load({
            url: settings.url,
            type: 'GET',
            datatype: settings.datatype,
            data: settings.data,
            complete: settings.complete
        });
    };

    /**
     * Ajax POST request
     * @param {string} url
     * @param {string|object} data Containing post values
     * @param {function} success Callback when request was succesfull
     */
    Ajax.post = function (url, data, complete) {
        if (Utils.isFunction(data)) {
            success = data;
            data = null;
        }

        return Ajax.load({
            url: url,
            type: 'POST',
            data: data,
            complete: complete
        });
    };
    

    Ajax.include = function (filename) {
        //var included_files = filename || [];
        var files = (Utils.isArray(filename) ? filename : [filename]);
        console.log(files.length)
        
        var count = 0;

        next();

        function next() {
            Ajax.get({
                url: files[0],
                complete: function(data) {
                    Utils.include(files[0], true);

                    count++;
                    
                    //console.log( ((count * files.length) / 2 ) * 100 )
                   
                    if (files.length > 1) {
                        Arrays.remove(files, 0, 1);
                        next(files);
                    }
                   
                }
            });
        }

        return this;
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
    

    Browser.cookie = function () {
        var allCookies = document.cookie.split('; ');

        for( var i = 0; i < allCookies.length; i++ ) {
            var cookiePair = allCookies[i].split('=');
            this[ cookiePair[0] ] = cookiePair[1];
        }
        
        this.get = function() {
            var allCookies = document.cookie.split('; ');

            return allCookies;
        };
        
        this.set = function( name, value, days ) {
            if( days ) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            } else {
                var expires = "";
            }

            document.cookie = name + "=" + value + expires + "; path=/";
            this[name] = value;
        };
        
        this.remove = function( name ) {
            this.create(name, '', -1);
            this[name] = undefined;
        }
    };


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

    /**
     * Remove um item do array
     *
     * @param { Array } array Objeto array ao qual sera removido o item
     * @param { Number } start item que sera removido 0 é o primeito item e assim por diante
     * @param { Number } end Sera removido quantos item 1, 2, 3...
     * @return Retorno um novo array com a quantidade de itens removidos
     */
    Arrays.remove = function (array, start, end) {
        array.splice(start, end);
        return array;
    };

    /**
     * Verifica se existe um item dentro do array
     *
     * @param { String | Number } value
     * @param { Array } array
     * @return Retorna true caso tenho o item
     */
    Arrays.inArray = function (array, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == value) {
                return true;
            }
        }

        return false;
    };

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
     * Validates formulário os campos para serem validados devem
     * conter o atributo data-required para msg customizadas data-msg
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
                         
                         Utils.alert(form[i].getAttribute("data-msg"), { icon: true });
                        
                    } else {
                        
                        Utils.alert("O campo " + form[i].name + " é obrigatório.", { icon: true });

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
