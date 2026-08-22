/**
 * Admin subtree.
 *
 * `data-clarity-mask` marks everything below as sensitive, so any session
 * replay records it redacted. src/components/Clarity.tsx already refuses to
 * initialise on /admin — this is the second lock, in case that guard is ever
 * changed or bypassed. The CRM holds real client names, emails, phone
 * numbers and invoice amounts; none of it should ever leave in a recording.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div data-clarity-mask="true">{children}</div>;
}
