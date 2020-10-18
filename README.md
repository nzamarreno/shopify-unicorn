# Unicorn Shopify
This is an training... Don't panic, see, fix and have fun!   
_Little application embbeded into Shopify in order to enter your contact._

## Summary
- [Getting Started](#getting-started)
- [Configurations](#Configurations)
- [Launch the rocket](#launch-the-rocket)
- [Install widget](#install-widget)

## Getting Started
**First of all, you need some stuffs on your machine**
- Have got an account on [Shopify Partners](https://partners.shopify.com/)
- Have got a [Shopify shop](https://shopify.ca)
- Have got [Ngrok](https://ngrok.com/)

## Configurations
**Your attention please, for managing the situation, it's important to follow the way. I recommend you to follow the guide and the steps below**
- [Prepare your Ngrok](#ngrok)
- [Create an application in Shopify Dashboard](#shopify-dashboard)
- [Prepare your Airtable](#airtable)
- [Configuration variables](#configuration-variables)

### Ngrok
After downloading Ngrok, you could bind your local address to `https` address for testing.
```bash
# On Mac
# Into your folder where exec Ngrok is present
$ ./ngrok http 3000 -subdomain=example

# Probably, you could see your localhost:3000 
# on https://example.ngrok.io
```

### Shopify Dashboard
- Go to your [Shopify Partners](https://partners.shopify.com/)
- Click on `Apps` menu in the sidebar menu
- Click on `Create ap` button in the main content
- Select the type of your application `Custom app` or `Public app`, it depends of your goal
- Fill the `General settings`   
  In `App URL`, you have to put your Ngrok URL as `https://my-app/shopify`, please notice the **`shopify`** at the end of your URL.
- Fill `Allowed redirection URL(s)`   
  Put your Ngrok URL which serve the auth route `https://my-app/shopify/auth/callback`, notice the end of the url

**Problably, you are on a screen with a card `API Keys`, keep that in a tab, we come back it in the next step.**

### Airtable
Let's go, we are going to create your "database" with Airtable. Firstly, [create an account](https://airtable.com/) if it's not done yet.   
We will need to create 2 tabs `Configuration` & `Subscription`. Let's see the details.
> **ATTENTION: You have to respect the case**

#### Configuration Tab
Create the `Configuration` tab. This table is for the configuration of your widget (title, description...). You are going to work and create some columns, follow the below schema.
|name|Airtable type|typing|value|Mandatory|
|-----|------|------|------|------|
| uuid | Single line text | {string} | example.myshopify.com | true |
| title | Single line text | {string} | My title | false |
| description | Single line text | {string} | My description | false |
| activate | Number | {number} | 0 / 1 | false |

#### Subscription Tab
Create the `Subscription` tab. This table is for the configuration of your widget (title, description...). You are going to work and create some columns, follow the below schema.
|name|Airtable type|typing|value|Mandatory|
|-----|------|------|------|------|
| uuid | Single line text | {string} | example.myshopify.com | true |
| email | Single line text | {string} | email@email.com | true |
| firstName | Single line text | {string} | John | false |
| lastName | Number | {string} | Doe | false |

>> **Tips**   
>> You can see your API documentation, when you take a look in the top on your screen in right, there is a little interrogation point, click and select `API documentation`. Over there, you can generate your `API_KEY` follow the documentation and keep this key for the next step.


### Configuration variables
Firstly, **you must create an `.env` file**.   
At this point, you have all the keys in your hand... And you will begin to have fun!  
If you follow the documentation, you have your Shopify Keys in your [Shopify Dashboard](#shopify-dashboard) freshly created and your [Airtable](#airtable) `API_KEY`. Let's fill all the datas. 

```bash
# .env in your root of your folder
SHOPIFY_API_KEY='${IN_SHOPIFY_DASHBOARD}'
SHOPIFY_API_SECRET_KEY='${IN_SHOPIFY_DASHBOARD}'
AIRTABLE_URL='${IN_THE_API_DOCUMENTATION}' # it is not mandatory
AIRTABLE_DATABASE_ID='${IN_THE_API_DOCUMENTATION}'
AIRTABLE_API_KEY='${IN_THE_API_DOCUMENTATION}'
NEXT_PUBLIC_API_URL='${YOUR_NGROK_ADDRESS_HTTPS}'
```

## Launch the rocket
### Install the server Side
```bash
$ yarn install
```

### Install the widget
```bash
$ cd widget
$ yarn install
```

### Build the widget for production
```bash
$ yarn prod:widget
```

### Dashboard Shopify
It's the time, install your application on your Shopify Shop. In the configuration screen of your application, you should have a card `Test your app`, click on it and register you.   
You should be able to see your app in your shop, in your aside bar menu in `Apps > Unicorn`.   
Configure your widget and pass to the next Step => **Install widget**.

## Install Widget
### Get Snippet
On your Shopify Shop in the Configuration of the **Unicorn Application**, you should have an snippet that you copy-past in your theme in order to see to appear your widget. That should looks like:
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


