import { format } from 'date-fns';

interface Props { dateString: string }

export default function DateComponent({ dateString }: Props) {
  return <time dateTime={dateString}>{format(new Date(dateString), 'LLLL	d, yyyy')}</time>;
}
