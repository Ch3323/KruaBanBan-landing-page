import Link from "next/link";

import { Button } from "@/components/ui/button";

type SimplePageProps = {
  title: string;
  description: string;
};

export function SimplePage({ title, description }: SimplePageProps) {
  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <Button asChild className="w-fit" variant="outline">
          <Link href="/">กลับหน้าแรก</Link>
        </Button>
        <div className="rounded-lg border bg-card p-6 sm:p-8">
          <p className="text-sm font-medium text-muted-foreground">Langkrua</p>
          <h1 className="mt-3 text-3xl font-semibold">{title}</h1>
          <p className="mt-4 leading-7 text-muted-foreground">{description}</p>
        </div>
      </div>
    </main>
  );
}
