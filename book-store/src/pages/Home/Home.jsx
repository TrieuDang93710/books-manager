import React from "react";
import { Hero, Footer, FlashSale, ProductPortfolio } from "./components"

const Home = () => {
  return (
    <main>
      <section className="padding-x py-4 min-h-screen bg-primary">
        <Hero />
      </section>
      <section className="padding-x bg-[#ff6563] py-4">
        <FlashSale />
      </section>
      <section className="padding-x py-6 bg-primary">
        <ProductPortfolio/>
      </section>
      <section className="padding-x bg-primary">
        <Footer />
      </section>
    </main>
  )
}

export default Home