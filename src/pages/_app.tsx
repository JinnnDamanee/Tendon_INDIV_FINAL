import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { BreadcrumbProvider } from "context/breadcrumb/breadCrumbContext";
import { ContainerProviderTendon } from "linkWithBackend/services/container";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Tendon</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContainerProviderTendon>
        <BreadcrumbProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} >
            <Component {...pageProps} />
          </ThemeProvider>
        </BreadcrumbProvider>
      </ContainerProviderTendon>
    </>
  )
};

export default MyApp;
