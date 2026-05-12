import { Helmet } from "react-helmet-async";

const BASE_URL = "https://gr5.2ce-commerce.com/";

export default function HelmetComponent({ title, description }) {
  const fullTitle = `${title} — Crisp Katsu`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Crisp Katsu, Katsu, Food, restaurant,Panabo Food, Local Food, DNSC Tabuan, DNSC Food"
      />
      <meta name="author" content="Crisp Katsu" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#fb923c" />
      <link rel="canonical" href={BASE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Crisp Katsu" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={BASE_URL} />
      <meta property="og:locale" content="en_US" />
    </Helmet>
  );
}
