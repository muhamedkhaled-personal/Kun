import { notFound } from "next/navigation";
import { locales, getDictionary, type Locale } from "@/i18n/config";
import { MarketingNav } from "@/components/marketing/nav";
import { MarketingFooter } from "@/components/marketing/footer";

export default async function MarketingLocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const isRtl = locale === "ar";

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`flex min-h-screen flex-col ${isRtl ? "font-arabic" : ""}`}
    >
      <MarketingNav dict={dict} locale={locale} />
      <main className="flex-1">{children}</main>
      <MarketingFooter dict={dict} locale={locale} />
    </div>
  );
}
