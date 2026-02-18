'use client'

import {useQueryCertificates} from "@/utils/requests/certificate.request";
import {NotionPage} from "@/utils/types/notionDatabaseQuery.type";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {BiEnvelope} from "react-icons/bi";

export default function Page() {
  const certificates = useQueryCertificates();
  return (
    <div className="w-full z-20 flex-col px-4 relative flex justify-start items-center">
      <div className="max-w-[800px] pt-28 relative w-full flex flex-col gap-8 justify-center items-center">
        <div className="grid w-full relative grid-cols-1 md:grid-cols-2 gap-4">
          <div className="absolute z-22 bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-background to-transparent"></div>
          {certificates && certificates.data && certificates.data.results.map((item: NotionPage) => (
            <div key={item.id} className="aspect-16/12 flex relative group overflow-hidden border border-primary/5 p-4">
              {/*@ts-expect-error*/}
              <Image onError={() => certificates.refetch()} alt="certificate" width={400} height={200} src={item.properties.preview.files[0].file.url} loading="lazy" className="w-[140%] group-hover:translate-x-[5%] grayscale z-10 transition duration-500 group-hover:grayscale-0 translate-x-[10%] object-contain h-[120%]" />
              <div className="absolute flex flex-col justify-start items-start gap-2 z-20 bottom-0 left-0 w-full bg-background p-4 border-t border-primary/5">
                {/*@ts-expect-error*/}
                <h3 className="font-bold">{item.properties.Name.title[0].plain_text}</h3>
                {/*@ts-expect-error*/}
                <Badge>{item.properties.company.select.name}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-8 z-20">
        <Button asChild>
          <Link target="_blank" href="mailto:gedeapriana36@gmail.com">
            Contact for more <BiEnvelope />
          </Link>
        </Button>
      </div>
    </div>
  )
}

