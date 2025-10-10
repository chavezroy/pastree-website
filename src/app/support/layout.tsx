import SupportHeader from '@/components/SupportHeader';

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SupportHeader />
      {children}
    </>
  );
}
