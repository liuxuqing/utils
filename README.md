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
Utils.query('div'); // return HTML Element
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
Utils.fixlast( array, 3, last-child );// adds class last-child in a 3 item <li class="last-child"></li>
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


##### <i>Utils.is(obj, type)</i>
Verifica se é um objeto de um determinado tipo e retorna true ou false

`@param { Object | Array | Function | String | Boolean | Number }` obj Objeto a ser verificado<br />
`@param { String }` type Tipo de objeto para a verificação<br />
`@return` True caso o objeto passado seja igual ao tipo passado

#### @example

<pre>
// retorna true
Utils.is({}, "object");
</pre>


    
##### <i>Utils.type(obj)</i>
Retorna o tipo do objeto

`@param { Object | Array | Function | String | Boolean | Number }` obj Objeto a ser verificado<br />
`@return` Retorna o tipo do objeto

#### @example

<pre>
// retorna "object"
Utils.type({}); 
</pre>



##### <i>Utils.each(object, callback)</i>
ForEach pega um objeto ou array e retorna a posição e o valor em um loop

`@param { Object | Array }` object Array ou Object para o loop<br />
`@param { Function }` callback Função de retorno

#### @example
<pre>
var arr = ["lion", "goat", "snake"];
  
Utils.each(arr, function(i, value) {
  console.log("The ", i, " of a ", value, ".");
});
</pre>
 
##### <i>Utils.serialize(obj)</i>
Serialize

`@param { Object | Array | String }` obj Objeto a ser serializado<br />
`@return` Retorna uma string do objeto serializado

#### @example

<pre>
// retorna uma string ["utils", "roger"]
Utils.serialize(['utils', 'roger']);
</pre>


##### <i>Utils.alert(message, settings)</i>
Abri um alerta customizado

`@param { String }` message Texto que ira ser exibido no alerta<br />
`@param { Object }` settings Lista de opções para o alerta<br />

#### @example 

<pre>
.alert-box-button {
  padding: 10px;
  background-color: #29c09e;
  border: none;
  color: #fff;
  cursor: pointer;
}

.alert-box-button:hover, .alert-box-button:focus {
  background-color: #25a488;
}
</pre>


<pre>
Utils.alert("msg");
Utils.alert("msg", { icon: true });
Utils.alert("msg", { icon: true, buttons: [{ type: "submit", value: "Ok" }] });
Utils.alert("msg", { icon: true, buttons: [{ type: "submit", value: "Ok" }], respond: function(value){} });
</pre>


### Ajax Methods
-



### Strings Methods
-


### Browser Methods
-


### Numbers Methods
-


### Objects Methods
-


### Valida Methods
-

##### <i>Valida.fields(form)</i>
Validates formulário os campos para serem validados devem conter o atributo data-required para msg customizadas data-msg

`@param { Element }` form Elemento form<br />
`@return` Returna true caso tados os campos sejam diferentes de branco

#### @example

<pre>
// no onsubmit do form adicionar
return Valida.fields(this);
</pre>


##### <i>Valida.mail(value)</i>
Validates email

`@param { String }` value Address of email in the string format<br />
`@return` Returns true if an e-mail validates

#### @example

<pre>
Valida.mail('mail@gmail.com') // return true
</pre>


##### <i>Valida.cpf(value)</i>
Validates a cpf

`@param { String | Number }` value Number or string of CPF<br />
`@return` Returns true if an CPF validates

#### @example
<pre>
Valida.cpf('000-000-000-00') // return false
</pre>




### Event Methods
-

##### <i>Event.isNumber(event)</i>
Check if key pressed is a number

`@param { Event }` event Specifies the event type<br />
`@return { Boolean }` Return true if key is a number false if not

#### @example
<pre>
Event.isNumber(event)
</pre>

##### <i>Event.bind(element, etype, callback)</i>
Adding event listeners to/from elements

`@param { Element }` element HTML element<br />
`@param { String }` etype The name of the event<br />
`@param { Function }` callback Event handler function object

#### @example

<pre>
Event.bind(document, 'click', function(event) {console.log('test')});
</pre>

