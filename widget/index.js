import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Stack, Card, Button, TextField, Form, FormLayout, Heading, Subheading } from '@shopify/polaris'
import { AppProvider } from '@shopify/polaris'
import '@shopify/polaris/dist/styles.css'
import translations from '@shopify/polaris/locales/en.json'
import 'regenerator-runtime/runtime'

function UnicornWidget(idElement) {
    const shop = window.location.host
    const DEFAULT_CLASS_ID = '#unicorn-widget'

    const idWrapper = idElement ? `#${idElement}` : DEFAULT_CLASS_ID

    const injectUnicorn = () => {
        let idWrapper = DEFAULT_CLASS_ID
        const element = document.createElement('div')
        idWrapper = idElement ? `#${idElement}` : DEFAULT_CLASS_ID
        document.querySelector(idWrapper).appendChild(element)
    }

    const injectStyles = () => {
        const styleSheet = document.createElement('link')
        styleSheet.type = 'text/css'
        styleSheet.rel = 'stylesheet'
        document.getElementsByTagName("head")[0].appendChild(styleSheet)
        styleSheet.href = 'https://shopyfy.ngrok.io/unicorn-style.css'
    }

    // Init
    // injectUnicorn()
    injectStyles()

    const Error = () => <div>Sorry, Something is wrong!</div>

    const App = () => {
        const [email, setEmail] = React.useState('')
        const [configuration, setConfiguration] = React.useState(["", ""])

        const handleOnChange = (value) => {
            setEmail(value)
        }

        React.useEffect(() => {
            const fetchConfiguration = async () => {
                try {
                    const response = await fetch(`https://shopyfy.ngrok.io/configuration?uuid=${shop}`)
                    const result = await response.json()

                    const shopConfiguration = result.json
                    if (!shopConfiguration) return

                    const {title, description} = shopConfiguration
                    setConfiguration([title, description])
                } catch (e) {
                    console.log(e)
                }
            }

            fetchConfiguration()
        }, [])

        const handleOnSubmit = () => {
            try {
                fetch('https://shopyfy.ngrok.io/post', {
                    method: "POST",
                    body: JSON.stringify({
                        uuid: shop,
                        email: email
                    })
                })

                setEmail('')
            } catch (e) {
                console.log(e)
            }
        }

        const [title, description] = configuration

        return (
            <Card sectioned>
                <Form onSubmit={handleOnSubmit}>
                    <FormLayout>
                        <Heading>{title}</Heading>
                        <Subheading>{description}</Subheading>
                        <TextField
                            value={email}
                            onChange={handleOnChange}
                            label="Enter your email"
                            type="text"
                        />
                        <Stack distribution="trailing">
                            <Button primary submit>
                                Subscribe!
                            </Button>
                        </Stack>
                    </FormLayout>
                </Form>
            </Card>
        )
    }

    ReactDOM.render(
        shop ? (
            <AppProvider i18n={translations}>
                <App />
            </AppProvider>
        ) : (
                <Error />
            ),
        document.querySelector(idWrapper)
    )
}

window.UnicornWidget = UnicornWidget