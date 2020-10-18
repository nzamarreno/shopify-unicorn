import * as React from "react"
import { Stack, Card, Button, TextField, Form, FormLayout, Layout, Page } from '@shopify/polaris'
import { useRouter } from 'next/router'

const isEmpty = (stuff) => stuff === undefined || stuff === ''
const getFullName = (user) => {
    const nameConcat = []
    nameConcat.push(!isEmpty(user.firstName) ? user.firstName : 'Captain')
    nameConcat.push(!isEmpty(user.lastName) ? user.lastName : 'Person')

    return nameConcat.join(' ')
}

const Index = () => {
    const router = useRouter()
    const { shop } = router.query

    // Handle Title
    const [title, setTitle] = React.useState('')
    const handleOnChangeTitle = (value) => {
        setTitle(value)
    }

    // Handle Description
    const [description, setDescription] = React.useState('')
    const handleOnChangeDescription = (value) => {
        setDescription(value)
    }

    // Handle Submit Behavior
    const handleSubmit = async () => {
        try {
            await fetch('https://shopyfy.ngrok.io/configuration', {
                method: 'PUT',
                body: JSON.stringify({
                    uuid: shop,
                    title,
                    description
                })
            })
        } catch(e) {
            console.log(e)
        }
    }

    // Handle Subscription
    const [subscriptions, setSubscriptions] = React.useState([])

    React.useEffect(() => {
        const fetchConfiguration = async () => {
            try {
                const response = await fetch(`https://shopyfy.ngrok.io/configuration?uuid=${shop}`)
                const result = await response.json()

                const shopWidget = result.json
                if (!shopWidget) return

                setTitle(shopWidget.title)
                setDescription(shopWidget.description)
            } catch (e) {
                console.log(e)
            }
        }

        const fetchSubscription = async () => {
            try {
                const response = await fetch(`https://shopyfy.ngrok.io/subscription?uuid=${shop}`)
                const result = await response.json()

                const shopSubscriptions = result.json
                if (!shopSubscriptions) return

                setSubscriptions(shopSubscriptions)
            } catch (e) {
                console.log(e)
            }
        }

        if (shop && shop !== '') {
            fetchConfiguration()
            fetchSubscription()
        }
    }, [shop])

    return (
        <Page fullWidth title="Configuration">
            <Layout>
                <Layout.AnnotatedSection
                    title="Widget Configuration"
                    description="Configure your custom label which appear in your widget"
                >
                    <Card sectioned>
                        <Form onSubmit={handleSubmit}>
                            <FormLayout>
                                <TextField
                                    value={title}
                                    onChange={handleOnChangeTitle}
                                    label="The title of your widget"
                                    type="text"
                                />
                                <Stack distribution="trailing">
                                    <Button primary submit>
                                        Save
                                    </Button>
                                </Stack>
                            </FormLayout>
                        </Form>
                    </Card>
                    <Card sectioned>
                        <Form onSubmit={handleSubmit}>
                            <FormLayout>
                                <TextField
                                    value={description}
                                    onChange={handleOnChangeDescription}
                                    label="The description of your widget"
                                    type="text"
                                />
                                <Stack distribution="trailing">
                                    <Button primary submit>
                                        Save
                                    </Button>
                                </Stack>
                            </FormLayout>
                        </Form>
                    </Card>
                </Layout.AnnotatedSection>
                <Layout.AnnotatedSection
                    title="Your subcription"
                    description="Here figure all your registrations done in your widget"
                >
                    <Card title="Registration">
                        {subscriptions && subscriptions.map((user, index) => {
                            return (
                                <Card.Section key={index} title={getFullName(user)}>
                                    <p>{user.email}</p>
                                </Card.Section>
                            )
                        })
                        }
                    </Card>
                </Layout.AnnotatedSection>
            </Layout>
        </Page>
    )
}

export default Index