import { Link } from 'react-router'
import type { Product, ProductStatus } from '../data/products'

const STATUS: Record<ProductStatus, { label: string; className: string }> = {
  live: { label: 'En vivo', className: 'bg-emerald-400/10 text-emerald-300 ring-emerald-400/30' },
  beta: { label: 'Beta', className: 'bg-amber-400/10 text-amber-300 ring-amber-400/30' },
  soon: { label: 'Proximamente', className: 'bg-white/5 text-muted ring-white/15' },
}

export function StatusBadge({ status }: { status: ProductStatus }) {
  const meta = STATUS[status]
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-inset ${meta.className}`}
    >
      {meta.label}
    </span>
  )
}

/** Placeholder visual built from the product's accent colours. Replace with an <img>/<video> later. */
export function ProductVisual({ product, className = '' }: { product: Product; className?: string }) {
  const contain = product.visualFit === 'contain'

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={
        contain
          ? {
              backgroundImage: `radial-gradient(120% 100% at 50% 0%, ${product.accent}26, transparent 65%)`,
            }
          : {
              backgroundImage: `linear-gradient(135deg, ${product.accent}, ${product.accent2})`,
            }
      }
    >
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full ${contain ? 'object-contain p-10' : 'object-cover'}`}
        />
      ) : (
        <>
          <div className="absolute inset-0 grid-lines opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        </>
      )}
    </div>
  )
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/productos/${product.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-2 transition-colors duration-300 hover:border-white/20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at 50% 0%, ${product.accent}22, transparent 70%)`,
        }}
      />

      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <ProductVisual product={product} className="transition-transform duration-700 group-hover:scale-105" />

        {product.video && (
          <span className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink/75 px-3 py-1.5 text-[11px] font-medium backdrop-blur-sm">
            <span className="text-accent" aria-hidden="true">
              ▶
            </span>
            Video
          </span>
        )}
      </div>

      <div className="relative flex flex-1 flex-col p-7">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-muted">{product.category}</span>
          <StatusBadge status={product.status} />
        </div>

        <h3 className="display mt-5 text-3xl">{product.name}</h3>
        <p className="mt-3 flex-1 text-sm text-muted">{product.summary}</p>

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
          Ver producto
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  )
}
