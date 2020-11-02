const { NEXT_PUBLIC_API_URL } = process.env;

const addScriptTag = async (ctx, accessToken, shop, publicUrlAsset) => {
    const query = {
        "script_tag": {
            "event": "onload",
            "src": publicUrlAsset
        }
    }

    await fetch(`https://${shop}/admin/api/2020-07/script_tags.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "X-Shopify-Access-Token": accessToken,
        },
        body: JSON.stringify(query)
    })

    return ctx.redirect("/shopify")
};

module.exports = addScriptTag;
