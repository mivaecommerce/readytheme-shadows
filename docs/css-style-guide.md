# CSS Style Guide

## Contents

### Writing CSS

* [Template](#template)
* [Architecture](#architecture)
* [Formatting](#formatting)
* [Indenting](#indenting)
* [Whitespace](#whitespace)
* [Selectors and Naming](#selectors-and-naming)
* [Properties](#properties)
* [Modifying](#modifying)
* [Specificity](#specificity)
* [Commenting](#commenting)
* [Versioning](#versioning)
* [Resources and Acknowledgements](#resources-and-acknowledgements)

---

## Writing CSS

### Template

Before diving into the details of CSS coding style, you can find a conforming, `.css` template over at [https://git.io/vdoF3](https://github.com/mivaecommerce/readytheme-shadows/blob/master/docs/stylesheet-template.css).

[⬆ Back to contents](#contents)

### Architecture

Project stylesheets should be structured following closely to the principles of [ITCSS](https://medium.com/@jordankoschei/how-i-shrank-my-css-by-84kb-by-refactoring-with-itcss-2e8dafee123a#.7gdzbrk1m), imported in the following order for greater control over re-usability and specificity:

0. **Base** - High-level styles such as resets and [normalize.css](https://github.com/necolas/normalize.css).
0. **Elements** - Base HTML styling.
0. **Objects** - Common non-cosmetic structural design patterns.
0. **Components** - Specific cosmetic elements of UI.
0. **Utilities** - Helpers and overrides.

[⬆ Back to contents](#contents)

### Formatting

* Use hard tabs set to **4** spaces for indentation.
  * Nested elements should be indented only once from their parent element.
* Use lower-case hyphenated naming over camelCase.
* Put a space before an opening bracket `{` and a new line after.
* Put a new line before and after a closing bracket `}`.
* Put a space after, but not before, a colon `:`.
* Put a new line after a semi-colon `;`, with no space before.
* Use `/* comment */` for all commenting.
  * Outputted comments are useful for debugging, and can always be removed later in production using various build tools.
* Leave an empty line at the end of a file.
* Use leading zeros for decimal values (e.g. `0.5` instead of `.5`) for better readability.
* Don't specify units for zero values (e.g. `0` instead of `0px`) unless it is necessary for use in `calc()` functions.
* Comma-separated property values should include a space after each comma `,` (e.g. `font-family`).
* Don't include spaces after commas within `rgb()`, `rgba()`, `hsl()`, `hsla()`, or `rect()` values.
  * This will help differentiate multiple color values (comma, no space) from multiple property values (comma with space).
* Use lowercase, shorthand hex values where available (e.g., `#fff` instead of `#ffffff`).
  * Lowercase letters are much easier to discern when scanning a document as they tend to have more unique shapes.
* Multi-attribute selectors should go on separate lines.
* When using vendor prefixed properties, they should be placed directly before the generic property they refer to.

[⬆ Back to contents](#contents)

### Indenting

For each level of markup nesting, indent your CSS to match.

```css
nav {}
	nav li {}
		nav li a {}

.content {}
	.content p {}
```

[⬆ Back to contents](#contents)

### Whitespace

As well as indentation, we can provide a lot of information through liberal and judicious use of whitespace between rule-sets.

* One (1) empty line between closely related rule-sets.
* Two (2) empty lines between loosely related rule-sets.
* Five (5) empty lines between entirely new sections.

```css
/*------------------------------------*\
    #FOO
\*------------------------------------*/

.foo {}

	.foo__bar {}


.foo--baz {}





/*------------------------------------*\
    #BAR
\*------------------------------------*/

.bar {}

	.bar__baz {}

	.bar__foo {}
```

There should never be a scenario in which two rule-sets do not have an empty line between them. This would be incorrect:

```css
.foo {}
	.foo__bar {}
.foo--baz {}
```

[⬆ Back to contents](#contents)

### Selectors and Naming

It's important we keep code transparent and self-documented when it comes to naming our selectors.

:x: **Don't**

* **Don't** use `html` tags in selectors.
  * Exceptions to this might be for targeting elements within non-editable Miva tokens.
* **Don't** use IDs (`#`) in selectors.
* **Don't** unnecessarily nest selectors.
  * Try to keep selectors flat, at the same level of specificity.
  * Avoid going more than 2 levels deep.

:white_check_mark: **Do**

* **Do** use classes.

[⬆ Back to contents](#contents)

#### BEM

**B**lock, **E**lement, **M**odifier

[BEM](http://getbem.com/naming/) is naming convention that aims to improve readability and re-usability.

All CSS class names should follow the BEM pattern. Name classes by the nature of **what it is** rather than what it looks like. A class of `blueBox-left` may seem relevant at the time, but should its color or position change, it will become meaningless. Naming in conjunction with a more OOCSS approach should eliminate this ambiguity.

##### Block

A block represents an independent component and should **specifically** describe its purpose.

```html
<div class="block"></div>
```

For more detail on BEM blocks, visit [bem.info](https://en.bem.info/methodology/quick-start/#block).

##### Element

Elements represent parts of a block and cannot be used separately, they have no standalone meaning.

An element should be named to describe its purpose, prefixed with a double underscore `__` to separate from the block.

```html
<div class="block">
	<div class="block__element">
	</div>
</div>
```

In your stylesheet this would look like:

```css
.block {
	/* block styles here */
}

	.block__element {
		/* element styles here */
	}
```

:warning: **Do not** create elements inside elements (e.g. `.block__element__element`). Consider creating a new block for the parent element instead.

For more detail on BEM elements, visit [bem.info](https://en.bem.info/methodology/quick-start/#element).

##### Modifier

Modifiers define a change in cosmetics, used alongside a block or element.

Changes in a state should not be dictated by modifiers, and are handled [slightly differently](#states).

A modifier should be named to describe its purpose, prefixed with a double hyphen `--` to separate from the block or element.

```html
<div class="block block--modifier">
	<div class="block__element">
	</div>
</div>
```

and / or

```html
<div class="block">
	<div class="block__element block__element--modifier">
	</div>
</div>
```

In your stylesheet this would look like:

```css
.block {
	/* block styles here */
}

	.block--modifier {
		/* modifier styles here */
	}
```

For more detail on BEM
modifiers, visit [bem.info](https://en.bem.info/methodology/quick-start/#modifier).

#### States

* `is-`
* `has-`

State prefixes signify that the piece of UI in question is currently styled a certain way because of a [state or condition](https://smacss.com/book/type-state). It tells us that the DOM currently has a temporary, optional, or short-lived style applied to it due to a certain state being invoked.

```html
<div class="c-example is-active"></div>
```

or

```html
<div class="c-example">
	<div class="c-example__element is-active">
	</div>
</div>
```

#### Namespacing

Following a prefix convention provides better insight into a class' purpose for other developers to work with.

* `o-` signifies that this class is an **Object**, and that it may be used in any number of unrelated contexts to the one you can currently see it in. :warning: Making modifications to these types of class could potentially have knock-on effects in a lot of other unrelated places.
* `c-` signifies that this class is a **Component**. This is a concrete, implementation-specific piece of UI. All of the changes you make to its styles should be detectable in the context you're currently looking at. Modifying on top of these styles should be safe and have no side effects.
* `u-` signifies that this class is a **Utility** class. It has a very specific role (often providing only one declaration) and should not be bound onto or changed. It can be reused and is not tied to any specific piece of UI. You will probably recognise this namespace from libraries and methodologies like SUIT.
* `t-` signifies that a class is responsible for adding a **Theme** to a view. It lets us know that UI Components' current cosmetic appearance may be due to the presence of a theme.

[⬆ Back to contents](#contents)

### Properties

Properties should be ordered in the following manner (a style similar to [Dropbox](https://github.com/dropbox/css-style-guide#rule-ordering)) to promote readability:

1. **Structure** - `display`, `position`, `margin`, `padding`, `width`, `height`, `box-sizing`, `overflow` etc.
1. **Typography** - `font-*`, `line-height`, `text-*`, `letter-spacing` etc.
1. **Cosmetic** - `color`, `background-*`, `border-*`, `animation`, `transition` etc.
1. **Native interaction** - `appearance`, `cursor`, `user-select`, `pointer-events` etc.
1. **Pseudo-elements** - `::before`, `::after` etc.
1. **Pseudo-classes** - `:hover`, `:focus`, `:active` etc.
1. **@media** - media queries should be defined last for ease of modification and readability.

Defining separately:

0. [**State classes**](#states)
0. [**Modifier classes**](#bem)

##### Example

```css
.c-example {
	padding: 1rem;
	position: relative;
	font-size: 1.25rem;
	color: #000;
	border: 1px solid #ccc;
	transition: border ease 1s;
}

	.c-example:focus,
	.c-example:hover {
		text-decoration: underline;
		border: 1px solid #000;
	}
	
	@media(min-width: 48em) {
		.c-example {
			font-size: 1em;
		}
	}

/* States
  =========================================== */

.c-example.is-active {
	border-color: blue;
}

/* Modifiers
  =========================================== */

.c-example--large {
	font-size: 2.5rem;
}
```

[⬆ Back to contents](#contents)

### Modifying

:warning: **Never** directly overwrite a previously defined class.

Avoid the confusion of selectors being defined in multiple places by using a new [BEM](#bem) `--modifier` class.

```scss
/* .c-example is a component defined earlier in the project */

/* DO NOT overwrite the class */
.c-example {
	color: red;
}

/* DO create a new `--modifier` class */
.c-example--error {
	color: red;
}
```

[⬆ Back to contents](#contents)

### Specificity

By following the steps above (specifically by using classes and limited nesting) conflicts with specificity shouldn't be a problem.

:warning: **Never** use `!important`

If you're struggling to override styles, battling specificity, the safest option is to [chain the selector to itself](http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/#safely-increasing-specificity). In SCSS we can achieve this by:

```css
.c-example {
	color: #4a4a4a;
}

.c-example.c-example {
	text-decoration: none;
}
```

[⬆ Back to contents](#contents)

### Commenting

Comment as much as you can as often as you can. Where it might be useful, include a commented out piece of markup which can help put the current CSS into context.

Code is written and maintained by people. Ensure your code is descriptive, well commented, and approachable by others. Great code comments convey context or purpose. Do not simply reiterate a component or class name.

Be sure to write in complete sentences for larger comments and succinct phrases for general notes.

CSS may be minified before it hits live servers, so don't worry about excessive commenting bloating code - the benefits far outweigh any file-size worries.

For large comments that document entire sections or components, we use a DocBlock-esque 
multi-line comment which adheres to a 80 column width.

```css
/**
 * The site’s main page-head can have two different states:
 *
 * 1) Regular page-head with no backgrounds or extra treatments; it just contains the logo and nav.
 * 2) A masthead that has a fluid-height (becoming fixed after a certain point) which has a large 
 * background image, and some supporting text.
 *
 * The regular page-head is incredibly simple, but the masthead version has some slightly  
 * intermingled dependency with the wrapper that lives inside it.
 */
```

This level of detail should be the norm for all non-trivial code—descriptions of states, permutations, conditions, and treatments.

When working across multiple partials, or in an OOCSS manner, you will often find that rule-sets that can work in conjunction with each other are not always in the same file or location. For example, you may have a generic button object—which provides purely structural styles—which is to be extended in a component-level partial which will add cosmetics. We document this relationship across files with simple object–extension pointers. In the object file:

```css
/**
 * Extend `.btn {}` in components.buttons.css.
 */

.btn {}
```

And in your theme file:

```css
/**
 * These rules extend `.btn {}` in objects.buttons.css.
 */

.btn--positive {}

.btn--negative {}
```

This simple, low effort commenting can make a lot of difference to developers who are unaware of relationships across projects, or who are wanting to know how, why, and where other styles might be being inherited from.

[⬆ Back to contents](#contents)

### Versioning

The CSS Style Guide follows [Semantic Versioning](http://semver.org) to help manage the impact of releasing new library versions.

[⬆ Back to contents](#contents)

### Resources and Acknowledgements

#### Reference

* [CSS Almanac (CSS-Tricks)](https://css-tricks.com/almanac/)
* [cssreference.io](http://cssreference.io/)
* [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)

#### Guides

* [Code Guide](http://codeguide.co/)
* [CSS Guidelines](http://cssguidelin.es/)
* [idiomatic-css](https://github.com/necolas/idiomatic-css)
* [OOCSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/)

#### Organization Style Guides

* [Sky-UK](https://github.com/sky-uk/css)
* [Airbnb](https://github.com/airbnb/css)
* [Dropbox](https://github.com/dropbox/css-style-guide)
* [Primer (GitHub)](http://primercss.io/guidelines/)

[⬆ Back to contents](#contents)
