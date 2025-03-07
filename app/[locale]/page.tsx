import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-20 ">
      <Button asChild variant={"link"}>
        <Link href={"/ar/register"}>register form arabic</Link>
      </Button>
      <Button asChild variant={"link"}>
        <Link href={"/en/register"}>register form english</Link>
      </Button>
    </div>
  );
}
