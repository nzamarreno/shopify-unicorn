const { NEXT_PUBLIC_API_URL } = process.env;

const addScriptTag = async (ctx, accessToken, shop) => {
    const query = {
        "script_tag": {
            "event": "onload",
            "src": `${NEXT_PUBLIC_API_URL}/unicorn-widget.js`
        }
    }

    const response = await fetch(`https://${shop}/admin/api/2020-10/script_tags.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "X-Shopify-Access-Token": accessToken,
        },
        body: JSON.stringify(query)
    })

    const responseJson = await response.json();
    console.log(responseJson, shop)
    const confirmationUrl = responseJson.data.appSubscriptionCreate.confirmationUrl
    return ctx.redirect(confirmationUrl)
};

module.exports = addScriptTag;
