import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PresentationIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">
            Google Slides Clone
          </CardTitle>
          <CardDescription>Choose a presentation to view</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <PresentationLink href="/sydney" title="Sydney V0 Slides" />
          <PresentationLink href="/london" title="London V0 Slides" />
        </CardContent>
      </Card>
    </div>
  );
}

function PresentationLink({ href, title }: { href: string; title: string }) {
  return (
    <Link href={href} passHref>
      <Button
        variant="outline"
        className="w-full justify-start text-left"
        asChild
      >
        <div className="flex items-center space-x-2">
          <PresentationIcon className="w-5 h-5" />
          <span>{title}</span>
        </div>
      </Button>
    </Link>
  );
}
