const { NEXT_PUBLIC_API_URL } = process.env;

const addAsset = async (ctx, accessToken, shop) => {
    const themesResponse = await fetch(`https://${shop}/admin/api/2020-07/themes.json`, {
        headers: {
            'Content-Type': 'application/json',
            "X-Shopify-Access-Token": accessToken,
        }
    })

    const themes = await themesResponse.json()
    const currentTheme = themes.themes.find(x => x.role === 'main')
    if (!currentTheme) return
    const themeId = currentTheme.id

    const query = {
        "asset": {
            "key": "assets/unicorn.js",
            "src": `${NEXT_PUBLIC_API_URL}/unicorn-widget.js`
        }
    }

    const assetResponse = await fetch(`https://${shop}/admin/api/2020-07/themes/${themeId}/assets.json`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "X-Shopify-Access-Token": accessToken,
        },
        body: JSON.stringify(query)
    })

    const asset = await assetResponse.json()

    return {
        publicUrl: asset.asset.public_url,
    }
};

module.exports = addAsset;
