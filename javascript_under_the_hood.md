# Javascript: under the hood

---

人们常说编程语言是一门工具，这句话有几分道理，旨在强调用什么样的编程语言并不重要，重要的是能完成工作。这一点非常符合工具本身的定义，指能够方便人们完成工作的器具。但编程语言不仅仅是一个工具，它同样也是软件产品的载体。所以我们很有必要弄清楚一门编程语言背后的原理，这样能够是我们的软件产品更可靠，也能让开发者快速地解决BUG。Javascript是当今世界最为流行地编程语言之一，其背后的运行机理却是被很多使用者忽视。当然这也和Javascript的现状有关，Javascript有着极其丰富的类库和框架，很多初学者一开始就接触JQuery，AngularJS这些类库和框架，虽然用它们能快速地做出用原生JS较难实现的功能，但也会让新手无法看到隐藏其中的Javascript原理，进而在遇到BUG的时候难以解决。本文旨在将自己对于Javscript的理解记录下来，以便未来的自己能够快速的复习这些知识。

Todo:

// 文章的重点在于解释出Javascript背后的很多原理，特色是解释清楚每个概念的含义，包括对一些详细概念的深度探索。
// 先记录下重点概念及其解释，到后面再串联起来
// 可以先展示一段代码然后再去解释其背后的原理，以这种方式组织文章

## Table of Contents

  1. [Syntax Parser](#syntax-parser)
  1. [Lexical Environment](#lexical-environment)

Snippet 1.1
```javascript

```

### Syntax Parser
A program that reads your code and determines what it does and if its grammar is valid.

Syntax Parser 也是编译器(compiler)或解释器(interpretor)的一部分。 这里就不过多说明编译器和解释器的区别，他们本质上都是将你写的代码变成计算机指令，在你和计算机中间充当一个翻译的角色。正因为如此，编译器和解释器在翻译的同时也可以做一些**额外**的工作。


### Lexical Environment
Where something sits physically in the code you write.

'Lexical' 本意是 'of or relating to words or the vocabulary of a language as distinguished from its grammar and construction'。它指的是“语言中单词和词汇相关的, 区别于语言的语法和构造等其他方面“。而词汇有什么特点呢, 词典中通常是一个单词后面跟它的释义，这个可以和函数定义联系起来，将函数名称看作单词本身，函数的代码看作单词的释义。


Execution Context: A wrapper to help manage the code that is currently running.

There are a lots of lexical environments. Which one is currently running is managed via execution context. It can contain things beyond what you've written in your code.

任何Javascript代码运行时都会处在一个Execution Context中，每个Execution Context都包含:

- Global Object
- special `this` variable
- A reference to its outer environment

这些内容都是Javascript Engine自动帮我们创建的。




