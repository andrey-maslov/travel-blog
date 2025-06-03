import ContentfulImage from '@/components/ContentfulImage';

interface Props {
  name: string;
  picture: any;
}

export default function Avatar({ name, picture }: Props) {
  return (
    <div className="flex items-center">
      <div className="mr-4 h-12 w-12">
        <ContentfulImage
          alt={name}
          className="h-full rounded-full object-cover"
          height={48}
          width={48}
          src={picture}
        />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
