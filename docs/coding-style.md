# Coding Style

Elements is a css framework built using a class-based architecture, based on 
the [BEM(IT) naming convention](http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/).

## Structure

Elements is split into 3 sections:

* **`core`** - Core contains everything except Extensions and theme specific settings. In theory core should remain stable and changes should be minimal. The core is essential to all Elements projects.
* **`extensions`** - Extensions contains only Extensions! Generally, extensions are self-contained components which may include HTML, CSS, and/or JavaScript in a name-spaced environment. We recommend including extensions as required to prevent unnecessary CSS and/or JavaScript from being included in a project.
* **`ui`** - UI contains only Components. Generally the components are most susceptible to change and keeping them isolated makes maintenance much more efficient. We recommend including components as required to prevent unnecessary CSS being included in a project.

Elements is structured based on [ITCSS](http://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528), we split the framework in to several 
layers:

* **base** - This is the first layer which outputs any actual CSS. It usually contains CSS resets, font imports etc.
* **elements** - Elements contains any CSS pertaining to HTML elements such as 
`html`, `table`, or `h1`.
* **objects** - Objects is the first layer containing class-based selectors, we 
prefix objects with `o-`. It should contain any non-cosmetic design patterns 
styling such as `.o-container`.
* **components** - The Components layer is where the 
majority of the CSS will be written. Components handle the cosmetic design 
patterns and UI elements such as `.c-table` or `.c-button`.
* **utilities** - The Utilities layer is reserved for styling which will take 
precedence over other classes. These are generally utilities such as 
`.u-inline-block` which sets an element to `display: inline-block` or 
`.u-text-center` which forces `text-align: center`.

##Naming Conventions

Our CSS classes follow the structure:

```css
.<namespace>-<block>[__<element>][--<modifier>]
```

Some examples of suitable class names:

```css
.c-tile {...}

.o-container--wide {...}

.is-hidden--large {...}

.c-form-list__item--for {...}
```
We should NEVER use the following class names:

```css
.c-block--modifier__element {...}

.c-block__element__element {...}

.c-block@medium--modifier {...}
```