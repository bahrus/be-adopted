# be-adopted

<a href="https://nodei.co/npm/be-adopted/"><img src="https://nodei.co/npm/be-adopted.png"></a>

[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-adopted?style=for-the-badge)](https://bundlephobia.com/result?p=be-adopted)

<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-adopted?compression=gzip">

be-adopted is an HTML style tag decorator / behavior based on the [be-decorated](https://github.com/bahrus/be-decorated) approach to progressively enhancing elements.

[![Playwright Tests](https://github.com/bahrus/be-adopted/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-adopted/actions/workflows/CI.yml)

```html
<html>
    <head>
        ...
        <link be-preemptive rel=preload id=@my-package/my-web-component/my-styles.css integrity=...>
    </head>
    <body>
        ...
        <my-web-component>
            <style be-adopted=@my-package/my-web-component/my-styles.css></style>
        </my-web-component>
    </body>
</html>
```

be-adopted plays by the same rule-book as [be-loaded](https://github.com/bahrus/be-loaded).  The difference is be-loaded adds style to the shadow DOM realm it belongs to.

be-adopted, instead, does the following:

1.  It adds itself to the shadowRoot of the parent element.
2.  It changes its attribute from be-adopted to be-loaded.

So if my-web-component's internal shadowDOM opts in to incorporate be-loaded, it will "adopt" the styles.

## Why?

**The strong case:**  Sometimes a web component is specifically designed to allow the consumer to provide templates that are used within its shadow DOM.  This component provides a common usage pattern for specifying styles as well.

**The weak case:** Sometimes a web component doesn't provide enough flexibility as far as styling.  This component can help in a pinch.

## Really opting in

There's one more step that may be necessary for the component being targeted to opt in -- if the light children are not slotted somewhere, and if my-web-component is likely to be upgraded prior to be-adopted getting upgraded, then the style tag might not be "visible", which is a requirement for be-decorated based decorators / behaviors to be initialized.

So to be safe, the targeted component should also provide one slot for be-adopted to use in order to work.