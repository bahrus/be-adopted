# be-adopted [TODO]

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