import React from "react";
import { MaxWidthWrapper } from "../shared/MaxWidthWrapper";

function Services() {
  return (
    <section className="py-12 md:py-20">
      <MaxWidthWrapper className="space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-2 text-center">
          <h2 className="md:text-4xl text-2xl  font-semibold text-primary">
            خدماتنا
          </h2>
          <p className="max-w-[300px] mx-auto">
            أدوات متكاملة لمساعدتك على تقديم رعاية أفضل، بوقت أقل وجهد أقل!
          </p>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export default Services;
