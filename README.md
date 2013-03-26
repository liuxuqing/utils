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

`@author Yeremi Loli` <https://gist.github.com/yeremi><br />
`@param { Element }` element Array List of elements<br />
`@param { Number }` number Amount of items for line<br />
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

`@param { Element }` element Selected elements<br />
`@param { String }` name Class names<br />
`@return { Boolean }` Return true if class name exist

#### @example 
<pre>
  Utils.hasClass( document.getElementById('el'), 'myclass' );
</pre>
    
##### <i>Utils.addClass(element, name)</i>
Adds one or more class names to the selected elements

`@param { Element }` element Selected elements<br />
`@param { String }` name Class names to the selected elements

#### @example 

<pre>
  Utils.addClass( document.getElementById('el'), 'myclass' );
</pre>

    
##### <i>Utils.removeClass(element, name)</i>  
Remobe one or more class names to the selected elements

`@param { Element }` element Selected elements<br />
`@param { String }` name Class names to the selected elements

#### @example 

<pre>
Utils.removeClass( document.getElementById('el'), 'myclass' );
</pre>
    


