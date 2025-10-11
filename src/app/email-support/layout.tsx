import SupportHeader from '@/components/SupportHeader';

export default function EmailSupportLayout({
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
