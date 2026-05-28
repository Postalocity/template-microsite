import SiteEditorClient from './SiteEditorClient';

interface Props {
  params: Promise<{ brand: string; slug: string }>;
}

export default async function EditorPage({ params }: Props) {
  const { brand, slug } = await params;

  // Thin server wrapper — safe params extraction + pass to rich client component
  return <SiteEditorClient brand={brand} slug={slug} />;
}
