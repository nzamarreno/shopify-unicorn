import * as React from "react"
import { TextStyle, Stack, Card, Button, TextField, Form, FormLayout, EmptyState, Layout, Page } from '@shopify/polaris'
const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

const Index = () => {
    const [discount, setDiscount] = React.useState('20%')
    const handleSubmit = (value) => {
        console.log(value)
    }

    const handleChange = (value) => {
        setDiscount(value)
    }

    return (
        <Page title="Configuration">
            <Layout>
                <Layout.AnnotatedSection
                    title="Store details"
                    description="Shopify and your customers will use this information to contact you."
                >
                    <Card sectioned>
                        <Form onSubmit={handleSubmit}>
                            <FormLayout>
                                <TextField
                                    value={discount}
                                    onChange={handleChange}
                                    label="Discount percentage"
                                    type="discount"
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
                    title="Store address"
                    description="This address will appear on your invoices."
                >
                    {/* Address fields */}
                </Layout.AnnotatedSection>
            </Layout>
        </Page>
    )
}

export default Index