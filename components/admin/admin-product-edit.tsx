"use client"

import { useState } from "react"

import { ProductAffiliateSection } from "@/components/admin/product-affiliate-section"
import { ProductForm } from "@/components/admin/product-form"
import { ProductImagesSection } from "@/components/admin/product-images-section"
import { ProductTagsSection } from "@/components/admin/product-tags-section"
import { ProductVariantsSection } from "@/components/admin/product-variants-section"
import { Tabs } from "@/components/ui/tabs"
import type {
  AdminAffiliateStoreOption,
  AdminProductDetail,
  AdminSelectOption,
} from "@/lib/data/admin-read"

const EDIT_TABS = [
  { id: "details", label: "Details" },
  { id: "images", label: "Images" },
  { id: "variants", label: "Variants" },
  { id: "tags", label: "Tags" },
  { id: "affiliate", label: "Affiliate" },
]

type AdminProductEditProps = {
  product: AdminProductDetail
  brands: AdminSelectOption[]
  categories: AdminSelectOption[]
  stores: AdminAffiliateStoreOption[]
}

export function AdminProductEdit({
  product,
  brands,
  categories,
  stores,
}: AdminProductEditProps) {
  const [activeTab, setActiveTab] = useState("details")

  return (
    <div className="space-y-6">
      <Tabs tabs={EDIT_TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "details" ? (
        <ProductForm brands={brands} categories={categories} product={product} />
      ) : null}

      {activeTab === "images" ? (
        <ProductImagesSection productId={product.id} images={product.images} />
      ) : null}

      {activeTab === "variants" ? (
        <ProductVariantsSection
          productId={product.id}
          variants={product.variants}
        />
      ) : null}

      {activeTab === "tags" ? (
        <ProductTagsSection productId={product.id} tags={product.tags} />
      ) : null}

      {activeTab === "affiliate" ? (
        <ProductAffiliateSection
          productId={product.id}
          stores={stores}
          affiliateLinks={product.affiliateLinks}
          prices={product.prices}
        />
      ) : null}
    </div>
  )
}
