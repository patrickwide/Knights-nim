JavaScript function similar to Python range()
Asked 10 years, 3 months ago
Modified 2 months ago
Viewed 85k times

Report this ad

127


26
Is there a function in JavaScript similar to Python's range()?

I think there should be a better way than to write the following lines every time:

array = new Array();
for (i = 0; i < specified_len; i++) {
    array[i] = i;
}
javascript
python
Share
Improve this question
Follow
edited Feb 24, 2015 at 23:25

Mark Amery
124k6969 gold badges382382 silver badges424424 bronze badges
asked Nov 25, 2011 at 18:33

clwen
18.2k3030 gold badges7373 silver badges9292 bronze badges
1
@clwen: Unfortunately there is not, but take a look at my code - I have written a function that is aimed at emulating the way range() works in Python, so you can use it. There is no such function in JavaScript, but there are some plugins for different frameworks, such as Range class for MooTools. – 
Tadeck
 Nov 25, 2011 at 19:06
Add a comment
26 Answers

168

For a very simple range in ES6:

let range = n => Array.from(Array(n).keys())
From bigOmega's comment, this can be shortened using Spread syntax:

let range = n => [...Array(n).keys()]
Share
Improve this answer
Follow
edited Dec 12, 2019 at 0:13

Will Ediger
89399 silver badges1717 bronze badges
answered Jun 23, 2016 at 0:59
user1969453
45
A simpler version of this is let range = n => [...Array(n).keys()] – 
bigOmega ?
 Sep 13, 2017 at 12:13
2
@BharathRaja great, thanks! Why not const? I'll try to use const wherever I can :) like the Java final counterpart ;) – 
Kjellski
 Mar 13, 2018 at 11:17
You're right, I try to use const as much as possible, but here it'll just be a reference to the array, so the array would still be editable :'D – 
bigOmega ?
 Mar 21, 2018 at 8:44
1
@bigOmega The const would apply to the function itself, not its return value. You probably don't want to modify the function in any way. – 
Solomon Ucko
 Jun 8, 2019 at 12:32
13
This answer does not account for a starting index and the ability to increase step size. – 
Fluous
 Aug 24, 2019 at 11:36
Add a comment

110

No, there is none, but you can make one.

JavaScript's implementation of Python's range()
Trying to emulate how it works in Python, I would create function similar to this:

function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};
See this jsfiddle for a proof.

Comparison between range() in JavaScript and Python
It works in the following way:

range(4) returns [0, 1, 2, 3],
range(3,6) returns [3, 4, 5],
range(0,10,2) returns [0, 2, 4, 6, 8],
range(10,0,-1) returns [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
range(8,2,-2) returns [8, 6, 4],
range(8,2) returns [],
range(8,2,2) returns [],
range(1,5,-1) returns [],
range(1,5,-2) returns [],
and its Python counterpart works exactly the same way (at least in the mentioned cases):

>>> range(4)
[0, 1, 2, 3]
>>> range(3,6)
[3, 4, 5]
>>> range(0,10,2)
[0, 2, 4, 6, 8]
>>> range(10,0,-1)
[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
>>> range(8,2,-2)
[8, 6, 4]
>>> range(8,2)
[]
>>> range(8,2,2)
[]
>>> range(1,5,-1)
[]
>>> range(1,5,-2)
[]
So if you need a function to work similarly to Python's range(), you can use above mentioned solution.

Share
Improve this answer
Follow
edited Jun 5, 2015 at 15:35

thefourtheye
218k5050 gold badges428428 silver badges474474 bronze badges
answered Nov 25, 2011 at 18:38

Tadeck
124k2626 gold badges143143 silver badges194194 bronze badges
4
maybe a couple of additional defensive checks - ensure that the arguments passed are all coercible to numbers and ensure that stop is greater than start (and swap them if not). – 
Russ Cam
 Nov 25, 2011 at 18:46
1
@RussCam: Thanks for pointing this out. I did not add defensive checks for types etc., but I implemented reverse order of elements - it now works exactly the same as Python counterpart, when the last param is negative integer. – 
Tadeck
 Nov 25, 2011 at 18:59
@RussCam: start >= stop leading to an empty array is necessary if the goal is really emulating Python's range. And I'd argue it's more intuitive anyway. – 
user395760
 Nov 25, 2011 at 19:11
1
@delnan: Check may be more complex, as simple start >= stop is not enough for this function to behave like range() in Python. I have updated my answer. – 
Tadeck
 Nov 25, 2011 at 19:19
@delnan - I'm not familiar with the Python implementation. I guess if it's only going to be used by peeps familiar with the Python implementation that it makes sense to emulate it :) – 
Russ Cam
 Nov 25, 2011 at 19:27
Show 7 more comments

34

2018: this answer keeps getting upvotes, so here's an update. The code below is obsolete, but luckily ES6 standardized generators and the yield keyword, and they are universally supported across platforms. An example of the lazy range() using yield can be found here.

In addition to what's already said, Javascript 1.7+ provides support for iterators and generators which can be used to create a lazy, memory-efficient version of range, simlar to xrange in Python2:

function range(low, high) {  
    return {
        __iterator__: function() {
            return {  
                next: function() {
                    if (low > high)
                        throw StopIteration;  
                    return low++;
                }
            }
        }
    }
}

for (var i in range(3, 5))  
  console.log(i); // 3,4,5
Share
Improve this answer
Follow
edited Feb 27, 2018 at 13:06
answered Nov 25, 2011 at 23:10

georg
203k4848 gold badges279279 silver badges363363 bronze badges
1
+1 Great idea! Could you implement also step argument and test it on the values from my answer? Your answer is great for the applications where we have very specific browsers in mind (it won't work in Google Chrome, Safari and IE version earlier than 9: stackoverflow.com/a/2209743/548696). – 
Tadeck
 Sep 9, 2012 at 3:18
@Tadeck: ironically, I asked a very similar question recently, check it out - some good answers there. BTW, your code does not pass my test ;( – 
georg
 Sep 9, 2012 at 11:14
Could you share the test data and expected results? I would be happy to improve it, but my tests are 100% passing. Are you saying the code I have given is not properly parsed by script you have placed in this question: stackoverflow.com/q/12173856/548696 ? – 
Tadeck
 Sep 9, 2012 at 17:21
@Tadeck: nevermind. I tested slices and your code is for ranges. – 
georg
 Sep 9, 2012 at 19:59
1
Python's range has "last" value excluded (so one needs to use >= instead of > in the above code) – 
Pac0
 Jul 17, 2020 at 8:13
Add a comment

33

Fusing together both answers from @Tadeck and @georg, I came up with this:

function* range(start, stop, step = 1) {
    if (stop == null) {
        // one param defined
        stop = start;
        start = 0;
    }

    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
        yield i;
    }
}
To use it in a for loop you need the ES6/JS1.7 for-of loop:

for (let i of range(5)) {
    console.log(i);
}
// Outputs => 0 1 2 3 4

for (let i of range(0, 10, 2)) {
    console.log(i);
}
// Outputs => 0 2 4 6 8

for (let i of range(10, 0, -2)) {
    console.log(i);
}
// Outputs => 10 8 6 4 2
Share
Improve this answer
Follow
edited Nov 20, 2020 at 21:49
answered Oct 24, 2014 at 19:23

janka102
85988 silver badges1616 bronze badges
Why not using default parameters if you are using ES6? – 
Amin NAIRI
 Apr 30, 2017 at 10:20
@Gradiuss that would work for the step parameter, but when stop is not passed in, both start and stop need to be changed. I'll update it – 
janka102
 May 1, 2017 at 16:33
2
WTG, this is the best implementation presented so far. It uses generators (good, since there's no need to store the whole sequence in memory) and is very succint. – 
Lucio Paiva
 May 28, 2017 at 2:26
undefined is a pointer to an object like null. possible to compare with 3 equal signs like: if (stop === undefined) { 3 equals signs is compare without auto casting. compare as is also compare type. 2 equal signs is compare with auto casting to other side type. – 
Shimon Doodkin
 Mar 27, 2018 at 12:48
Add a comment

25

A port of the range function from Python 2 is provided by the underscore.js and lodash utility libraries (along with many other useful tools). Examples copied from the underscore docs:

_.range(10);
=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
_.range(1, 11);
=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
_.range(0, 30, 5);
=> [0, 5, 10, 15, 20, 25]
_.range(0, -10, -1);
=> [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
_.range(0);
=> []
Share
Improve this answer
Follow
edited Nov 19, 2019 at 15:07
answered Aug 30, 2014 at 16:09

Mark Amery
124k6969 gold badges382382 silver badges424424 bronze badges
Add a comment

19

Can be achieved by attaching an iterator to the Number prototype

  Number.prototype[Symbol.iterator] = function* () { 
     for (var i = 0; i <= this; i++) {
       yield i
     } 
  }

[...5] // will result in [0,1,2,3,4,5]
Taken from Kyle Simpson's course Rethinking Asynchronous JavaScript

Share
Improve this answer
Follow
answered Aug 14, 2017 at 0:37

MCH
8561313 silver badges1818 bronze badges
9
This is really cool, but overriding prototypes just is too fragile :'( – 
m0meni
 Oct 20, 2017 at 3:13 
1
this actually makes numbers iteratable try this: for (var i of 5) { console.log(i); } – 
Antoni
 Jun 5, 2021 at 19:03
Add a comment

11

Here's a small extension for one of the answers in case you need to specify both starting and ending position of the range:

let range = (start, end) => Array.from(Array(end + 1).keys()).slice(start);
Share
Improve this answer
Follow
answered Dec 20, 2016 at 17:09

Dmitrii Mikhailov
4,73766 gold badges4141 silver badges6565 bronze badges
Add a comment

7

Here you go.

This will write (or overwrite) the value of each index with the index number.

Array.prototype.writeIndices = function( n ) {
    for( var i = 0; i < (n || this.length); ++i ) this[i] = i;
    return this;
};
If you don't provide a number, it will use the current length of the Array.

Use it like this:

var array = [].writeIndices(10);  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
Share
Improve this answer
Follow
answered Nov 25, 2011 at 18:48

RightSaidFred
10.8k3232 silver badges3434 bronze badges
Add a comment

6

Further refined with ES6 default parameters.

let range = function*(start = 0, stop, step = 1) {
  let cur = (stop === undefined) ? 0 : start;
  let max = (stop === undefined) ? start : stop;
  for (let i = cur; step < 0 ? i > max : i < max; i += step)
    yield i
}
Share
Improve this answer
Follow
answered Feb 22, 2016 at 21:47

Volv
6311 silver badge66 bronze badges
This is how the range really should look like. – 
Konrad Linkowski
 Mar 17, 2020 at 10:48
Add a comment

6

The following is a natural adaption of Python's range() function to JavaScript:

// Generate range from start (inclusive) to stop (exclusive):
function* range(start, stop, step = 1) {
   if (stop === undefined) [start, stop] = [0, start];
   if (step > 0) while (start < stop) yield start, start += step;
   else if (step < 0) while (start > stop) yield start, start += step;
   else throw new RangeError('range() step argument invalid');
} 

// Examples:
console.log([...range(3)]);       // [0, 1, 2]
console.log([...range(0, 3)]);    // [0, 1, 2]
console.log([...range(0, 3, -1)]);// []
console.log([...range(0, 0)]);    // []
console.log([...range(-3)]);      // []
console.log([...range(-3, 0)]);   // [-3, -2, -1]
Expand snippet
It supports any argument which can be compared to 0 and stop and can be incremented by step. It behaves identical to the Python version when used with numbers not exceeding Number.MAX_SAFE_INTEGER.

Please note the following corner cases:

[...range(0, 0, 0)];        // RangeError: range() step argument invalid
[...range(Number.MAX_SAFE_INTEGER + 1, Number.MAX_SAFE_INTEGER + 2)];  // []
[...range(Number.MAX_SAFE_INTEGER + 2, Number.MAX_SAFE_INTEGER + 3)];  // Infinite loop
[...range(0.7, 0.8, 0.1)];  // [0.7, 0.7999999999999999]
[...range('1', '11')];      // ['1']
[...range('2', '22')];      // Infinite loop
In contrast to @Tadeck's, @Volv's and @janka102's answer which return [], undefined or enter an infinite loop when step evaluates to 0 or NaN, this generator function throws an exception similar to Python's behavior.

Share
Improve this answer
Follow
edited May 23, 2017 at 12:34

CommunityBot
111 silver badge
answered Mar 27, 2017 at 19:11

le_m
17.3k99 gold badges5858 silver badges7272 bronze badges
1
Agreed. Although the other answers are elegant in their own way, this approach and functionality is much more pythonic. – 
Travis Clarke
 Mar 18, 2018 at 7:33
Add a comment

6

pythonic mimics the Python range behaviour best it can using JS' generators (yield), supporting both the range(stop) and range(start, stop, step) use cases. In addition, pythonic's range function returns an Iterator object similar to Python that supports map and filter, so one could do fancy one-liners like:

import {range} from 'pythonic';
// ...
const results = range(5).map(wouldBeInvokedFiveTimes);
// `results` is now an array containing elements from
// 5 calls to wouldBeInvokedFiveTimes
Install using npm:

npm install --save pythonic
Disclosure I'm author and maintainer of Pythonic

Share
Improve this answer
Follow
edited Aug 4, 2020 at 15:46
answered Apr 4, 2018 at 4:12

Keyvan
69377 silver badges1818 bronze badges
Add a comment

5

For getting an array of size x, here's an one-liner without using any library

var range = n => Array(n + 1).join(1).split('').map((x, i) => i)
works as

> range(4)
[0, 1, 2, 3]
Share
Improve this answer
Follow
answered Mar 23, 2016 at 15:52

bigOmega ?
35122 silver badges1313 bronze badges
2
var range = n => Array(n).fill().map((e, i) => i); – 
Valen
 May 20, 2019 at 7:58
and why say 'size x' when you actually used n as parameter name – 
Valen
 May 20, 2019 at 7:59 
Add a comment

3

MDN recommends this approach: Sequence generator (range)

// Sequence generator function (commonly referred to as "range", e.g. Clojure, PHP etc)
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

// Generate numbers range 0..4
console.log("range(0, 4, 1):", range(0, 4, 1));
// [0, 1, 2, 3, 4] 

// Generate numbers range 1..10 with step of 2 
console.log("\nrange(1, 10, 2):", range(1, 10, 2));
// [1, 3, 5, 7, 9]

// Generate the alphabet using Array.from making use of it being ordered as a sequence
console.log("\nrange('A'.charCodeAt(0), 'Z'.charCodeAt(0), 1).map(x => String.fromCharCode(x))", range('A'.charCodeAt(0), 'Z'.charCodeAt(0), 1).map(x => String.fromCharCode(x)));
// ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
Expand snippet
Share
Improve this answer
Follow
edited Apr 7, 2020 at 18:51

Micah J
6855 bronze badges
answered Apr 22, 2019 at 20:44

IliasT
3,35511 gold badge1919 silver badges2424 bronze badges
Add a comment

3

Actually, in Python range() returns an iterable object and we know that iterators are more memory efficient than arrays (or lists in Python). So if we want to implement the same concept with exact functionality in JavaScript we can use an iterator object:

class range {

constructor(start, stop, step = 1) {
    //check for invalid input
    if (stop !== undefined && typeof stop !== 'number'
        || typeof start !== 'number'
        || typeof step !== 'number') {
        throw Error('invalid input for range function');
    }

    //check if second argument is provided
    if (stop === undefined) {
        stop = start;
        start = 0;
    }

    //initialize the object properties
    this.start = start;
    this.stop = stop;
    this.step = step;
}

//create the iterator object with Symbol.iterator
[Symbol.iterator]() {
    return {
        current: this.start,
        last: this.stop,
        step: this.step,
        //implement the next() method of the iterator
        next() {
            if (this.step === 0) {
                return { done: true };
            } else if (this.step > 0 ? this.current < this.last : this.current > this.last) {
                let value = this.current;
                this.current += this.step;
                return { done: false, value };
            } else {
                return { done: true };
            }
        }
    };
};
}
and for example we have:

for (const num of new range(1, 10, 2)) {
console.log(num);
}
also we can create an array easily:

let arr = [...new range(10, -5, -1)];
or:

let arr = Array.from(new range(10));
Share
Improve this answer
Follow
edited Feb 18, 2021 at 10:27
answered Feb 17, 2021 at 21:01

Mohammad
4133 bronze badges
Add a comment

2

You may use underscore library. It contains dozens of useful functions for working with arrays and many more.

Share
Improve this answer
Follow
answered Aug 24, 2014 at 10:58

Radagast
5,29433 gold badges2121 silver badges1818 bronze badges
Add a comment

2

Is there a function in JavaScript similar to Python's range()?

All of the solutions here are referring to Python 2's range (probably because of the code example you gave). However in Python 3, the range() method returns an iterator. JavaScript also has iterators and they're more space efficient than generating the whole array and storing it in memory.

So the more accurate representation of Python 3's range(n) function is Array(n).keys().

For example:

for (let i of Array(n).keys()) {
  console.log(i) // 0, 1, 2, 3, ..., n
}
One more example (which has already been covered in the other answers). Converting the iterator to an array (ES6):

let ary = [...Array(n).keys()];
// ary = [0, 1, 2, 3, ..., n]
Share
Improve this answer
Follow
answered Nov 18, 2019 at 5:08

MattCochrane
2,36222 gold badges2222 silver badges3333 bronze badges
Add a comment

1

Still no built-in function that is equivalent to range(), but with the most recent version - ES2015 - you can build your own implementation. Here's a limited version of it. Limited because it doesn't take into account the step parameter. Just min, max.

const range = (min = null, max = null) =>
  Array.from({length:max ? max - min : min}, (v,k) => max ? k + min : k)
This is accomplished by the Array.from method able to build an array from any object that has a length property. So passing in a simple object with just the length property will create an ArrayIterator that will yield length number of objects.

Share
Improve this answer
Follow
edited Dec 13, 2019 at 1:09

zmag
7,1231212 gold badges2929 silver badges3838 bronze badges
answered Aug 11, 2016 at 6:14

Steve Brownlee
10366 bronze badges
Add a comment

1

This is my preferred way. It allows you to specify one or two inputs like in Python.

function range(start, end) {
  return Array.from(Array(end||start).keys()).slice(!!end*start)
}
Share
Improve this answer
Follow
answered Apr 17, 2020 at 17:49

Rob Kwasowski
2,56133 gold badges99 silver badges3030 bronze badges
Add a comment

1

An option for NodeJs is to use a Buffer:

[...Buffer.alloc(5).keys()]
// [ 0, 1, 2, 3, 4 ]
What's nice is that you can iterate directly on the buffer:

Buffer.alloc(5).forEach((_, index) => console.log(index))
// 0
// 1
// 2
// 3
// 4
You can't do that with an uninitialized Array:

Array(5).forEach((_, index) => console.log(index))
// undefined
But, who in their right mind uses a Buffer for a purpose like this ;)

Share
Improve this answer
Follow
answered Aug 26, 2020 at 12:27

Otto
1,24711 gold badge1313 silver badges2020 bronze badges
Add a comment

0

Here is another es6 implementation of the range

// range :: (from, to, step?) -> [Number]
const range = (from, to, step = 1) => {
  //swap values if necesery
  [from, to] = from > to ? [to, from] : [from, to]
  //create range array
  return [...Array(Math.round((to - from) / step))]
    .map((_, index) => {
      const negative = from < 0 ? Math.abs(from) : 0
      return index < negative ? 
        from + index * step  :
        (index - negative + 1) * step
    })
}  

range(-20, 0, 5)
  .forEach(val => console.log(val))

for(const val of range(5, 1)){
   console.log(`value ${val}`)
}
Expand snippet
Share
Improve this answer
Follow
answered Jan 8, 2018 at 10:00

mrFunkyWisdom
111 bronze badge
What if we want to generate an array from -20 to -30? – 
Amin NAIRI
 Jul 9, 2019 at 20:50
Hmm, this one will generate an array from -30 to -20, but it can be easily modified to include a reverse property if you want. I will edit the answer above to include it – 
mrFunkyWisdom
 Jul 14, 2019 at 13:15
Add a comment

0

No, there is none, but you can make one.

I'm partial to Python3 behavior of range. You will find below JavaScript's implementation of Python's range():

function* range(start=0, end=undefined, step=1) {    
    if(arguments.length === 1) {end = start, start = 0}    
    
    [...arguments].forEach(arg => {    
        if( typeof arg !== 'number') {throw new TypeError("Invalid argument")}                               
    })    
    if(arguments.length === 0) {throw new TypeError("More arguments neede")}    
        
    if(start >= end) return                                                                                                                                     
    yield start    
    yield* range(start + step, end, step)    
}    
         
// Use Cases
console.log([...range(5)])

console.log([...range(2, 5)])

console.log([...range(2, 5, 2)])
console.log([...range(2,3)])
// You can, of course, iterate through the range instance.
Expand snippet
Share
Improve this answer
Follow
edited May 26, 2019 at 22:57
answered May 26, 2019 at 17:19

elayira
111 bronze badge
Add a comment

0

Assuming you need a simple range with a single step:

let range = (start, end)=> {
    if(start === end) return [start];
    return [start, ...range(start + 1, end)];
}
else

let range = (start, end, step)=> {
    if(start === end) return [start];
    return [start, ...range(start + step, end)];
}
refer to here for more.

Share
Improve this answer
Follow
edited Nov 8, 2019 at 13:38
answered Nov 8, 2019 at 13:33

N Djel Okoye
65788 silver badges66 bronze badges
Add a comment

0

Is there a function in JavaScript similar to Python's range()?

As answered before: no, there's not. But you can make your own. I believe this is an interesting approach for ES6. It works very similar to Python 2.7 range(), but it's much more dynamic.

function range(start, stop, step = 1) 
{
    // This will make the function behave as range(stop)
    if(arguments.length === 1)
    {
        return [...Array(arguments[0]).keys()]
    }

    // Adjusts step to go towards the stop value
    if((start > stop && !(step < 0)) ||
       (start < stop && !(step > 0)))
    {
        step *= -1
    }

    let returnArray = []
    // Checks if i is in the interval between start and stop no matter if stop
    // is lower than start or vice-versa
    for(let i = start; (i-start)*(i-stop) <= 0; i += step)
    {
        returnArray.push(i)
    }
    return returnArray
}
This function can behave in three different ways (just like Python's range()):

range(stop)
range(start, stop)
range(start, stop, step)
These examples:

console.log(range(5))
console.log(range(-2, 2))
console.log(range(2, -2))
console.log(range(10, 20, 2))
Will give you the following output:

[ 0, 1, 2, 3, 4 ]
[ -2, -1, 0, 1, 2 ]
[ 2, 1, 0, -1, -2 ]
[ 10, 12, 14, 16, 18, 20 ]
Note that instead of iterating over the array with the in operator (like python), you have to use of. Thus the i variable assumes the value, and not the index, of the array's element.

for(let i of range(5))
{
    // do something with i...
}
Share
Improve this answer
Follow
answered Dec 13, 2019 at 0:31

sandmann
33811 silver badge1212 bronze badges
Add a comment

0

function range(start, stop) {
    if (typeof stop == 'undefined') {
        stop = start;
        start = 0;
    }
   
    result = [...Array(stop).keys()].slice(start, stop);
    return result;
}
Share
Improve this answer
Follow
edited Nov 28, 2020 at 19:17
answered Nov 28, 2020 at 19:11

MSA
14133 silver badges99 bronze badges
Add a comment

0

Recursion function is the best solution for implementing a something like this.

If you want only to get numbers begin from zero

function range(n) {
  if (n > 0){
    return [...range(n-1), n];
   };
   return [0];
};
console.log("range(5) => ", range(5));
Expand snippet
For example,

range(5) = [...range(4), 5]
         = [...range(3), 4, 5]
         = [...range(2), 3, 4, 5]
         = [...range(1), 2, 3, 4, 5]
         = [...range(0), 1, 2, 3, 4, 5] // range(0) = [0]
         = [0, 1, 2, 3, 4, 5] //final answer
This function can also extend as following

function range(start, stop, step=1){
  if( stop > start){
    return [...range(start, stop-step), stop];
  }
  return [start];
}
console.log("range(2, 8, 2) => ", range(2, 8, 2));
Expand snippet
But note that, unlike in python you have to provide either two or three arguments.

Share
Improve this answer
Follow
edited Jul 23, 2021 at 8:00

Josef
1,99811 gold badge1616 silver badges2020 bronze badges
answered Jul 22, 2021 at 10:05

Sanuja Methmal
1
Add a comment

-1

Here's how i do it

let n = 5 
[...Array(n).keys()].map(x=>{console.log(x)})
output

0
1
2
3
4
Share
Improve this answer
Follow
answered Jun 27, 2020 at 19:05

Ricky Sahu
21.3k44 gold badges3939 silver badges3030 bronze badges
This doesn't support steps. – 
Mark Stosberg
 Jul 10, 2020 at 19:51
Add a comment
Your Answer


--------------------------------------------------------------





JavaScript Array every()
Example 1
Check if all values in ages[] are over 18:

const ages = [32, 33, 16, 40];

ages.every(checkAge)

function checkAge(age) {
  return age > 18;
}
More "Try it Yourself" examples below.

Definition and Usage
The every() method executes a function for each array element.

The every() method returns true if the function returns true for all elements.

The every() method returns false if the function returns false for one element.

The every() method does not execute the function for empty elements.

The every() method does not change the original array

Syntax
array.every(function(currentValue, index, arr), thisValue)
Parameters
Parameter	Description
function()	Required.
A function to be run for each element in the array.
currentValue	Required.
The value of the current element.
index	Optional.
The index of the current element.
arr	Optional.
The array of the current element.
thisValue	Optional. Default undefined.
A value passed to the function as its this value.
Return Value
Type	Description
A boolean	true if all elements pass the test, otherwise false.
Browser Support
every() is an ECMAScript5 (ES5) feature.

ES5 (JavaScript 2009) fully supported in all browsers:

Chrome	IE	Edge	Firefox	Safari	Opera
Yes	9-11	Yes	Yes	Yes	Yes
More Examples
Check if all answers are the same:

const survey = [
  { name: "Steve", answer: "Yes"},
  { name: "Jessica", answer: "Yes"},
  { name: "Peter", answer: "Yes"},
  { name: "Elaine", answer: "No"}
];

let result = survey.every(isSameAnswer);

function isSameAnswer(el, index, arr) {
  if (index === 0) {
    return true;
  } else {
    return (el.answer === arr[index - 1].answer);
  }
}
Check if all values are over a specific number:

<p><input type="number" id="ageToCheck" value="18"></p>

<button onclick="myFunction()">Try it</button>

<p id="demo"></p>

<script>
const ages = [32, 33, 12, 40];

function checkAge(age) {
  return age > document.getElementById("ageToCheck").value;
}

function myFunction() {
  document.getElementById("demo").innerHTML = ages.every(checkAge);
}
</script>




------------------------------------------------------------------



JavaScript Array every: Determining If All Array Elements Pass a Test
If this JavaScript tutorial saves you hours of work, please whitelist it in your ad blocker ?? and
Donate Now
to support us ?? in paying for web hosting and CDN to keep the site running.
Summary: in this tutorial, you will learn how to check whether all the array elements pass a test using the JavaScript Array every() method.

Checking array elements using the for loop
Sometimes, you need to test whether every element of an array satisfies a specified condition.

Typically, you use a  for loop to iterate all elements and check each individual element against the condition. Suppose that you have an array numbers with three elements:

let numbers = [1, 3, 5];
Code language: JavaScript (javascript)
The following code checks if every element in the numbers array is greater than zero:

let numbers = [1, 3, 5];
let result = true;
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] <= 0) {
        result = false;
        break;
    }
}
console.log(result);
Code language: JavaScript (javascript)
Output:

true
Code language: JavaScript (javascript)
How it works:

First, initialize the  result variable to true.
Second, iterate over the elements of the numbers array and check whether each element is less than or equal zero. If it is the case, set the result variable to false and terminate the loop immediately using the break statement. In case no element is less than or equal zero, the value of the result variable remains  true.
This code is simple and straight forward. However, it is quite verbose.

JavaScript Array type provides the every() method that allows you to check if every element of an array pass a test in a shorter and cleaner way.

Introduction to JavaScript Array every() method
Starting from ES5, JavaScript Array type provides a method every() that tests every element in an array.

The following example uses the every() to check if every element of the numbers array is greater than zero:

let numbers = [1, 3, 5];
let result = numbers.every(function (e) {
    return e > 0;
});

console.log(result);
Code language: JavaScript (javascript)
Output:

true
Code language: JavaScript (javascript)
By using the ES6 arrow functions, the code can be even shorter:

let numbers = [1, 3, 5];

let result = numbers.every( e  => e > 0);

console.log(result);
Code language: JavaScript (javascript)
It is also much cleaner, isn’t it?

The following illustrates the syntax of the every() method.

arrayObject.every(callback[, thisArg])
Code language: CSS (css)
The every() method accepts two named arguments: callback and thisArg.

1) The callback argument
The callback is a function that tests each element of the array. The callback() function has the following form:

function callback(currentElement, index, array){
   //...
}
Code language: JavaScript (javascript)
The callback() function takes three arguments:

First, the currentElement is the current element that is being processed.
Second, the index is the index  of the currentElement.
Third, the array is the array that the every() method was called upon.
The currentElement argument is required whereas the index and array arguments are optional.

2) The thisArg argument
The thisArg argument of the every() method is optional. If you pass the thisArg argument into the method, the this value inside the callback function will reference the thisArg argument.

The every() method returns true if the callback function returns a truthy value for every array element; otherwise, it returns false.

Note that the every() method executes the callback() function on every element in the array until it finds the one that causes the callback() return a falsy value.

In other words, the every() will stop calling the callback() function and return false once there is an array element that causes callback() to return a falsy value.

Let’s take a look at some more examples of using the every() method.

More JavaScript Array every() method examples
The following example tests whether all the array elements are the even numbers

let numbers = [1, 3, 5];
let isEven = numbers.every(function (e) {
    return e % 2 == 0;
});

console.log(isEven);
Code language: JavaScript (javascript)
Output:

false
Code language: JavaScript (javascript)
In contrast, the following example tests if all the array elements are the odd numbers.

let numbers = [1, 3, 5];

let isOdd = numbers.every(function (e) {
    return Math.abs(e % 2) == 1;
});

console.log(isOdd);
Code language: JavaScript (javascript)
Output:

true
Code language: JavaScript (javascript)
Suppose that you have an object with two properties: min and max:

let range = {
    min: 0,
    mas: 10
};
Code language: JavaScript (javascript)
The following example tests whether all elements in the numbers array is in the range specified by the min and max of the range object.

let numbers = [1, 3, 5];

let range = {
    min: 0,
    max: 10
};

let isInRange = numbers.every(function (e) {
    return e >= this.min && e <= this.max;
}, range);
Code language: JavaScript (javascript)
Output:

true
Code language: JavaScript (javascript)
In this example, we pass the range object to the every() method as the second argument. And inside the callback() function, we reference the range object using the this keyword.

Caution: Empty arrays
If you call the every() method on an empty array, the method will always return true for any condition. For example:

let gtZero = [].every(e => e > 0); // any condition
let ltZero = [].every(e => e < 0); // any condition

console.log('gtZero:', gtZero);
console.log('ltZero:', ltZero);
Code language: JavaScript (javascript)
Output:

gtZero: true
ltZero: true
Code language: JavaScript (javascript)
In this tutorial, you have learned how to use the JavaScript Array every() method to test whether all elements in an array pass the test provided by a test function.



--------------------------------------------------------------


Python all() Function

Example
Check if all items in a list are True:

mylist = [True, True, True]
x = all(mylist)
Definition and Usage
The all() function returns True if all items in an iterable are true, otherwise it returns False.

If the iterable object is empty, the all() function also returns True.

Syntax
all(iterable)
Parameter Values
Parameter	Description
iterable	An iterable object (list, tuple, dictionary)
More Examples
Example
Check if all items in a list are True:

mylist = [0, 1, 1]
x = all(mylist)
Example
Check if all items in a tuple are True:

mytuple = (0, True, False)
x = all(mytuple)
Example
Check if all items in a set are True:

myset = {0, 1, 0}
x = all(myset)
Example
Check if all items in a dictionary are True:

mydict = {0 : "Apple", 1 : "Orange"}
x = all(mydict)
Note: When used on a dictionary, the all() function checks if all the keys are true, not the values




--------------------------------------------------



Python | set() method
Difficulty Level : Easy
Last Updated : 19 Feb, 2022
Set, a term in mathematics for a sequence consisting of distinct language is also extended in its language by Python and can easily be made using set().

set() method is used to convert any of the iterable to sequence of iterable elements with distinct elements, commonly called Set. 

Syntax : set(iterable)
Parameters : Any iterable sequence like list, tuple or dictionary.
Returns : An empty set if no element is passed. Non-repeating element iterable modified as passed as argument. 
 

Don’t worry if you get an unordered list from the set. Sets are unordered. Use sorted(set(sampleList)) to get it sorted

Code #1 : Demonstrating set() with list and tuple 


# Python3 code to demonstrate the
# working of set() on list and tuple
 
# initializing list
lis1 = [ 3, 4, 1, 4, 5 ]
 
# initializing tuple
tup1 = (3, 4, 1, 4, 5)
 
# Printing iterables before conversion
print("The list before conversion is : " + str(lis1))
print("The tuple before conversion is : " + str(tup1))
 
# Iterables after conversion are
# notice distinct and elements
print("The list after conversion is : " + str(set(lis1)))
print("The tuple after conversion is : " + str(set(tup1)))
Output:  

The list before conversion is : [3, 4, 1, 4, 5]
The tuple before conversion is : (3, 4, 1, 4, 5)
The list after conversion is : {1, 3, 4, 5}
The tuple after conversion is : {1, 3, 4, 5}
Properties of set()
No parameters are passed to create the empty set
Dictionary can also be created using set, but only keys remain after conversion, values are lost.
Code #2: Demonstration of working of set on dictionary  


# Python3 code to demonstrate the
# working of set() on dictionary
 
# initializing list
dic1 = { 4 : 'geeks', 1 : 'for', 3 : 'geeks' }
 
# Printing dictionary before conversion
# internally sorted
print("Dictionary before conversion is : " + str(dic1))
 
# Dictionary after conversion are
# notice lost keys
print("Dictionary after conversion is : " + str(set(dic1)))
Output
Dictionary before conversion is : {4: 'geeks', 1: 'for', 3: 'geeks'}
Dictionary after conversion is : {1, 3, 4}
Time Complexity: Set method is implemented as a hash table, so the time complexity is O(1). 

 Attention geek! Strengthen your foundations with the Python Programming Foundation Course and learn the basics.  

To begin with, your interview preparations Enhance your Data Structures concepts with the Python DS Course. And to begin with your Machine Learning Journey, join the Machine Learning - Basic Level Course








---------------------------------------------------







is there some method of array like set in python?
Asked 10 years, 2 months ago
Modified 1 year, 5 months ago
Viewed 6k times

9


3
As I know in python i can set a list to a unique list like:

In [12]: a=range(12)

In [13]: a.append(5)

In [14]: a.append(4)

In [15]: a.append(5)

In [16]: a
Out[16]: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 5, 4, 5]

In [17]: set(a)
Out[17]: set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
it is very useful for some scene, i just want to know how to this in javascript,

javascript
list
arraylist
Share
Improve this question
Follow
asked Dec 21, 2011 at 5:41

timger
91522 gold badges1111 silver badges3030 bronze badges
I recommend very highly that you search Google before you ask questions here. I Googled it and found that there is no native 'Set' in Javascript. It will be simple to implement your own Set data-structure. – 
Zéychin
 Dec 21, 2011 at 5:45
The question was at the top of google when I searched. – 
nu everest
 Sep 20, 2016 at 21:16
Add a comment
5 Answers

8

Javascript does not have the notion of sets. However, you can use a side effect of the fact that objects cannot have duplicate property names to replicate the functionality of a set, as seen on this blog article about the topic.

From the article:

var your_array = ['a', 'a', 'a', 'b', 'b'],
    set = {};
for (var i = 0; i < your_array.length; i++)
   set[your_array[i]] = true;
list = [];
for (var item in set)
   list.push(item);
EDIT in 2017: This is no longer true, JS got set support! MDN Docs

empty_set = new Set()
three_element_set = new Set([1, 1, 1, 2, 2, 3])
three_element_set.add(3) // still three element set
Share
Improve this answer
Follow
edited Dec 24, 2019 at 5:40

Gruber
1,88544 gold badges2424 silver badges4444 bronze badges
answered Dec 21, 2011 at 5:48

Interrobang
16.3k33 gold badges5252 silver badges6262 bronze badges
Add a comment

1

No, there isn't. JS is pretty basic, you have to either do it yourself or find a library where someone else has already done it.

The standard way to do this is usually insert elements into a hash, then collect the keys - since keys are guaranteed to be unique. Or, similarly, but preserving order:

function uniq(arr) {
  var seen = {}, result = [];
  var len = arr.len;
  for (var i = 0; i < len; i++) {
    var el = arr[i];
    if (!seen[el]) {
      seen[el] = true;
      result.push(el);
    }
  }
  return result;
}
Share
Improve this answer
Follow
edited Jun 25, 2013 at 9:35

Glycerine
6,65733 gold badges3838 silver badges6363 bronze badges
answered Dec 21, 2011 at 5:45

Amadan
176k1919 gold badges213213 silver badges271271 bronze badges
Add a comment

1

Create a Set object with the Set() constructor. The argument to the Set() constructor need not be an array: any iterable object (including other Set objects) is allowed.

 let myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 5, 4, 5]
 let mySet = new Set(myArray); //output: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
Another example:

  let unique = new Set("Mississippi"); //output: [ "M", "i", "s", "p" ]
ref. JavaScript_ The Definitive Guide, David Flanagan -(2020)

Share
Improve this answer
Follow
answered Oct 7, 2020 at 8:27

Nasim B. D
12111 silver badge66 bronze badges
Add a comment

0

Firefox 13+ provides an experimental implementation of sets. link.

Share
Improve this answer
Follow
answered Jun 24, 2013 at 1:04

mquandalle
2,5901919 silver badges2323 bronze badges
Add a comment

0

Very late to the party, but as of ECMAScript 2015 the "experimental implementation" mentioned in mquandalle's answer is no longer experimental and is instead part of the standard. Browser compatibility

Share
Improve this answer
Follow
answered Jul 15, 2020 at 8:46

AbyxDev
9411313 silver badges2626 bronze badges
Add a comment
Your Answer




---------------------------------------------------------------------------


