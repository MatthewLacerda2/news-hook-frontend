import HomeHeader from "@/components/home-header"
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import profileImages from "./profile-images.json";

export default function Contact() {
  return (
    <div>
      <HomeHeader />
      <div className="container max-w-4xl mx-auto mt-18 pb-12">
        <div className="text-center mt-8">
          <p className="text-xl text-gray-100 mb-4 font-bold">
            Need support, customizations or help integrating News-Hook?
          </p>
        </div>
          <div className="flex justify-center my-12">
          <Card className="bg-zinc-900 border-zinc-800 max-w-xl w-full">
            <CardContent className="flex items-start gap-4 p-6">
              <div className="w-24 h-24 relative rounded-full overflow-hidden bg-zinc-800 flex-shrink-0">
                <Image
                  src={profileImages.matheus}
                  alt="CEO"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-xl text-gray-200 mb-2">Matheus Lacerda Bezerra</h3>
                <div className="space-y-2">
                  <a 
                    href="https://www.linkedin.com/in/matheus-lacerda96/" 
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                    LinkedIn
                  </a>
                  <a 
                    href="https://wa.me/5598999344788" 
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                  <a 
                    href="mailto:matheus.l1996@gmail.com" 
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    math2.0@hotmail.com
                  </a>
                  <a 
                    href="mailto:matheus.l1996@gmail.com" 
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    matheus.l1996@gmail.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-xl text-gray-100 mb-4 mt-4">
            Schedule a meeting and hear more about what news-hook can offer you
          </p>
          <p className="text-xl text-gray-100">
            Hear more on how News-Hook can keep vigilant for you on any updates
          </p>
        </div>
      </div>
    </div>
  );
}
