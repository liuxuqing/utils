UTILS
=====
A utils functions


### Utils Methods
-

###### <i>Utils.getCss(element, property)</i>
Pega o valor de uma propriedade css e retorna o valor dessa propriedade

`@param { Element }` element Element html<br />
`@param  { String }` property Propriedade css

#### example 
<pre>
  Utils.getCss(mydiv, "width");
</pre>


###### <i>Utils.query(selector)</i>
Query selector css elements

`@param { String | Element }` selector Query selector css element to be verifiedl<br />
`@return { Element }` Return element html

#### example 
<pre>
Utils.query('.myclass'); 
//or 

Utils.query('div'); // return HTML Element <div><div>
</pre>

    
