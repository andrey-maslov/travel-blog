import { format } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import ru from 'date-fns/locale/ru';

interface Props {
  dateString: string | null;
  locale?: 'en' | 'ru';
}

export default function DateComponent({ dateString, locale = 'ru' }: Props) {
  if (!dateString) {
    return null;
  }

  const localeObj = locale === 'ru' ? ru : enUS;
  return (
    <div className="font-light text-gray-500">
      <time dateTime={dateString}>
        {format(new Date(dateString), 'd MMMM yyyy', { locale: localeObj })}
      </time>
    </div>
  );
}
