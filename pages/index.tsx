import Head from "next/head";
import { readLine } from "../readfile";
import { useRouter } from "next/router";

export default function Home({ quote }: { quote: string }) {
  const router = useRouter();

  const reloadPage = () => router.replace(router.asPath);
  return (
    <>
      <Head>
        <title>Michael Scott Quotes</title>
        <meta name="description" content="Your daily dose of Michael Scott" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col justify-center items-center h-full min-h-screen p-20 text-center">
        <h1 className="text-3xl font-bold mb-5">{quote}</h1>
        <button
          className="p-2 bg-slate-200 rounded font-semibold hover:bg-slate-300"
          onClick={reloadPage}
        >
          New quote
        </button>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const randNum = Math.floor(Math.random() * 100);
  const quote = await readLine(randNum, "public/quotes.txt");

  return {
    props: {
      quote,
    },
  };
}
