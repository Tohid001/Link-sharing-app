import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { ServerStyleSheet } from 'styled-components';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const MyDocument = () => (
    <Html lang="en">
        <Head />
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
);

MyDocument.getInitialProps = async (ctx) => {
    const sheet = new ServerStyleSheet();
    const cache = createCache();
    const originalRenderPage = ctx.renderPage;
    try {
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) =>
                    sheet.collectStyles(
                        <StyleProvider cache={cache}>
                            <App {...props} />
                        </StyleProvider>
                    ),
            });

        const initialProps = await Document.getInitialProps(ctx);
        const style = extractStyle(cache, true);
        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    <style dangerouslySetInnerHTML={{ __html: style }} />
                    {sheet.getStyleElement()}
                </>
            ),
        };
    } catch (error) {
        sheet.seal();
    }
};

export default MyDocument;
