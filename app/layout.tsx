export const metadata = {
  title: "Prompting Strategies Tool",
  description: "Интерактивен инструмент за генериране на AI задания",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg">
      <body>{children}</body>
    </html>
  );
}
