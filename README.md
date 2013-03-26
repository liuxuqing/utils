UTILS
=====
A utils functions


### Utils Methods
-

##### <i>Utils.getCss(element, property)</i>
Pega o valor de uma propriedade css e retorna o valor dessa propriedade

`@param { Element }` element Element html<br />
`@param  { String }` property Propriedade css

#### @example 
<pre>
  Utils.getCss(mydiv, "width");
</pre>


##### <i>Utils.query(selector)</i>
Query selector css elements

`@param { String | Element }` selector Query selector css element to be verifiedl<br />
`@return { Element }` Return element html

#### @example 
<pre>
Utils.query('.myclass');

//or 

Utils.query('div'); // return HTML Element <div><div>
</pre>


##### <i>Utils.fixlast(element, number, name)</i>
Adds the fix last class

`@author Yeremi Loli` (https://gist.github.com/yeremi)
`@param { Element }` element Array List of elements
`@param { Number }` number Amount of items for line
`@param { String }` name Class for the last item

#### @example 
<pre>
  var array = document.getElementById('mylist).getElementsByTagName('li');
  
  // adds class last-child in a 3 item <li class="last-child"></li>
  Utils.fixlast( array, 3, last-child );
  
  // HTML
  <ul id="mylist">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</pre>
    
    
##### <i>Utils.hasClass(element, name)</i>
Check if the class name exist

`@param { Element }` element Selected elements
`@param { String }` name Class names
`@return { Boolean }` Return true if class name exist

#### @example 
<pre>
  Utils.hasClass( document.getElementById('el'), 'myclass' );
</pre>
    
##### <i>Utils.addClass(element, name)</i>
Adds one or more class names to the selected elements

`@param { Element }` element Selected elements
`@param { String }` name Class names to the selected elements

#### @example 

<pre>
  Utils.addClass( document.getElementById('el'), 'myclass' );
</pre>

    
##### <i>Utils.removeClass(element, name)</i>  
Remobe one or more class names to the selected elements

`@param { Element }` element Selected elements
`@param { String }` name Class names to the selected elements

#### @example 

<pre>
Utils.removeClass( document.getElementById('el'), 'myclass' );
</pre>
    

/**
     * Verifica se é um objeto de um determinado tipo e retorna true ou false
     * 
     * @param { Object | Array | Function | String | Boolean | Number } obj Objeto a ser verificado
     * @param { String } type Tipo de objeto para a verificação
     * 
     * @return True caso o objeto passado seja igual ao tipo passado
     * @example Utils.is({}, "object"); //  retorna true
     */
    Utils.is = function (obj, type)
    
/**
     * Retorna o tipo do objeto
     * 
     * @param { Object | Array | Function | String | Boolean | Number } obj Objeto a ser verificado
     * 
     * @return Retorna o tipo do objeto
     * @example Utils.type({}) //  retorna "object"
     */
    Utils.type = function (obj)
    
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
    Utils.each = function (object, callback)
    
/**
     * Serialize
     *
     * @param { Object | Array | String } obj Objeto a ser serializado
     * @return Retorna uma string do objeto serializado
     *
     * @example Utils.serialize(['utils', 'roger']); // retorna uma string ["utils", "roger"]
     */
    Utils.serialize = function (obj)
