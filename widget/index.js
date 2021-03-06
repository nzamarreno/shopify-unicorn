import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Stack, Card, Button, TextField, Form, FormLayout, Heading, Subheading } from '@shopify/polaris'
import { AppProvider } from '@shopify/polaris'
import '@shopify/polaris/dist/styles.css'
import './style.css'
import translations from '@shopify/polaris/locales/en.json'
import 'regenerator-runtime/runtime'

(function UnicornWidget() {
    const shop = window.location.host
    const DEFAULT_CLASS_ID = 'unicorn-widget'

    const injectUnicorn = () => {
        const element = document.createElement('div')
        element.setAttribute('id', DEFAULT_CLASS_ID)
        document.body.appendChild(element)
    }

    const injectStyles = () => {
        const styleSheet = document.createElement('link')
        styleSheet.type = 'text/css'
        styleSheet.rel = 'stylesheet'
        document.getElementsByTagName("head")[0].appendChild(styleSheet)
        styleSheet.href = `${process.env.NEXT_PUBLIC_API_URL}/unicorn-style.css`
    }

    // Init
    injectUnicorn()
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
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/configuration?uuid=${shop}`)
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
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
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
        document.querySelector(`#${DEFAULT_CLASS_ID}`)
    )
})()
