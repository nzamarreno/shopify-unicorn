import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Stack, Card, Button, TextField, Form, FormLayout, Layout, Page } from '@shopify/polaris'
import { AppProvider } from '@shopify/polaris'
import '@shopify/polaris/dist/styles.css'
import translations from '@shopify/polaris/locales/en.json'

function UnicornWidget(idElement) {
    const shop = window.location.host
    var element = document.createElement('div')
    var idWrapper = `#${idElement}`
    document.querySelector(idWrapper).appendChild(element)

    const Error = () => <div>Sorry, Something is wrong!</div>

    const App = () => {
        const [email, setEmail] = React.useState('')
        const [configuration, setConfiguration] = React.useState([])

        const handleOnChange = (value) => {
            setEmail(value)
        }

        React.useEffect(() => {
            const fetchConfiguration = async () => {
                try {
                    const response = await fetch(`https://shopyfy.ngrok.io/configuration?uuid=${shop}`)
                    const result = await response.json()
    
                    const shopSubscriptions = result.json
                    if (!shopSubscriptions) return
    
                    setConfiguration(shopSubscriptions)
                } catch (e) {
                    console.log(e)
                }
            }

            fetchConfiguration()
        })

        const handleOnSubmit = () => {
            try {
                fetch('https://shopyfy.ngrok.io/post', {
                    method: "POST",
                    body: JSON.stringify({
                        uuid: shop,
                        email: email
                    })
                })
            } catch (e) {

            }

        }

        const [title, description] = configuration
        
        return (
            <Card sectioned>
                <Form onSubmit={handleOnSubmit}>
                    <FormLayout>
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