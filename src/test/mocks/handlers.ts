import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://cbar.az/currencies/:date", ({ params }) => {
    // Return a mocked XML response
    return new HttpResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
      <ValCurs Date="${params.date}" name="Bülleten">
        <Valute Code="USD">
          <Nominal>1</Nominal>
          <Name>1 ABŞ dolları</Name>
          <Value>1.7000</Value>
        </Valute>
        <Valute Code="EUR">
          <Nominal>1</Nominal>
          <Name>1 Avro</Name>
          <Value>1.8500</Value>
        </Valute>
        <Valute Code="RUB">
          <Nominal>1</Nominal>
          <Name>1 Rusiya rublu</Name>
          <Value>0.0185</Value>
        </Valute>
        <Valute Code="TRY">
          <Nominal>1</Nominal>
          <Name>1 Türkiyə lirəsi</Name>
          <Value>0.0520</Value>
        </Valute>
        <Valute Code="GBP">
          <Nominal>1</Nominal>
          <Name>1 İngilis funt sterlinqi</Name>
          <Value>2.1500</Value>
        </Valute>
        <Valute Code="GEL">
          <Nominal>1</Nominal>
          <Name>1 Gürcüstan larisi</Name>
          <Value>0.6300</Value>
        </Valute>
      </ValCurs>`,
      {
        headers: { "Content-Type": "application/xml" },
      }
    );
  }),
];
