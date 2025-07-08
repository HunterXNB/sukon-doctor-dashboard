import React from "react";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";

interface ServiceCardProps {
  icon: string; // path to public icon
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
}) => (
  <Card className="grid p-4 md:p-6 h-full">
    <div className="mb-2 md:mb-4 flex-shrink-0">
      <Image
        src={icon}
        alt={title}
        width={40}
        height={40}
        className="md:w-14 md:h-14 w-10 h-10"
      />
    </div>
    <CardContent className="flex flex-col p-0 overflow-hidden">
      <h3 className="text-primary overflow-hidden font-bold text-[8px] md:text-lg md:mb-2 mb-1 ">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm md:text-base leading-relaxed hidden md:block">
        {description}
      </p>
    </CardContent>
  </Card>
);

export default ServiceCard;
