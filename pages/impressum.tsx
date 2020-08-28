import Head from "next/head";
import { Page, PageHeading } from "components/Page";
import { Card, Button, Text } from "rebass";

export default function Impressum() {
  function sendMail() {
    const email = "hc.nehcaet@ytov:otliam";
    document.location.href = email.split("").reverse().join("");
  }
  return (
    <Page>
      <Head>
        <title>voty - Datenschutz</title>
      </Head>

      <PageHeading>Impressum</PageHeading>
      <Text>
        Voty ist ein Projekt des Vereins{" "}
        <a href="https://teachen.ch/verein-teachen/">«Teachen!»</a>
      </Text>
      <Card>
        <pre>
          Verein «Teachen!»
          <br />
          Alpenweg 11
          <br />
          3110 Münsingen
        </pre>
      </Card>
      <Text>
        <Button onClick={sendMail} role="button" className="button primary">
          Email senden
        </Button>
      </Text>
    </Page>
  );
}
