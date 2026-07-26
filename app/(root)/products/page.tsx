"use client";

import { Badge } from "@/components/ui/badge";
import { useQueryProducts } from "@/utils/requests/product.request";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  const products = useQueryProducts();

  return (
    <div className="w-full z-20 flex-col px-4 relative flex justify-start items-center">
      <div className="max-w-[800px] py-28 relative w-full flex flex-col gap-8 justify-center items-center">
        <div className="grid w-full relative grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          {products.data?.results.map((item) => (
            <Link href={`/products/${item.id}`} key={item.id} className="flex flex-col justify-start items-stretch gap-2">
              <div className="overflow-hidden">
                <Image
                  alt="product image"
                  // @ts-expect-error
                  src={item.properties?.cover?.files[0].file.url}
                  width={400}
                  height={1000}
                  loading="lazy"
                />
              </div>

              <div className="flex gap-8 justify-between items-start border border-primary/5 p-4">
                <div className="flex flex-col justify-start gap-1 items-start">
                  <h3 className="font-bold">{item.properties.name.title[0].plain_text}</h3>
                  {/* @ts-expect-error */}
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.properties?.description?.rich_text[0].plain_text}</p>
                  <div className="flex mt-2 justify-start gap-1 flex-wrap">
                    {/* @ts-expect-error */}
                    {item.properties?.tags?.multi_select.map((item, index: number) => (
                      <Badge key={index}>#{item.name}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  {/* @ts-expect-error */}
                  <span className="text-lg font-black">${item.properties?.price.number}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
