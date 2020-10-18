# Unicorn Shopify
This is an training... Don't panic, see, fix and have fun!   
_Little application embbeded into Shopify in order to enter your contact._

## Summary
- [Getting Started](#getting-started)
- [Launch the rocket](#launch-the-rocket)
- [Install widget](#install-widget)

## Getting Started
**First of all, you need some stuffs on your machine**
- Have got an account on [Shopify Partners](https://partners.shopify.com/)
- Have got a [Shopify shop](https://shopify.ca)
- Have got [Ngrok](https://ngrok.com/)


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
### Get Snippet
On your Shopify Configuration, you should have an snippet that you copy-past in your theme in order to see to appear your widget. That should looks like:
```html
<div id="unicorn-widget"></div>
<script type="text/javascript" src="${URL_APP}/unicorn-widget.js"></script>
<script type="text/javascript">
    // Here 'unicorn-widget' value is optional, indeed, 
    // the default ID is unicorn-widget
    UnicornWidget('unicorn-widget') 
</script>
```
> **The parameter `${URL_APP}` will be your Ngrok Address**

You could put your widget where you want! If you want change the `id`, you must to report at `UnicornWidget` function!

### Insert in your theme
#### Modify your theme
Like we said just above, you have to inject this snippet in your theme? **How do you wonna say me?** Follow this path... In your **Admin Shop** (a little bit recall that looks like at `my-boutique.myshopify.com`) in your aside bar `Online Store > Themes`. You must have a `Customize` Button in your interface.

#### Inject the widget
**For everyone**, you are going to have the power to `Add section`.
- In your sidebar, choose `Add Section`
- In this new Section, you could change the `Heading` and `Add content`
- Click on `Add content` and choose `Custom HTML`
- Copy-Past your widget, see [this section](#get-snippet) for more information

**For developers**, you have the power to change everything! 
- If you use the templating engine of Shopify `liquid`, you can insert it the snippet in your code where do you want!
- If you use a Front-End Framework, you can just insert in your head the `script` tag and initialize the widget!


