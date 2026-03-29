import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow-1 mt-5 pt-4">
        <h1 className="text-center">Welcome
          <h2>start here the project now</h2>
        </h1>
      </main>
      <Footer />
    </>
  );
}
