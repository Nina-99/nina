import { About } from '../components/sections/About'
import { Contact } from '../components/sections/Contact'
import { Faq } from '../components/sections/Faq'
import { Hero } from '../components/sections/Hero'
import { Launches } from '../components/sections/Launches'
import { Products } from '../components/sections/Products'
import { Roadmap } from '../components/sections/Roadmap'
import { VisionMission } from '../components/sections/VisionMission'
import { Seo } from '../components/Seo'
import { site } from '../data/site'

export function Home() {
  return (
    <>
      <Seo
        title="Nina — Productos de software | ninabuild"
        description="Nina construye productos de software. Conocé Yottu, el marketplace que conecta centros de belleza de todo tipo con sus clientes: reservas, mapa, calificaciones y pago por tokens."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: site.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }}
      />

      <Hero />
      <About />
      <VisionMission />
      <Products />
      <Roadmap />
      <Launches />
      <Faq />
      <Contact />
    </>
  )
}
