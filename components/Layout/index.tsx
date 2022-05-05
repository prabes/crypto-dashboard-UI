import * as React from 'react'
import Head from 'next/head'

interface ILayoutProps {
  title?: string
  children?: JSX.Element
}

const Layout: React.FunctionComponent<ILayoutProps> = ({
  children,
  title = 'This is the default title',
}) => (
  <div className="container p-5">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap" rel="stylesheet"></link>
    </Head>
    {children}
  </div>
)

export default Layout