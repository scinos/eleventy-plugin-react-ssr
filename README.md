# eleventy-plugin-react-ssr

This plugin allows you to write your Eleventy content using JSX as a template language, and render it using React
server-side render.

## Installation

```shell
yarn add --dev eleventy-plugin-jsx
```

## Usage

### Enabling the plugin

The first step is to enable the plugin in your Eleventy config

```js
// .eleventy.js
const eleventyReactSSRPlugin = require('eleventy-plugin-react-ssr');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyReactSSRPlugin);
};
```

### Writing pages

Just use the extension `.jsx` for your page, and write it using JSX.

Pages are expected to have a default export with the main component (either Function Component or Class Component, both
will work):

```jsx
function MyPage() {
    return <h1>Hello world</h1>;
}

export default MyPage;
```

### Defining page data

If you need to define page data (similar to a front matter in a Markdown page), use the static property `data`

```jsx
function MyPage() {
    return <h1>Hello world</h1>;
}

MyPage.data = {
    title: 'Hello world',
    layout: 'main',
    permalink: 'hello.html',
    customData: {
        foo: 'bar',
    },
};

export default MyPage;
```

### Using page data

You may want to use the data provided by Eleventy in your page. This can be done using React Context and a hook:

```jsx
import { EleventyContext } from 'eleventy-plugin-react-ssr/eleventy-context';
import { useContext } from 'react';

function MyPage() {
    // Access to anything from the data cascade, including page data
    // and Eleventy supplied data from https://www.11ty.dev/docs/data-eleventy-supplied/
    const { title, customData, page } = useContext(EleventyContext);

    return (
        <>
            <h1 className={customData.foo}>{title}</h1>
            <p>URL: {page.ur}</p>
        </>
    );
}

MyPage.data = {
    title: 'Hello world',
    customData: {
        foo: 'bar',
    },
};

export default MyPage;
```

### Writing layouts

It is possible to write layouts using JSX too. However, I'll recommend to only use layouts if the content comes from a
diffrent template language (eg: you have content in Markdown that you'd like to render inside a JSX layout). If you want
to do "JSX in JSX" (content in JSX, layout in JSX as well), check the next section.

```markdown
// page.md
---
layout: layout/main.jsx
title: My page
---
My page is aweseome
```

```jsx
// _includes/layout/main.jsx
import { EleventyContext } from 'eleventy-plugin-react-ssr/eleventy-context';
import { useContext } from 'react';

function MainLayout() {
    const { content, title } = useContext(EleventyContext);

    return (
        <>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </>
    );
}

export default MainLayout;
```

### Page components

If you don't have content in other template languages (ie: all your pages are JSX), then I'd recommend to not use
layouts, and use components instead.

```jsx
// ./_includes/components/html-page.jsx

export function HTMLPage({ lang, children }) {
    return (
        <html lang={lang}>
            <head>{/* Link to styles, scripts, etc. */}</head>
            <body>{children}</body>
        </html>
    );
}
```

```jsx
// page.jsx
import { HTMLPage } from './_includes/components/html-page';

function MyPage() {
    return (
        <HTMLPage lang="en">
            <h1>Hello world</h1>
        </HTMLPage>
    );
}

export default MyPage;
```

This way, the page will be JSX all the way to the end, and you can pass props to the page component.

If you really want to, you can use a JSX layout for a JSX page. It will work, but it will be a bit hacky as you need to
use `dangerouslySetInnerHTML` to render it, and use page data to simulate passing props.
