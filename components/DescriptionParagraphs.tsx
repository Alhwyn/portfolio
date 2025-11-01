interface DescriptionParagraphsProps {
  paragraphs: string[];
  paragraphClassName?: string;
}

export default function DescriptionParagraphs({ 
  paragraphs, 
  paragraphClassName = "" 
}: DescriptionParagraphsProps) {
  return (
    <>
      {paragraphs.map((paragraph: string, index: number) =>
        paragraph === "" ? (
          <br key={index} />
        ) : (
          <p key={index} className={paragraphClassName} dangerouslySetInnerHTML={{ __html: paragraph }} />
        )
      )}
    </>
  );
}
