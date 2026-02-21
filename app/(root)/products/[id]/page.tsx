"use client";
import { NotionRenderer } from "@/components/notion/notion-renderer";
import { Button } from "@/components/ui/button";
import { useGetProductBlocks, useGetProductProperties } from "@/utils/requests/product.request";
import { Check, CircleCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const blocks = useGetProductBlocks(id);
  const properties = useGetProductProperties(id);

  return (
    <div className="w-full bg-background z-20 flex-col px-4 relative flex justify-start items-center">
      <div className="max-w-[800px] py-28 relative w-full flex flex-col gap-8 justify-center items-center">
        <div className="grid relative gap-4 w-full grid-cols-1 md:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-6 justify-start items-stretch">
            <Image src={properties.data?.properties.cover.files[0].file.url} alt="product cover" width={1000} height={700} className="aspect-video object-cover" priority />
            <div className="flex flex-col gap-2 md:border-b border-primary/5 pb-8 justify-start items-start">
              <h1 className="text-xl font-black">{properties.data?.properties.name.title[0].plain_text}</h1>
              <p className="text-sm">{properties.data?.properties?.description?.rich_text[0].plain_text}</p>
            </div>
          </div>
          <div className="md:row-span-2">
            <div className="md:sticky border border-primary/5 gap-4 p-4 md:top-24 flex flex-col justify-center items-start md:w-56">
              <div className="flex flex-col gap-1 justify-start items-start">
                <span className="flex text-sm justify-start items-center gap-2">
                  <CircleCheck className="w-4 h-4" /> Best Guarantee
                </span>
                <span className="flex text-sm justify-start items-center gap-2">
                  <CircleCheck className="w-4 h-4" /> Free Refund
                </span>
              </div>
              <Button className="w-full font-bold">
                <Link href="#">Purchase ${properties.data?.properties.price.number}</Link>
              </Button>
            </div>
          </div>
          <div className="">{blocks.data?.results && <NotionRenderer blocks={blocks.data.results} />}</div>
        </div>
      </div>
    </div>
  );
}
