import { format } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import ru from 'date-fns/locale/ru';

interface Props { dateString: string; locale?: 'en' | 'ru'; }

export default function DateComponent({ dateString, locale = 'ru' }: Props) {
  const localeObj = locale === 'ru' ? ru : enUS;
  return (
    <div className="text-gray-400 font-light">
      <time dateTime={dateString}>
        Опубликовано {format(new Date(dateString), 'd MMMM yyyy', { locale: localeObj })}
      </time>
    </div>
  );
}
