# Unicorn Shopify
This is an training... Don't panic, see, fix and have fun!   
_Little application embbeded into Shopify in order to enter your contact._

## Summary
- [Getting Started](#getting-started)
- [Launch the rocket](#launch-the-rocket)
- [Install widget](#install-widget)

## Getting Started
Install the application
```bash
$ yarn install
```

### Enter your `.env`
Firstly, you must create an `.env` environement. Inspire you of the `.env.dev`.
In this goal, you have to have Shopify API and an Airtable Database.
```bash
SHOPIFY_API_KEY=''
SHOPIFY_API_SECRET_KEY=''
AIRTABLE_URL=''
AIRTABLE_DATABASE_ID=''
AIRTABLE_API_KEY=''
API_URL=''
```

## Install Widget
On your Shopify, you should have an snippet that you copy-past in your theme in order to see to appear your widget. That should looks like:
```html
<div id="unicorn-widget"></div>
<script type="text/javascript" src="${URL_API}/unicorn-widget.js"></script>
<script type="text/javascript">
    // Here 'unicorn-widget' value is optional, indeed, 
    // the default ID is unicorn-widget
    UnicornWidget('unicorn-widget') 
</script>
```
You could put your widget where you want! If you want change the `id`, you must to report at `UnicornWidget` function!
